import type { IdempotencyKey } from "../value-objects/idempotency-key";
import type { UpdatedAt } from "../value-objects/updated-at";

export type SyncOperationState = "pending" | "processing" | "failed" | "done" | "conflict";

export interface SyncOperation {
  id: string;
  eventName: string;
  entityPayload: Record<string, unknown>;
  state: SyncOperationState;
  idempotencyKey: IdempotencyKey;
  createdAt: UpdatedAt;
  updatedAt: UpdatedAt;
  lastAttemptAt?: UpdatedAt;
  failureReason?: string;
}

export function isValidSyncEventName(eventName: string) {
  return /^[a-z]+(_[a-z]+)*$/.test(eventName);
}
