export type IdempotencyKey = string;

export function createIdempotencyKey(value: string): IdempotencyKey {
  if (!value.trim()) {
    throw new Error("Idempotency key cannot be empty");
  }

  return value;
}
