export type StudyDocumentType = "pdf" | "docx";

export type StudyStatus = "notStarted" | "materialUploaded" | "inProgress" | "completed";

export interface Study {
  readonly id: string;
  readonly userId: string;
  readonly title: string;
  readonly documentType: StudyDocumentType;
  readonly uploadedAt: string;
  readonly pageCount: number | null;
  readonly progressPercentage: number;
  readonly status: StudyStatus;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt: string | null;
}

export interface StudyRepository {
  listActive(): Promise<Study[]>;
  findById(id: string): Promise<Study | undefined>;
  observeActive(listener: (studies: Study[]) => void): () => void;
  upsertFromRemote(study: Study): Promise<void>;
  applyTombstone(id: string, deletedAt: string): Promise<void>;
  saveLocalEdit(study: Study): Promise<void>;
}
