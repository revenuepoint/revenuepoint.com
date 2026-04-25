# Datadog (revenuepoint-com)

Monitors-as-code for the marketing site. Each JSON in `monitors/` is upserted to Datadog by name via `deploy.py`.

## Setup
```
cp .env.example .env  # fill in DD_API_KEY, DD_APP_KEY (DD_SITE=us5.datadoghq.com)
python -m venv .venv
.venv/bin/pip install -r requirements.txt
```

## Deploy
```
.venv/bin/python deploy.py --dry-run   # preview
.venv/bin/python deploy.py             # apply
.venv/bin/python deploy.py --file monitors/lead-form-no-starts-24h.json   # one file
```

Idempotent: if a monitor with the exact `name` already exists in Datadog, it's updated; otherwise created.

## Conventions
- Monitor names are prefixed `[revenuepoint-com]` so they group/filter cleanly in the Datadog UI.
- Tag every monitor with `service:revenuepoint-com` and `managed-by:datadog-as-code`.
- Notify `@thomas@revenuepoint.com` (route to a Slack handle later if needed).

## Current monitors
- `lead-form-no-starts-24h.json` — alerts if no `lead_form_started` RUM action fires for 24h (form mount or RUM init likely broken).
- `lead-form-no-submits-7d.json` — alerts if no `lead_form_submitted` RUM action fires for 7d (submit handler or W2L pipeline likely broken).
