export const sharedTypographyTokens = {
  fontFamily: {
    sans: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
  },
  fontSize: {
    body: "16px",
    title: "32px",
    compact: "14px"
  },
  lineHeight: {
    body: "24px",
    title: "40px",
    compact: "20px"
  }
} as const;

export type SharedTypographyTokens = typeof sharedTypographyTokens;
