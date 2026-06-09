import type { Study, StudyRepository } from "../domain/ports/study-repository";

export class ListStudies {
  constructor(private readonly repository: StudyRepository) {}

  async execute(): Promise<Study[]> {
    return this.repository.listActive();
  }
}

export class GetStudy {
  constructor(private readonly repository: StudyRepository) {}

  async execute(id: string): Promise<Study | undefined> {
    return this.repository.findById(id);
  }
}

export class CreateStudyLocally {
  constructor(private readonly repository: StudyRepository) {}

  async execute(study: Study): Promise<void> {
    await this.repository.saveLocalEdit(study);
  }
}

export class UpdateStudyLocally {
  constructor(private readonly repository: StudyRepository) {}

  async execute(study: Study): Promise<void> {
    await this.repository.saveLocalEdit(study);
  }
}

export class DeleteStudyLocally {
  constructor(private readonly repository: StudyRepository) {}

  async execute(id: string, deletedAt: string): Promise<void> {
    await this.repository.applyTombstone(id, deletedAt);
  }
}
