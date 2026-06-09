import type { SyncOperation } from "../../domain/entities/sync-operation";

export type PushSyncRequest = {
  operations: SyncOperation[];
};

export type PushSyncResponse = {
  accepted: string[];
  failed: string[];
  conflicts: string[];
};

export type PullSyncFilter = {
  what: string;
  since?: string;
};

export type PullSyncResponse = {
  changes: SyncOperation[];
};
