export type ConflictResolutionDecision = "push_local" | "use_remote" | "no_update_required";

export function resolveLastUpdatedWins(localUpdatedAt: string, remoteUpdatedAt: string) {
  const localTime = Date.parse(localUpdatedAt);
  const remoteTime = Date.parse(remoteUpdatedAt);

  if (localTime > remoteTime) {
    return "push_local" satisfies ConflictResolutionDecision;
  }

  if (remoteTime > localTime) {
    return "use_remote" satisfies ConflictResolutionDecision;
  }

  return "no_update_required" satisfies ConflictResolutionDecision;
}
