import type {
  ContentFetchRequest,
  ContentProvider,
  ManagedContentDocument
} from "../contracts/content-provider";

export class ContentFetchService {
  constructor(private readonly provider: ContentProvider) {}

  fetch(request: ContentFetchRequest): Promise<ManagedContentDocument[]> {
    return this.provider.fetchContent(request);
  }
}
