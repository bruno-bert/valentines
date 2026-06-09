import type { Config } from "tailwindcss";

import { landingColors } from "./src/design-system/tokens/colors";
import { landingMotion } from "./src/design-system/tokens/motion";
import { landingTypography } from "./src/design-system/tokens/typography";

const displayFontSize = landingTypography.fontSize.display;
const heroFontSize = landingTypography.fontSize.hero;
const titleFontSize = landingTypography.fontSize.title;
const sectionFontSize = landingTypography.fontSize.section;
const bodyFontSize = landingTypography.fontSize.body;
const bodyLargeFontSize = landingTypography.fontSize.bodyLarge;
const smallFontSize = landingTypography.fontSize.small;
const labelFontSize = landingTypography.fontSize.label;

const config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        landing: landingColors,
        nobu: landingColors
      },
      fontFamily: {
        sans: [...landingTypography.fontFamily.sans],
        serif: [...landingTypography.fontFamily.serif],
        script: [...landingTypography.fontFamily.script]
      },
      fontSize: {
        "landing-display": [displayFontSize[0], { ...displayFontSize[1] }],
        "landing-hero": [heroFontSize[0], { ...heroFontSize[1] }],
        "landing-title": [titleFontSize[0], { ...titleFontSize[1] }],
        "landing-section": [sectionFontSize[0], { ...sectionFontSize[1] }],
        "landing-body": [bodyFontSize[0], { ...bodyFontSize[1] }],
        "landing-body-lg": [bodyLargeFontSize[0], { ...bodyLargeFontSize[1] }],
        "landing-small": [smallFontSize[0], { ...smallFontSize[1] }],
        "landing-label": [labelFontSize[0], { ...labelFontSize[1] }],
        "nobu-display": [displayFontSize[0], { ...displayFontSize[1] }],
        "nobu-hero": [heroFontSize[0], { ...heroFontSize[1] }],
        "nobu-section": [sectionFontSize[0], { ...sectionFontSize[1] }],
        "nobu-body": [bodyFontSize[0], { ...bodyFontSize[1] }],
        "nobu-body-lg": [bodyLargeFontSize[0], { ...bodyLargeFontSize[1] }],
        "nobu-small": [smallFontSize[0], { ...smallFontSize[1] }],
        "nobu-label": [labelFontSize[0], { ...labelFontSize[1] }]
      },
      borderRadius: {
        landing: "12px",
        "landing-lg": "20px",
        "landing-xl": "28px",
        nobu: "12px",
        "nobu-lg": "20px",
        "nobu-xl": "28px"
      },
      boxShadow: {
        landing: "0 8px 32px rgba(81, 58, 161, 0.12)",
        "landing-soft": "0 4px 16px rgba(45, 42, 62, 0.06)",
        "landing-lift": "0 12px 40px rgba(81, 58, 161, 0.18)",
        nobu: "0 8px 32px rgba(81, 58, 161, 0.12)",
        "nobu-soft": "0 4px 16px rgba(45, 42, 62, 0.06)",
        "nobu-lift": "0 12px 40px rgba(81, 58, 161, 0.18)"
      },
      transitionDuration: {
        "nobu-fast": landingMotion.duration.fast,
        "nobu-normal": landingMotion.duration.normal,
        "nobu-slow": landingMotion.duration.slow
      },
      transitionTimingFunction: {
        "nobu-standard": landingMotion.easing.standard,
        "nobu-emphasized": landingMotion.easing.emphasized
      }
    }
  },
  plugins: []
} satisfies Config;

export default config;
