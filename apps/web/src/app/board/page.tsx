import { DEFAULT_STATUSES } from "@specboard/core";

/**
 * Kanban board. SCAFFOLD: renders columns from the default workflow with no
 * cards yet. Wire to `features` (grouped by status) and `spec_index` (titles).
 */
export default function BoardPage() {
  return (
    <section>
      <h1>Board</h1>
      <div style={{ display: "flex", gap: 12, overflowX: "auto" }}>
        {DEFAULT_STATUSES.map((status) => (
          <div
            key={status}
            style={{
              minWidth: 200,
              background: "#f9fafb",
              border: "1px solid #e5e7eb",
              borderRadius: 8,
              padding: 12,
            }}
          >
            <h3 style={{ marginTop: 0, textTransform: "capitalize" }}>
              {status.replace("_", " ")}
            </h3>
            <p style={{ color: "#9ca3af", fontSize: 13 }}>No features (scaffold)</p>
          </div>
        ))}
      </div>
    </section>
  );
}
