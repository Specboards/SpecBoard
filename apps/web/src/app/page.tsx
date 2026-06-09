export default function HomePage() {
  return (
    <section>
      <h1>SpecBoard</h1>
      <p>
        A lightweight, spec-based product management layer. Specs stay canonical in your git
        repo; status, assignment, priority, and roadmap live here on top of them — no duplicate
        authoring.
      </p>
      <ul>
        <li>
          <a href="/backlog">Backlog</a> — prioritize and rank work
        </li>
        <li>
          <a href="/board">Board</a> — kanban across the workflow
        </li>
        <li>
          <a href="/roadmap">Roadmap</a> — features by quarter
        </li>
      </ul>
      <p style={{ color: "#6b7280" }}>Scaffold — pages render placeholders pending data wiring.</p>
    </section>
  );
}
