import { createArchitectureSmokeMessage, type ArchitectureMessageProvider } from "../usecases";
import { createVersionGovernanceService } from "./version-governance-service";

export function createCoreServices(provider: ArchitectureMessageProvider) {
  return {
    createArchitectureSmokeMessage: createArchitectureSmokeMessage(provider),
    versionGovernance: createVersionGovernanceService()
  };
}
