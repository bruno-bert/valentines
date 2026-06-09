import type { Study, StudyRepository } from "../src";
import { GetStudy, ListStudies } from "../src";

const study: Study = {
  id: "11111111-1111-4111-8111-111111111111",
  userId: "user-1",
  title: "Brazilian history",
  documentType: "pdf",
  uploadedAt: "2026-06-01T10:00:00.000Z",
  pageCount: 12,
  progressPercentage: 25,
  status: "inProgress",
  createdAt: "2026-06-01T10:01:00.000Z",
  updatedAt: "2026-06-01T10:02:00.000Z",
  deletedAt: null
};

class InMemoryStudyRepository implements StudyRepository {
  private readonly studies = new Map<string, Study>();
  private readonly listeners = new Set<(studies: Study[]) => void>();

  async listActive() {
    return Array.from(this.studies.values()).filter((item) => item.deletedAt === null);
  }

  async findById(id: string) {
    const found = this.studies.get(id);
    return found?.deletedAt === null ? found : undefined;
  }

  observeActive(listener: (studies: Study[]) => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  async upsertFromRemote(remoteStudy: Study) {
    this.studies.set(remoteStudy.id, remoteStudy);
    await this.emit();
  }

  async applyTombstone(id: string, deletedAt: string) {
    const existing = this.studies.get(id);
    if (existing) {
      this.studies.set(id, { ...existing, deletedAt });
    }
    await this.emit();
  }

  async saveLocalEdit(localStudy: Study) {
    this.studies.set(localStudy.id, localStudy);
    await this.emit();
  }

  private async emit() {
    const active = await this.listActive();
    for (const listener of this.listeners) {
      listener(active);
    }
  }
}

describe("@nobu/core StudyRepository", () => {
  it("lists and finds active studies through Core use cases", async () => {
    const repository = new InMemoryStudyRepository();
    await repository.upsertFromRemote(study);

    await expect(new ListStudies(repository).execute()).resolves.toEqual([study]);
    await expect(new GetStudy(repository).execute(study.id)).resolves.toEqual(study);
  });

  it("exposes an observable active-study stream", async () => {
    const repository = new InMemoryStudyRepository();
    const listener = jest.fn();
    const unsubscribe = repository.observeActive(listener);

    await repository.upsertFromRemote(study);
    await repository.applyTombstone(study.id, "2026-06-01T10:03:00.000Z");
    unsubscribe();
    await repository.upsertFromRemote({ ...study, id: "22222222-2222-4222-8222-222222222222" });

    expect(listener).toHaveBeenCalledTimes(2);
    expect(listener).toHaveBeenNthCalledWith(1, [study]);
    expect(listener).toHaveBeenNthCalledWith(2, []);
  });
});
