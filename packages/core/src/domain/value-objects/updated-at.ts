export type UpdatedAt = string;

export function createUpdatedAt(value: string): UpdatedAt {
  if (Number.isNaN(Date.parse(value))) {
    throw new Error("updatedAt must be an ISO date string");
  }

  return value;
}
