/** Shared design tokens. Components (board, editor) will be added here so the
 * web app and any future surfaces share one visual language. */
export const tokens = {
  color: {
    border: "#e5e7eb",
    muted: "#6b7280",
    faint: "#9ca3af",
    surface: "#f9fafb",
  },
  radius: { sm: 6, md: 8 },
  space: { sm: 8, md: 12, lg: 20 },
} as const;

/** Suggested per-status accent colors for board columns / chips. */
export const statusColors: Record<string, string> = {
  backlog: "#9ca3af",
  defining: "#a78bfa",
  ready: "#60a5fa",
  in_progress: "#fbbf24",
  in_review: "#f472b6",
  done: "#34d399",
  archived: "#d1d5db",
};
