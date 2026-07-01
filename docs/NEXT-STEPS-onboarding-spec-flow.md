# Next steps: onboarding spec flow

Handoff for picking this up tomorrow. Branch: `feat/onboarding-spec-import-scan`.
Open PR: **#68** (https://github.com/Specboards/SpecBoard/pull/68). Not yet
merged or deployed. Repo version still 0.1.3.

## Where we are

Building the onboarding improvements as tracer-bullet slices (thin end-to-end
first, expand from there). Two slices are done and on PR #68, covering asks #1
and #3, plus the seeding half of #2.

### Done (PR #68, verified green: typecheck 11/11, build 7/7, tests 90)

- **Ask #1 - scan + import on confirm.** Connecting a repo from the picker now
  registers it WITHOUT auto-importing (new optional `sync` flag on
  `POST /api/v1/repositories`, default true; picker passes `sync: false`). An
  inline "Import your specs" panel on the Repositories page scans connected repos
  read-only (`GET /api/v1/repositories/scan`), lists the `spec.md` files, and
  creates cards only on confirm (`POST /api/v1/repositories/import`), then links
  to the board.
- **Ask #3 - guided first spec.** When connected repos have no specs, the empty
  state is a walkthrough: name a feature, pick a repo, and we commit a starter
  `specs/<feature>/spec.md` (stable id + template body) and import it, so a real
  card appears. Endpoint: `POST /api/v1/repositories/starter-spec`. Refuses to
  overwrite an existing file.

Key files: `packages/core/src/spec.ts` (`previewSpec`, unit-tested),
`apps/web/src/lib/github-sync.ts` (`scanRepositorySpecs`, `scanWorkspaceSpecs`,
`createStarterSpec`), the three new routes under
`apps/web/src/app/api/v1/repositories/`, `apps/web/src/lib/api-client.ts`, and
`apps/web/src/components/repositories-manager.tsx` (`SpecImportPanel`,
`EmptySpecsState`).

## Open decisions (need Jon's call before finishing)

1. **Starter spec commit target.** Today `createStarterSpec` commits directly to
   the default branch (mode `"direct"`, consistent with how stable-id injection
   already commits). Option: switch to a PR (`mode: "pr"`) so nothing lands on
   `main` unreviewed. Decision pending.
2. **Scope for 0.2.0.** Ship #1 + #3 now and treat the rest of #2 as a fast
   follow, or finish #2 first and cut one release. Leaning toward shipping
   #1 + #3, but Jon's call.

## Remaining work

- **Ask #2 - "create a dedicated spec repo" nudge.** The seed mechanism
  (`createStarterSpec`) is already built and reused by #3. What's left is a UI
  nudge: when a user has no suitable repo, guide them to create a spec repo on
  GitHub and connect it (existing connect flow), then seed it. Chosen approach
  uses existing `contents:write`, no GitHub App permission bump (decided earlier).
- **Manual test on cloud test** (per cloud-test-first): merge #68 -> auto-deploys
  to test.specboard.ai -> try both paths: a repo with `specs/**/spec.md`
  (scan -> import) and a repo with none (create-first-spec).
- **Release:** when happy, this is a MINOR bump to **0.2.0** (see VERSIONING.md):
  bump all 8 package.json in lockstep, add a CHANGELOG entry, verify green, merge,
  tag `v0.2.0` on the merge commit, then dispatch the Fly production deploy.

## How to resume tomorrow

1. Answer the two open decisions above.
2. If keeping direct commit + shipping #1/#3: merge #68, smoke-test on test, then
   run the 0.2.0 release steps. If finishing #2 first: add the spec-repo nudge on
   this branch, then release.
3. Re-run `pnpm -w build && pnpm -w typecheck && pnpm -w test` before any push
   (push only green branches).

## Related context (this session)

- PR #66 (v0.1.3, GitHub setup trailing-space fix + versioning) merged and
  deployed to prod. GitHub App Setup URL space also fixed in settings.
- PR #67 (tracer-bullets added to CLAUDE.md "Building philosophy") open, not
  merged.
- Working principle: build features as tracer bullets (thin end-to-end slice,
  feedback, expand). Ship to cloud test first. One lockstep monorepo version per
  release.
