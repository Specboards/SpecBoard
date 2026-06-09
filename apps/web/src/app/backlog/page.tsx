/**
 * Backlog. SCAFFOLD: PM-facing prioritized list with drag-to-rank. Wire to
 * `features` ordered by `rank`, with inline status/assignee/priority editing
 * (metadata writes go straight to the DB — no git churn).
 */
export default function BacklogPage() {
  return (
    <section>
      <h1>Backlog</h1>
      <p style={{ color: "#6b7280" }}>
        Prioritized, rankable list of features. Editing status/assignee/priority here updates
        DB metadata only; spec content edits commit back to git.
      </p>
      <p style={{ color: "#9ca3af" }}>No features yet (scaffold).</p>
    </section>
  );
}
