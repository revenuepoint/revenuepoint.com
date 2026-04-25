#!/usr/bin/env python3
"""Upsert Datadog monitors and RUM-derived metrics defined as JSON.

monitors/*.json are upserted by `name` against /api/v1/monitor.
rum_metrics/*.json are upserted by `id` against /api/v2/rum/config/metrics.
Run with --dry-run to preview.
"""
import argparse
import json
import os
import sys
import urllib.request
import urllib.error
from pathlib import Path

from datadog_api_client import ApiClient, Configuration
from datadog_api_client.v1.api.monitors_api import MonitorsApi
from datadog_api_client.v1.model.monitor import Monitor
from datadog_api_client.v1.model.monitor_update_request import MonitorUpdateRequest
from dotenv import load_dotenv

ROOT = Path(__file__).parent
MONITORS_DIR = ROOT / "monitors"
RUM_METRICS_DIR = ROOT / "rum_metrics"

load_dotenv(ROOT / ".env")


def get_client() -> ApiClient:
    api_key = os.getenv("DD_API_KEY")
    app_key = os.getenv("DD_APP_KEY")
    site = os.getenv("DD_SITE", "datadoghq.com")
    if not api_key or not app_key:
        sys.exit("DD_API_KEY and DD_APP_KEY must be set (see .env.example).")
    cfg = Configuration()
    cfg.api_key["apiKeyAuth"] = api_key
    cfg.api_key["appKeyAuth"] = app_key
    cfg.server_variables["site"] = site
    return ApiClient(cfg)


def load_monitor_files(only: str | None) -> list[dict]:
    if only:
        path = Path(only)
        if not path.is_absolute():
            path = ROOT / only
        return [json.loads(path.read_text())]
    files = sorted(MONITORS_DIR.glob("*.json"))
    if not files:
        sys.exit(f"No monitor JSON files found in {MONITORS_DIR}")
    return [json.loads(p.read_text()) for p in files]


def find_existing(api: MonitorsApi, name: str):
    for m in api.list_monitors():
        if getattr(m, "name", None) == name:
            return m
    return None


def upsert(api: MonitorsApi, config: dict, dry_run: bool) -> None:
    name = config["name"]
    existing = find_existing(api, name)
    if dry_run:
        verb = "UPDATE" if existing else "CREATE"
        print(f"[dry-run] {verb}: {name}")
        return
    if existing:
        body = MonitorUpdateRequest(**config)
        result = api.update_monitor(monitor_id=existing.id, body=body)
        print(f"updated id={result.id} name={name}")
    else:
        body = Monitor(**config)
        result = api.create_monitor(body=body)
        print(f"created id={result.id} name={name}")


def dd_v2_request(method: str, path: str, body: dict | None = None) -> tuple[int, dict]:
    site = os.getenv("DD_SITE", "datadoghq.com")
    url = f"https://api.{site}{path}"
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(url, data=data, method=method)
    req.add_header("DD-API-KEY", os.getenv("DD_API_KEY", ""))
    req.add_header("DD-APPLICATION-KEY", os.getenv("DD_APP_KEY", ""))
    req.add_header("Content-Type", "application/json")
    try:
        with urllib.request.urlopen(req) as r:
            return r.status, json.loads(r.read() or b"{}")
    except urllib.error.HTTPError as e:
        return e.code, json.loads(e.read() or b"{}")


def upsert_rum_metric(config: dict, dry_run: bool) -> None:
    metric_id = config["id"]
    status, _ = dd_v2_request("GET", f"/api/v2/rum/config/metrics/{metric_id}")
    exists = status == 200
    if dry_run:
        print(f"[dry-run] {'UPDATE' if exists else 'CREATE'} rum-metric: {metric_id}")
        return
    body = {"data": config}
    if exists:
        # PATCH only allows compute (excluding aggregation_type), filter, group_by
        attrs = config["attributes"].copy()
        attrs.get("compute", {}).pop("aggregation_type", None)
        patch_body = {"data": {"id": metric_id, "type": "rum_metrics", "attributes": attrs}}
        status, resp = dd_v2_request("PATCH", f"/api/v2/rum/config/metrics/{metric_id}", patch_body)
        if status >= 300:
            sys.exit(f"PATCH failed for {metric_id}: {status} {resp}")
        print(f"updated rum-metric: {metric_id}")
    else:
        status, resp = dd_v2_request("POST", "/api/v2/rum/config/metrics", body)
        if status >= 300:
            sys.exit(f"POST failed for {metric_id}: {status} {resp}")
        print(f"created rum-metric: {metric_id}")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--file", help="Deploy a single JSON file (path relative to datadog/)")
    args = parser.parse_args()

    # Need keys present even for v2 requests; reuse the v1 client's check.
    _ = get_client()

    if RUM_METRICS_DIR.exists():
        for p in sorted(RUM_METRICS_DIR.glob("*.json")):
            upsert_rum_metric(json.loads(p.read_text()), args.dry_run)

    monitors = load_monitor_files(args.file)
    with get_client() as client:
        api = MonitorsApi(client)
        for cfg in monitors:
            upsert(api, cfg, args.dry_run)
    return 0


if __name__ == "__main__":
    sys.exit(main())
