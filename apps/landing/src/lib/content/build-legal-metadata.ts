import type { Metadata } from "next";

type LegalSeo = {
  title: string;
  description: string;
};

export function buildLegalMetadata(seo: LegalSeo): Metadata {
  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: seo.title,
      description: seo.description,
      locale: "pt_BR",
      type: "website",
      siteName: "Nobu"
    },
    twitter: {
      card: "summary",
      title: seo.title,
      description: seo.description
    }
  };
}
