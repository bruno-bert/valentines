import { getTermsPageViewModel } from "@nobu/content-legal";

import { LegalPageShell } from "../../components/legal/LegalPageShell";
import { buildLegalMetadata } from "../../lib/content/build-legal-metadata";
import { getLandingPageViewModel } from "../../lib/content/map-landing-page";

const terms = getTermsPageViewModel();
const landing = getLandingPageViewModel();

export const metadata = buildLegalMetadata(terms.seo);

export default function TermsPage() {
  return (
    <LegalPageShell
      document={terms}
      logoSrc={landing.header.logoSrc}
      logoAlt={landing.header.logoAlt}
    />
  );
}
