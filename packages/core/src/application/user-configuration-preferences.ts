export type ThemeMode = "dark" | "light";
export type UserConfigurationSource = "copied_default" | "user_override";

export const USER_CONFIGURATION_KEYS = {
  theme: "experience.theme",
  soundEffects: "experience.soundEffects"
} as const;

export interface UserConfigurationPreference {
  key: string;
  value: Record<string, unknown>;
  source?: UserConfigurationSource;
  updatedAt?: string;
}

export const userConfigurationStandards = [
  {
    key: USER_CONFIGURATION_KEYS.theme,
    value: { mode: "dark" },
    description: "Default visual theme"
  },
  {
    key: USER_CONFIGURATION_KEYS.soundEffects,
    value: { enabled: true },
    description: "Default sound effects preference"
  }
] as const;

export function resolveThemeMode(configuration?: UserConfigurationPreference): ThemeMode {
  return configuration?.value.mode === "light" ? "light" : "dark";
}

export function resolveSoundEffectsEnabled(configuration?: UserConfigurationPreference): boolean {
  return typeof configuration?.value.enabled === "boolean" ? configuration.value.enabled : true;
}

export function mergeMissingConfigurationStandards(
  existing: UserConfigurationPreference[],
  updatedAt = new Date().toISOString()
): UserConfigurationPreference[] {
  const existingKeys = new Set(existing.map((configuration) => configuration.key));
  return [
    ...existing,
    ...userConfigurationStandards
      .filter((standard) => !existingKeys.has(standard.key))
      .map((standard) => ({
        key: standard.key,
        value: standard.value,
        source: "copied_default" as const,
        updatedAt
      }))
  ];
}

export function isSupportedUserConfiguration(input: {
  key: string;
  value: Record<string, unknown>;
}) {
  if (input.key === USER_CONFIGURATION_KEYS.theme) {
    return input.value.mode === "dark" || input.value.mode === "light";
  }
  if (input.key === USER_CONFIGURATION_KEYS.soundEffects) {
    return typeof input.value.enabled === "boolean";
  }
  return false;
}
