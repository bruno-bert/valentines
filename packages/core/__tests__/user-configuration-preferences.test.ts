import {
  mergeMissingConfigurationStandards,
  resolveSoundEffectsEnabled,
  resolveThemeMode,
  USER_CONFIGURATION_KEYS,
  userConfigurationStandards,
  isSupportedUserConfiguration
} from "../src";

describe("@nobu/core user configuration preferences", () => {
  it("resolves dark as the missing and invalid theme fallback", () => {
    expect(resolveThemeMode()).toBe("dark");
    expect(resolveThemeMode({ key: USER_CONFIGURATION_KEYS.theme, value: { mode: "blue" } })).toBe(
      "dark"
    );
  });

  it("resolves valid light theme and sound effects defaults", () => {
    expect(resolveThemeMode({ key: USER_CONFIGURATION_KEYS.theme, value: { mode: "light" } })).toBe(
      "light"
    );
    expect(resolveSoundEffectsEnabled()).toBe(true);
    expect(
      resolveSoundEffectsEnabled({
        key: USER_CONFIGURATION_KEYS.soundEffects,
        value: { enabled: false }
      })
    ).toBe(false);
  });

  it("merges missing standards without overriding existing user values", () => {
    const merged = mergeMissingConfigurationStandards([
      {
        key: USER_CONFIGURATION_KEYS.theme,
        value: { mode: "light" },
        source: "user_override"
      }
    ]);

    expect(merged).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          key: USER_CONFIGURATION_KEYS.theme,
          value: { mode: "light" }
        }),
        expect.objectContaining({ key: USER_CONFIGURATION_KEYS.soundEffects })
      ])
    );
    expect(userConfigurationStandards).toHaveLength(2);
  });

  it("accepts only supported preference keys and value shapes", () => {
    expect(isSupportedUserConfiguration({ key: USER_CONFIGURATION_KEYS.theme, value: { mode: "dark" } })).toBe(
      true
    );
    expect(isSupportedUserConfiguration({ key: "unknown", value: { mode: "dark" } })).toBe(false);
    expect(isSupportedUserConfiguration({ key: USER_CONFIGURATION_KEYS.soundEffects, value: { enabled: "yes" } })).toBe(
      false
    );
  });
});
