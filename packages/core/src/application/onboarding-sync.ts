export interface OnboardingUserProfile {
  id: string;
  displayName: string;
  nobuSince: string;
  activeAvatarId?: string;
  updatedAt: string;
}

export interface OnboardingConfiguration {
  key: string;
  value: Record<string, unknown>;
  updatedAt: string;
}

export interface OnboardingAvatar {
  id: string;
  userId: string;
  avatarName: string;
  assetReference: string;
  assetType: "placeholder" | "image" | "lottie" | "remote";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OnboardingSyncSnapshot {
  profile?: OnboardingUserProfile;
  generalConfigurations: OnboardingConfiguration[];
  userConfigurations: OnboardingConfiguration[];
  avatars: OnboardingAvatar[];
}

export interface OnboardingStoragePort {
  upsertGeneralConfigurations(configurations: OnboardingConfiguration[]): Promise<void>;
  upsertUserConfigurations(configurations: OnboardingConfiguration[]): Promise<void>;
  upsertUserProfile(profile: OnboardingUserProfile): Promise<void>;
  upsertAvatars(avatars: OnboardingAvatar[]): Promise<void>;
  loadSnapshot(): Promise<OnboardingSyncSnapshot>;
}

export interface OnboardingRemotePort {
  fetchSnapshot(): Promise<OnboardingSyncSnapshot>;
}

export interface SafeCacheDecision {
  safe: boolean;
  missing: Array<"user_profile" | "general_configuration" | "user_configuration">;
}

export function evaluateSafeCache(snapshot: OnboardingSyncSnapshot): SafeCacheDecision {
  const missing: SafeCacheDecision["missing"] = [];

  if (!snapshot.profile) {
    missing.push("user_profile");
  }
  if (snapshot.generalConfigurations.length === 0) {
    missing.push("general_configuration");
  }
  if (snapshot.userConfigurations.length === 0) {
    missing.push("user_configuration");
  }

  return {
    safe: missing.length === 0,
    missing
  };
}

export interface SyncOrchestratorResult {
  source: "remote" | "cache";
  snapshot: OnboardingSyncSnapshot;
  safeCache: SafeCacheDecision;
}

export class SyncOrchestrator {
  constructor(
    private readonly remote: OnboardingRemotePort,
    private readonly storage: OnboardingStoragePort
  ) {}

  async sync(): Promise<SyncOrchestratorResult> {
    try {
      const snapshot = await this.remote.fetchSnapshot();
      await this.persist(snapshot);
      return {
        source: "remote",
        snapshot,
        safeCache: evaluateSafeCache(snapshot)
      };
    } catch {
      const snapshot = await this.storage.loadSnapshot();
      const safeCache = evaluateSafeCache(snapshot);
      if (!safeCache.safe) {
        throw new Error(`unsafe_cache:${safeCache.missing.join(",")}`);
      }

      return {
        source: "cache",
        snapshot,
        safeCache
      };
    }
  }

  async persist(snapshot: OnboardingSyncSnapshot) {
    if (snapshot.profile) {
      await this.storage.upsertUserProfile(snapshot.profile);
    }
    await this.storage.upsertGeneralConfigurations(snapshot.generalConfigurations);
    await this.storage.upsertUserConfigurations(snapshot.userConfigurations);
    await this.storage.upsertAvatars(snapshot.avatars);
  }
}

export function createSyncOrchestrator(
  remote: OnboardingRemotePort,
  storage: OnboardingStoragePort
) {
  return new SyncOrchestrator(remote, storage);
}
