import { FutureCmsContentProvider } from "../contracts";
import { ContentFetchService } from "../services";

export function createContentManagement() {
  const provider = new FutureCmsContentProvider();

  return {
    provider,
    contentFetchService: new ContentFetchService(provider)
  };
}
