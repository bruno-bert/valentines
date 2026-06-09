import type { Platform } from "../value-objects/app-version";

export type VersionGovernanceStatus = "force_update" | "optional_update" | "up_to_date";

export interface VersionGovernanceRequest {
  installedVersion: string;
  platform: Platform;
}

export interface VersionGovernanceResponse {
  status: VersionGovernanceStatus;
  latestVersion?: string;
  minimumSupportedVersion?: string;
  releaseNotes?: string[];
}
