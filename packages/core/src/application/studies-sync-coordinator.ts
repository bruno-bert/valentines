import type { Study, StudyRepository } from "../domain/ports/study-repository";

export interface StudySyncOperation {
  id: string;
  eventName: string;
  entityPayload?: Record<string, unknown>;
  updatedAt: string;
  idempotencyKey: string;
}

export interface StudySyncQueuePort {
  listPending(): Promise<StudySyncOperation[]>;
  markDone(id: string): Promise<void>;
  markConflict(id: string, code: string): Promise<void>;
}

export interface StudiesSyncApiClient {
  pushSync(request: {
    operations: Array<{
      eventName: string;
      entityPayload: Record<string, unknown>;
      updatedAt: string;
      idempotencyKey: string;
    }>;
  }): Promise<{
    accepted: string[];
    failed: Array<{ idempotencyKey: string; code: string }>;
    conflicts: Array<{ idempotencyKey: string; code: string }>;
  }>;
  pullSync(request: { what: string; since?: string }): Promise<{
    changes: Array<{
      eventName: string;
      entityPayload: Record<string, unknown>;
      updatedAt: string;
      idempotencyKey: string;
    }>;
  }>;
}

export class StudiesSyncCoordinator {
  constructor(
    private readonly repository: StudyRepository,
    private readonly queue: StudySyncQueuePort,
    private readonly apiClient: StudiesSyncApiClient
  ) {}

  async pushPending() {
    const pending = (await this.queue.listPending()).filter((operation) =>
      operation.eventName.startsWith("study_")
    );
    const response = await this.apiClient.pushSync({
      operations: pending.map((operation) => ({
        eventName: operation.eventName,
        entityPayload: operation.entityPayload ?? {},
        updatedAt: operation.updatedAt,
        idempotencyKey: operation.idempotencyKey
      }))
    });

    await Promise.all(response.accepted.map((id) => this.queue.markDone(id)));
    await Promise.all(
      response.conflicts.map((conflict) =>
        this.queue.markConflict(conflict.idempotencyKey, conflict.code)
      )
    );

    return response;
  }

  async pullAndApply(request: { what?: string; since?: string } = {}) {
    const response = await this.apiClient.pullSync({
      what: request.what ?? "*",
      since: request.since
    });

    for (const change of response.changes) {
      if (change.eventName === "study_deleted") {
        const id = change.entityPayload.id;
        const deletedAt = change.entityPayload.deletedAt ?? change.updatedAt;
        if (typeof id === "string" && typeof deletedAt === "string") {
          await this.repository.applyTombstone(id, deletedAt);
        }
      } else if (change.eventName === "study_created" || change.eventName === "study_updated") {
        await this.repository.upsertFromRemote(change.entityPayload as unknown as Study);
      }
    }

    return response;
  }
}
