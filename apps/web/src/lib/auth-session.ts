import { headers } from "next/headers";

import { getAuth } from "@/lib/auth";

export type SessionUser = { id: string; email: string; name: string };

/** Session user resolved from a server component / page request context. */
export async function getServerSessionUser(): Promise<SessionUser | null> {
  const auth = getAuth();
  if (!auth) return null;
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return null;
  const { id, email, name } = session.user;
  return { id, email, name };
}

/**
 * The authenticated user for a request, or `null` when there is no session.
 * Returns `null` in local file mode (auth disabled) too — callers that need a
 * user there should treat it as "auth disabled".
 */
export async function getSessionUser(req: Request): Promise<SessionUser | null> {
  const auth = getAuth();
  if (!auth) return null;
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) return null;
  const { id, email, name } = session.user;
  return { id, email, name };
}

/**
 * Guard for write routes. Returns a 401 `Response` when auth is enabled and the
 * request carries no valid session; returns `null` (proceed) otherwise.
 *
 * When auth is disabled — local file mode, `getAuth()` is `null` — writes stay
 * open, matching single-workspace self-host where there is no one to sign in.
 */
export async function requireWriteAccess(req: Request): Promise<Response | null> {
  const auth = getAuth();
  if (!auth) return null;

  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) {
    return Response.json({ error: "Authentication required." }, { status: 401 });
  }
  return null;
}
