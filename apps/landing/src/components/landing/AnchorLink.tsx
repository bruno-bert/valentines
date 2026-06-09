import type { AnchorCtaViewModel } from "../../lib/content/types";

type AnchorLinkProps = AnchorCtaViewModel & {
  variant: "primary" | "secondary";
  size?: "default" | "large";
};

export function AnchorLink({
  label,
  href,
  ariaLabel,
  variant,
  size = "default"
}: AnchorLinkProps) {
  const sizeClass = size === "large" ? "px-6 py-3.5 text-base" : "px-5 py-3 text-sm";
  const base = `motion-button-press inline-flex items-center justify-center rounded-landing font-semibold transition-colors duration-nobu-fast ${sizeClass}`;
  const styles =
    variant === "primary"
      ? `${base} bg-landing-primary text-white hover:bg-landing-primarySoft`
      : `${base} border border-landing-primary bg-landing-surface text-landing-primary hover:bg-landing-page`;

  return (
    <a href={href} className={styles} aria-label={ariaLabel ?? label}>
      {label}
    </a>
  );
}
