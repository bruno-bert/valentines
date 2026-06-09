export const landingMotion = {
  duration: {
    fast: "150ms",
    normal: "250ms",
    slow: "400ms"
  },
  easing: {
    standard: "cubic-bezier(0.4, 0, 0.2, 1)",
    emphasized: "cubic-bezier(0.2, 0.8, 0.2, 1)"
  },
  distance: {
    slideUp: "16px",
    scaleFrom: "0.96"
  }
} as const;

export type LandingMotion = typeof landingMotion;
