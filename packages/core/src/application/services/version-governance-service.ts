import type {
  VersionGovernanceRequest,
  VersionGovernanceResponse,
  VersionGovernanceStatus
} from "../../domain/entities/version-policy";

export function createVersionGovernanceService(
  defaultStatus: VersionGovernanceStatus = "up_to_date"
) {
  return {
    checkVersion(_request: VersionGovernanceRequest): Promise<VersionGovernanceResponse> {
      return Promise.resolve({
        status: defaultStatus,
        releaseNotes:
          defaultStatus === "optional_update" ? ["A placeholder update is available."] : undefined
      });
    }
  };
}
