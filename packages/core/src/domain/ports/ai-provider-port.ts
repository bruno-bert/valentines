export type AiOperation = "quiz_generation" | "flashcard_generation" | "tutoring" | "ocr";

export interface AiProviderResponse {
  status: "mocked" | "not_implemented";
  message: string;
}

export interface AiProviderPort {
  run(operation: AiOperation): Promise<AiProviderResponse>;
}
