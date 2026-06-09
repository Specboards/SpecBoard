import { z } from "zod";

/**
 * Schema for `.specboard/config.yml`, the per-repo file that tells SpecBoard
 * where specs live and how this team's workflow/fields are shaped. Kept in the
 * repo so the configuration is versioned with the code, while the resulting
 * metadata still lives in the DB.
 */
export const repoConfigSchema = z.object({
  version: z.literal(1),
  /** Glob(s), relative to repo root, that identify spec directories/files. */
  specGlobs: z.array(z.string()).default(["specs/**/spec.md"]),
  /** Override the default status vocabulary; first entry is the initial state. */
  statuses: z.array(z.string()).min(2).optional(),
  /** Legal transitions keyed by status; omit to allow any transition. */
  transitions: z.record(z.string(), z.array(z.string())).optional(),
  /** Custom metadata fields surfaced in the UI and stored in DB jsonb. */
  fields: z
    .array(
      z.object({
        key: z.string(),
        label: z.string(),
        type: z.enum(["text", "number", "select", "multiselect", "date", "user"]),
        options: z.array(z.string()).optional(),
      }),
    )
    .default([]),
  /** How UI spec edits are written back to git. */
  writeMode: z.enum(["pr", "direct"]).default("pr"),
});

export type RepoConfig = z.infer<typeof repoConfigSchema>;

export function parseRepoConfig(input: unknown): RepoConfig {
  return repoConfigSchema.parse(input);
}
