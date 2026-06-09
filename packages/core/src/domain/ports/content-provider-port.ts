import type { ContentDocument } from "../entities/content-document";

export interface ContentProviderPort {
  loadBundledContent(): Promise<ContentDocument[]>;
  loadLocalContent(): Promise<ContentDocument[]>;
  persistLocalContent(content: ContentDocument[]): Promise<void>;
}
