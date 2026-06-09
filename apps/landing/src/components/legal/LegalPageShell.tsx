import type { LegalDocumentViewModel } from "@nobu/content-legal";
import type { ReactNode } from "react";

import { toStaticAssetPath, toStaticRoutePath } from "../../lib/static-paths";

import { LegalDocumentBody } from "./LegalDocumentBody";

type LegalPageShellProps = {
  document: LegalDocumentViewModel;
  logoSrc?: string;
  logoAlt: string;
  children?: ReactNode;
};

export function LegalPageShell({ document, logoSrc, logoAlt, children }: LegalPageShellProps) {
  return (
    <div className="min-h-screen bg-landing-page text-landing-text">
      <header className="border-b border-landing-border bg-landing-surface/95 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-2 sm:px-4">
          <a href={toStaticRoutePath("/")} className="flex shrink-0 items-center" aria-label={logoAlt}>
            {logoSrc ? (
              <img
                src={toStaticAssetPath(logoSrc)}
                alt=""
                width={544}
                height={175}
                className="h-8 w-auto object-contain sm:h-14 lg:h-16"
              />
            ) : (
              <span className="text-lg font-bold text-landing-primary">{logoAlt}</span>
            )}
          </a>
          <a
            href={toStaticRoutePath("/")}
            className="text-landing-small font-medium text-landing-primary transition-colors duration-nobu-fast hover:underline"
          >
            Voltar ao site
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12">
        <h1 className="text-landing-title font-bold text-landing-text">{document.title}</h1>
        <p className="mt-2 text-landing-small text-landing-muted">
          Última atualização: {document.lastUpdatedLabel}
        </p>
        <div className="mt-10">{children ?? <LegalDocumentBody sections={document.sections} />}</div>
      </main>
    </div>
  );
}
