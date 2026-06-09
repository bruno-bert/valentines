import { getPrivacyPageViewModel } from "@nobu/content-legal";

import { LegalPageShell } from "../../components/legal/LegalPageShell";
import { buildLegalMetadata } from "../../lib/content/build-legal-metadata";
import { getLandingPageViewModel } from "../../lib/content/map-landing-page";

const privacy = getPrivacyPageViewModel();
const landing = getLandingPageViewModel();

export const metadata = buildLegalMetadata(privacy.seo);

export default function PrivacyPage() {
  return (
    <LegalPageShell
      document={privacy}
      logoSrc={landing.header.logoSrc}
      logoAlt={landing.header.logoAlt}
    />
  );
}
