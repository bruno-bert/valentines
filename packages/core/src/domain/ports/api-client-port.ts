import type { SyncOperation } from "../entities/sync-operation";
import type {
  VersionGovernanceRequest,
  VersionGovernanceResponse
} from "../entities/version-policy";

export interface ApiClientPort {
  pushSyncOperations(operations: SyncOperation[]): Promise<{ accepted: string[] }>;
  pullSyncChanges(filter: { what: string; since?: string }): Promise<{ changes: SyncOperation[] }>;
  checkVersion(request: VersionGovernanceRequest): Promise<VersionGovernanceResponse>;
}
