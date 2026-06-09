export type PlaceholderStatus = "mocked" | "noop" | "not_implemented";

export interface SafePlaceholder {
  status: PlaceholderStatus;
  message: string;
}

export function createSafePlaceholder(message: string, status: PlaceholderStatus = "mocked") {
  return {
    status,
    message
  } satisfies SafePlaceholder;
}
