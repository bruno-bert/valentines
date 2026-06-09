import type { TelemetryEvent } from "../entities/telemetry-event";

export interface AnalyticsPort {
  track(event: TelemetryEvent): Promise<void>;
  flush?(): Promise<void>;
}
