import { redirect } from "next/navigation";

import { getServerSessionUser } from "@/lib/auth-session";
import { getDb } from "@/lib/db";
import { ensureMembership, type Member } from "@/lib/workspace";

/**
 * Page-level access gate for content routes. When auth is enabled:
 * - no session            → redirect to /sign-in
 * - session, no workspace → redirect to /setup (first user names the org)
 * - session + workspace   → auto-join as viewer if needed, then proceed
 *
 * Returns `null` in local file mode (auth disabled), where pages are ungated.
 */
export async function requireWorkspaceAccess(): Promise<
  { userId: string; membership: Member } | null
> {
  const db = getDb();
  const user = await getServerSessionUser();
  if (!db) return null; // file mode — no auth, no gating
  if (!user) redirect("/sign-in");

  const membership = await ensureMembership(db, user.id);
  if (!membership) redirect("/setup");

  return { userId: user.id, membership };
}
