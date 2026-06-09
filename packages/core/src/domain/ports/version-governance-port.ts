import type {
  VersionGovernanceRequest,
  VersionGovernanceResponse
} from "../entities/version-policy";

export interface VersionGovernancePort {
  checkVersion(request: VersionGovernanceRequest): Promise<VersionGovernanceResponse>;
}
