/**
 * Feature detail. SCAFFOLD: two panes — the spec markdown (read from git via
 * `spec_index`, editable through the markdown editor and committed back) and
 * the metadata sidebar (status/assignee/priority/tags, edited in the DB).
 */
export default async function FeaturePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <section style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 24 }}>
      <div>
        <h1>Feature</h1>
        <p style={{ color: "#6b7280" }}>spec id: {id}</p>
        <p style={{ color: "#9ca3af" }}>Spec markdown editor (scaffold).</p>
      </div>
      <aside style={{ borderLeft: "1px solid #e5e7eb", paddingLeft: 16 }}>
        <h3>Metadata</h3>
        <p style={{ color: "#9ca3af", fontSize: 13 }}>
          Status, assignee, priority, tags, roadmap (scaffold).
        </p>
      </aside>
    </section>
  );
}
