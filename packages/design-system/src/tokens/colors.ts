export const sharedColorTokens = {
  brand: {
    primary: "#1F6FEB",
    secondary: "#0E9F6E",
    accent: "#D97706"
  },
  surface: {
    page: "#F8FAFC",
    raised: "#FFFFFF",
    inverse: "#111827"
  },
  text: {
    primary: "#111827",
    secondary: "#4B5563",
    inverse: "#F9FAFB"
  }
} as const;

export type SharedColorTokens = typeof sharedColorTokens;
