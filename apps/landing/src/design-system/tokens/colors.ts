/** Primitives — sync path documented for apps/mobile in a future phase */
export const colorPrimitives = {
  purple500: "#513aa1",
  purple400: "#6A52B5",
  purple300: "#EDE8F7",
  blue400: "#5CB8FF",
  blue300: "#9DD4FF",
  green400: "#58D68D",
  yellow400: "#FFD166",
  orange400: "#FF8A3D",
  neutral900: "#2D2A3E",
  neutral600: "#5C5670",
  neutral400: "#A0A0B5",
  neutral100: "#F7F7FB",
  neutral50: "#FFF9F2",
  white: "#FFFFFF",
  borderDefault: "#E8E4F8"
} as const;

export const landingColors = {
  page: colorPrimitives.neutral50,
  surface: colorPrimitives.white,
  primary: colorPrimitives.purple500,
  primarySoft: colorPrimitives.purple400,
  primaryTint: colorPrimitives.purple300,
  accent: colorPrimitives.orange400,
  magicalBlue: colorPrimitives.blue400,
  magicalBlueSoft: colorPrimitives.blue300,
  success: colorPrimitives.green400,
  celebration: colorPrimitives.yellow400,
  text: colorPrimitives.neutral900,
  muted: colorPrimitives.neutral600,
  subtle: colorPrimitives.neutral400,
  border: colorPrimitives.borderDefault,
  subtleBg: colorPrimitives.neutral100
} as const;

export const semanticColors = {
  background: {
    page: landingColors.page,
    surface: landingColors.surface,
    subtle: landingColors.subtleBg
  },
  interactive: {
    primary: landingColors.primary,
    primaryHover: landingColors.primarySoft,
    accent: landingColors.accent
  },
  text: {
    primary: landingColors.text,
    secondary: landingColors.muted,
    inverse: landingColors.surface
  }
} as const;

export const cssGradients = {
  hero: "linear-gradient(135deg, #513aa1 0%, #5CB8FF 100%)",
  panel: "linear-gradient(180deg, rgba(81,58,161,0.2) 0%, rgba(255,249,242,0) 100%)",
  waitlist: "linear-gradient(135deg, rgba(81,58,161,0.12) 0%, rgba(92,184,255,0.08) 100%)"
} as const;

export type LandingColors = typeof landingColors;
