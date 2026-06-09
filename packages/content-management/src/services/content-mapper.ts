import type { ManagedContentDocument } from "../contracts/content-provider";

export interface ManagedContentViewModel {
  id: string;
  title: string;
  body: string;
  version: string;
}

export function mapManagedContent(document: ManagedContentDocument) {
  return {
    id: document.id,
    title: document.title,
    body: document.body,
    version: document.version
  } satisfies ManagedContentViewModel;
}
