# revenuepoint.com

Next.js static site for revenuepoint.com. Built and deployed to GitHub Pages via `.github/workflows/deploy.yml` (push to `main` or `workflow_dispatch`).

## Local dev
```
npm install
npm run dev
```

Public env vars (e.g. `NEXT_PUBLIC_SF_OID`, `NEXT_PUBLIC_DATADOG_*`) are baked at build time. Production values live in GitHub repository secrets; local values in `.env.local`.

## Datadog monitors
See [`datadog/`](./datadog/) — monitors are defined as JSON and deployed with `python deploy.py`. Self-contained: no shared paths to other repos.
