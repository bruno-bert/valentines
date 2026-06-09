export const landingTypography = {
  fontFamily: {
    sans: ["var(--font-romantic-body)", "Cormorant Garamond", "Georgia", "serif"],
    serif: ["var(--romantic-serif)", "Cormorant Garamond", "Georgia", "serif"],
    script: ["var(--romantic-script)", "Parisienne", "Great Vibes", "cursive"]
  },
  fontSize: {
    display: ["3.5rem", { lineHeight: "1.1", fontWeight: "800", letterSpacing: "-0.02em" }],
    hero: ["2.75rem", { lineHeight: "1.15", fontWeight: "700" }],
    title: ["2rem", { lineHeight: "1.25", fontWeight: "700" }],
    section: ["1.5rem", { lineHeight: "1.3", fontWeight: "600" }],
    body: ["1rem", { lineHeight: "1.625", fontWeight: "400" }],
    bodyLarge: ["1.125rem", { lineHeight: "1.6", fontWeight: "400" }],
    small: ["0.875rem", { lineHeight: "1.25", fontWeight: "400" }],
    label: ["0.75rem", { lineHeight: "1.2", fontWeight: "600", letterSpacing: "0.04em" }]
  }
} as const;

export type LandingTypography = typeof landingTypography;
