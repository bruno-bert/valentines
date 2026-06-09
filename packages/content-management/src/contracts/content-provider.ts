export type ContentPlatform = "mobile" | "web" | "landing";
export type ContentSource = "json" | "strapi";

export interface ContentFetchRequest {
  platform: ContentPlatform;
  source: ContentSource;
  locale: string;
}

export interface ManagedContentDocument {
  id: string;
  locale: string;
  version: string;
  title: string;
  body: string;
}

export interface ContentProvider {
  fetchContent(request: ContentFetchRequest): Promise<ManagedContentDocument[]>;
}

export class NotImplementedError extends Error {
  constructor(boundary: string) {
    super(`${boundary} is not implemented yet`);
    this.name = "NotImplementedError";
  }
}

export class FutureCmsContentProvider implements ContentProvider {
  async fetchContent(_request: ContentFetchRequest): Promise<ManagedContentDocument[]> {
    throw new NotImplementedError("Future CMS content provider");
  }
}
