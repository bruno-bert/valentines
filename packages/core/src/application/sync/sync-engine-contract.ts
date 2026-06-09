import type { PullSyncFilter, PullSyncResponse, PushSyncResponse } from "./sync-operation-contract";

export interface SyncEngineContract {
  pushPending(): Promise<PushSyncResponse>;
  pullChanges(filter: PullSyncFilter): Promise<PullSyncResponse>;
}
