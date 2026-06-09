import {
  StudiesSyncCoordinator,
  type Study,
  type StudyRepository,
  type StudySyncQueuePort,
  type StudiesSyncApiClient
} from "../src";

const baseStudy: Study = {
  id: "11111111-1111-4111-8111-111111111111",
  userId: "user-1",
  title: "Study",
  documentType: "pdf",
  uploadedAt: "2026-06-01T10:00:00.000Z",
  pageCount: 12,
  progressPercentage: 25,
  status: "inProgress",
  createdAt: "2026-06-01T10:01:00.000Z",
  updatedAt: "2026-06-01T10:02:00.000Z",
  deletedAt: null
};

describe("@nobu/core StudiesSyncCoordinator", () => {
  it("pushes queued study operations and marks accepted or conflicting work", async () => {
    const queue = new MemoryStudyQueue([
      {
        id: "accepted-op",
        eventName: "study_updated",
        entityPayload: { id: baseStudy.id },
        updatedAt: baseStudy.updatedAt,
        idempotencyKey: "accepted-op"
      },
      {
        id: "conflict-op",
        eventName: "study_updated",
        entityPayload: { id: "other" },
        updatedAt: baseStudy.updatedAt,
        idempotencyKey: "conflict-op"
      }
    ]);
    const api = new MemoryStudiesSyncApiClient({
      accepted: ["accepted-op"],
      failed: [],
      conflicts: [{ idempotencyKey: "conflict-op", code: "stale_update" }]
    });

    await new StudiesSyncCoordinator(new MemoryStudyRepository(), queue, api).pushPending();

    expect(api.pushed).toHaveLength(2);
    expect(queue.doneIds).toEqual(["accepted-op"]);
    expect(queue.conflicts).toEqual([{ id: "conflict-op", code: "stale_update" }]);
  });

  it("pulls study events and applies them through the repository", async () => {
    const repository = new MemoryStudyRepository();
    const api = new MemoryStudiesSyncApiClient(undefined, [
      {
        eventName: "study_created",
        idempotencyKey: "created",
        updatedAt: baseStudy.updatedAt,
        entityPayload: { ...baseStudy }
      },
      {
        eventName: "study_updated",
        idempotencyKey: "updated",
        updatedAt: "2026-06-01T10:03:00.000Z",
        entityPayload: { ...baseStudy, title: "Remote", updatedAt: "2026-06-01T10:03:00.000Z" }
      },
      {
        eventName: "study_deleted",
        idempotencyKey: "deleted",
        updatedAt: "2026-06-01T10:04:00.000Z",
        entityPayload: { id: baseStudy.id, deletedAt: "2026-06-01T10:04:00.000Z" }
      }
    ]);

    await new StudiesSyncCoordinator(repository, new MemoryStudyQueue(), api).pullAndApply({
      what: "*",
      since: "2026-06-01T00:00:00.000Z"
    });

    expect(api.pullRequests).toEqual([{ what: "*", since: "2026-06-01T00:00:00.000Z" }]);
    expect(repository.upserts).toEqual([
      expect.objectContaining({ title: "Study" }),
      expect.objectContaining({ title: "Remote" })
    ]);
    expect(repository.tombstones).toEqual([
      { id: baseStudy.id, deletedAt: "2026-06-01T10:04:00.000Z" }
    ]);
  });
});

class MemoryStudyRepository implements StudyRepository {
  readonly upserts: Study[] = [];
  readonly tombstones: Array<{ id: string; deletedAt: string }> = [];

  async listActive(): Promise<Study[]> {
    return [];
  }

  async findById(): Promise<Study | undefined> {
    return undefined;
  }

  observeActive(): () => void {
    return () => undefined;
  }

  async upsertFromRemote(study: Study): Promise<void> {
    this.upserts.push(study);
  }

  async applyTombstone(id: string, deletedAt: string): Promise<void> {
    this.tombstones.push({ id, deletedAt });
  }

  async saveLocalEdit(): Promise<void> {
    return undefined;
  }
}

class MemoryStudyQueue implements StudySyncQueuePort {
  readonly doneIds: string[] = [];
  readonly conflicts: Array<{ id: string; code: string }> = [];

  constructor(private readonly pending: Awaited<ReturnType<StudySyncQueuePort["listPending"]>> = []) {}

  async listPending() {
    return this.pending;
  }

  async markDone(id: string): Promise<void> {
    this.doneIds.push(id);
  }

  async markConflict(id: string, code: string): Promise<void> {
    this.conflicts.push({ id, code });
  }
}

class MemoryStudiesSyncApiClient implements StudiesSyncApiClient {
  readonly pushed: Parameters<StudiesSyncApiClient["pushSync"]>[0]["operations"] = [];
  readonly pullRequests: Array<{ what: string; since?: string }> = [];

  constructor(
    private readonly pushResponse: Awaited<ReturnType<StudiesSyncApiClient["pushSync"]>> = {
      accepted: [],
      failed: [],
      conflicts: []
    },
    private readonly changes: Awaited<ReturnType<StudiesSyncApiClient["pullSync"]>>["changes"] = []
  ) {}

  async pushSync(request: Parameters<StudiesSyncApiClient["pushSync"]>[0]) {
    this.pushed.push(...request.operations);
    return this.pushResponse;
  }

  async pullSync(request: { what: string; since?: string }) {
    this.pullRequests.push(request);
    return { changes: this.changes };
  }
}
