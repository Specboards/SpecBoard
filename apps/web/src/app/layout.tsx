import type { ReactNode } from "react";

export const metadata = {
  title: "SpecBoard",
  description: "Spec-based product management over git-native specs.",
};

const navItems = [
  { href: "/backlog", label: "Backlog" },
  { href: "/board", label: "Board" },
  { href: "/roadmap", label: "Roadmap" },
];

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", margin: 0 }}>
        <header
          style={{
            display: "flex",
            gap: 16,
            padding: "12px 20px",
            borderBottom: "1px solid #e5e7eb",
            alignItems: "center",
          }}
        >
          <strong>SpecBoard</strong>
          <nav style={{ display: "flex", gap: 12 }}>
            {navItems.map((item) => (
              <a key={item.href} href={item.href} style={{ textDecoration: "none" }}>
                {item.label}
              </a>
            ))}
          </nav>
        </header>
        <main style={{ padding: 20 }}>{children}</main>
      </body>
    </html>
  );
}
