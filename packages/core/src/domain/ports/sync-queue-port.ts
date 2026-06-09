import type { SyncOperation } from "../entities/sync-operation";

export interface SyncQueuePort {
  enqueue(operation: SyncOperation): Promise<void>;
  listPending(): Promise<SyncOperation[]>;
  markDone(id: string): Promise<void>;
}
