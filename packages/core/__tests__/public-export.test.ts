import {
  createCoreServices,
  createTelemetryProperties,
  createVersionGovernanceService,
  isValidSyncEventName,
  resolveLastUpdatedWins
} from "../src";

describe("@nobu/core public exports", () => {
  it("exports architecture services and contracts", async () => {
    const services = createCoreServices({
      async getArchitectureMessage() {
        return "Hello World from Nobu Core";
      }
    });

    await expect(services.createArchitectureSmokeMessage()).resolves.toEqual({
      message: "Hello World from Nobu Core",
      source: "core-use-case"
    });
  });

  it("exports sync and telemetry helpers", () => {
    expect(isValidSyncEventName("lesson_completed")).toBe(true);
    expect(resolveLastUpdatedWins("2026-05-19T10:00:00.000Z", "2026-05-19T09:00:00.000Z")).toBe(
      "push_local"
    );
    expect(createTelemetryProperties({ screen: "home" })).toEqual({ screen: "home" });
  });

  it("defaults version governance to up_to_date", async () => {
    await expect(
      createVersionGovernanceService().checkVersion({
        installedVersion: "0.1.0",
        platform: "ios"
      })
    ).resolves.toMatchObject({ status: "up_to_date" });
  });
});
