export type Result<TValue, TError = Error> =
  | {
      ok: true;
      value: TValue;
    }
  | {
      ok: false;
      error: TError;
    };

export function success<TValue>(value: TValue): Result<TValue> {
  return { ok: true, value };
}

export function failure<TError extends Error>(error: TError): Result<never, TError> {
  return { ok: false, error };
}
