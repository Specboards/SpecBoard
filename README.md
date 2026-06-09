# SpecBoard

A lightweight, spec-based product-management layer for **spec-driven development**.

Your specs stay canonical in git (versioned with code, read by AI coding agents).
SpecBoard layers the product metadata — status, assignment, priority, backlog
order, roadmap — **on top** of them, so PM, UX, and engineering collaborate
without editing files in a terminal and without duplicating work into JIRA/Aha.

Open-core: self-host the core for free, or use the hosted SaaS.

- **Design:** [`ARCHITECTURE.md`](./ARCHITECTURE.md)
- **Build plan:** [`docs/PLAN.md`](./docs/PLAN.md)

> Status: **scaffold**. Typed package boundaries with stubbed services and
> placeholder UI — not yet a working product.

## Layout

```
apps/
  web/        Next.js App Router UI (Backlog · Board · Roadmap · Feature detail)
  mcp/        MCP server exposing specs + metadata to coding agents
packages/
  core/       Spec parsing, status state machine, .specboard/config.yml schema
  db/         Drizzle schema + Postgres client (metadata + spec index)
  git/        GitHub App client, spec reader/writer, webhook reconciler
  ui/         Shared design tokens / components
infra/
  docker-compose.yml   Self-host stack (web + Postgres)
  supabase/            SaaS migrations + RLS policies
```

## Repo conventions for specs

Specs live under `specs/<feature>/spec.md` with YAML frontmatter:

```yaml
---
id: <uuid>          # stable link to SpecBoard metadata (survives renames)
title: My Feature
kind: feature
---
```

Per-repo config (which globs are specs, workflow, custom fields, write mode)
lives in [`.specboard/config.yml`](./.specboard/config.yml).

## Develop

Requires Node 22+ and pnpm 10+.

```bash
pnpm install
pnpm build          # turbo: builds all packages/apps
pnpm test           # runs unit tests (e.g. the spec parser in packages/core)
pnpm typecheck
```

### Database

```bash
pnpm --filter @specboard/db generate   # emit table migrations into infra/supabase/migrations
pnpm --filter @specboard/db migrate     # apply against $DATABASE_URL
# then apply infra/supabase/migrations/0001_rls_policies.sql for tenant isolation
```

### Self-host

```bash
docker compose -f infra/docker-compose.yml up
```

## License

Apache-2.0 for the open-core. Commercial SaaS-only features (multi-tenant
hosting, SSO/SAML/SCIM, advanced analytics, premium integrations, audit logs)
are licensed separately.
