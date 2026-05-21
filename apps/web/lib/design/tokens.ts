export const designTokens = {
  color: {
    background: "var(--color-background)",
    surface: "var(--color-surface)",
    surfaceMuted: "var(--color-surface-muted)",
    textPrimary: "var(--color-text-primary)",
    textSecondary: "var(--color-text-secondary)",
    accent: "var(--color-accent)",
    accentSoft: "var(--color-accent-soft)",
    success: "var(--color-success)",
    warning: "var(--color-warning)",
    error: "var(--color-error)"
  },
  radius: {
    sm: "var(--radius-sm)",
    md: "var(--radius-md)",
    lg: "var(--radius-lg)",
    xl: "var(--radius-xl)"
  },
  spacing: {
    xs: "var(--spacing-xs)",
    sm: "var(--spacing-sm)",
    md: "var(--spacing-md)",
    lg: "var(--spacing-lg)",
    xl: "var(--spacing-xl)"
  }
} as const;

