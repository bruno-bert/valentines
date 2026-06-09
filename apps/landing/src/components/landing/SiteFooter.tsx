import type { FooterViewModel } from "../../lib/content/types";
import { toStaticRoutePath } from "../../lib/static-paths";

type SiteFooterProps = FooterViewModel;

export function SiteFooter({ brandName, copyright, tagline, links }: SiteFooterProps) {
  return (
    <footer className="border-t border-landing-border bg-landing-surface px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <p className="mb-6 text-landing-small text-landing-muted">App iOS e Android em breve</p>
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-lg font-bold text-landing-primary">{brandName}</p>
            {tagline ? <p className="mt-1 text-landing-small text-landing-muted">{tagline}</p> : null}
            <p className="mt-4 text-landing-small text-landing-muted">{copyright}</p>
          </div>
          <nav aria-label="Links institucionais e legais">
            <ul className="flex flex-col gap-2">
              {links.map((link) => (
                <li key={link.id}>
                  {link.isPlaceholder ? (
                    <span className="text-landing-small text-landing-muted" aria-disabled="true">
                      {link.label}
                    </span>
                  ) : (
                    <a
                      href={toStaticRoutePath(link.href)}
                      className="text-landing-small text-landing-primary transition-colors duration-nobu-fast hover:underline"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
