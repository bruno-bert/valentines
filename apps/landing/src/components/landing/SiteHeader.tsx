import type { HeaderViewModel } from "../../lib/content/types";

import { toStaticAssetPath } from "../../lib/static-paths";

import { AnchorLink } from "./AnchorLink";

export function SiteHeader({
  logoAlt,
  logoSrc,
  navItems,
  primaryCta
}: HeaderViewModel) {
  return (
    <header className="sticky top-0 z-20 overflow-x-hidden border-b border-landing-border bg-landing-surface/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl min-w-0 flex-nowrap items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-2">
        <a
          href="#"
          className="flex shrink-0 items-center"
          aria-label={logoAlt}
        >
          {logoSrc ? (
            <img
            src={toStaticAssetPath(logoSrc)}
            alt=""
            width={544}
            height={175}
            className="h-8 w-auto object-contain sm:h-14 lg:h-16"
            />
          ) : null}
        </a>
        <nav
          aria-label="Navegação principal"
          className="hidden min-w-0 items-center gap-4 lg:flex"
        >
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="whitespace-nowrap text-sm font-medium text-landing-muted transition-colors duration-nobu-fast hover:text-landing-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="shrink-0">
          <AnchorLink {...primaryCta} variant="primary" size="default" />
        </div>
      </div>
    </header>
  );
}
