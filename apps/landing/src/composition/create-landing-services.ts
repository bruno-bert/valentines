import { getLandingPageViewModel } from "@nobu/content-landing";
import { NotImplementedError } from "@nobu/content-management";

type ContentStrategy = "json" | "strapi";

function getContentSource(): ContentStrategy {
  const source = process.env.CONTENT_SOURCE || "json";
  if (source === "json" || source === "strapi") {
    return source;
  }
  throw new TypeError(
    `Invalid CONTENT_SOURCE "${source}". Valid values: "json", "strapi"`
  );
}

export function createLandingServices() {
  const strategy = getContentSource();

  if (strategy === "strapi") {
    throw new NotImplementedError("Strapi content source");
  }

  return {
    content: getLandingPageViewModel()
  };
}
