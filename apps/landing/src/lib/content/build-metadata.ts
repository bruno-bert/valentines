import type { Metadata } from "next";

import type { SeoViewModel } from "./types";

export function buildPageMetadata(seo: SeoViewModel): Metadata {
  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: seo.openGraph.title,
      description: seo.openGraph.description,
      locale: seo.openGraph.locale,
      type: "website",
      siteName: "Nobu"
    },
    twitter: {
      card: seo.twitter.card,
      title: seo.twitter.title,
      description: seo.twitter.description
    }
  };
}
