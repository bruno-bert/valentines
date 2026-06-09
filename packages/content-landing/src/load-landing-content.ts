import landingDocument from "../content/json/pt-BR/landing.json";

import type { LandingContentDocument } from "./types";

export function loadLandingContent(): LandingContentDocument {
  return landingDocument as LandingContentDocument;
}
