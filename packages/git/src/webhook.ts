/** A normalized push event the sync engine cares about. */
export interface PushEvent {
  owner: string;
  name: string;
  ref: string;
  /** Paths added/modified/removed in the push. */
  changedPaths: string[];
}

/**
 * Verify a GitHub webhook HMAC signature. SCAFFOLD: wire to the App's webhook
 * secret (X-Hub-Signature-256) before trusting any payload.
 */
export function verifyWebhookSignature(
  _payload: string,
  _signature: string,
  _secret: string,
): boolean {
  throw new Error("verifyWebhookSignature not implemented (scaffold)");
}

/**
 * Decide which connected specs a push affects so the caller can re-parse only
 * those files and update `spec_index` (using `blobSha` to detect drift).
 */
export function affectedSpecs(event: PushEvent, globs: string[]): string[] {
  // Scaffold: real impl matches changedPaths against globs (e.g. picomatch).
  void globs;
  return event.changedPaths;
}
