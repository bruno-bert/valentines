import type { TelemetryProperties } from "../value-objects/telemetry-payload";

export type TelemetryCategory = "analytics" | "breadcrumb" | "crash" | "error";

export interface TelemetryEvent {
  eventName: string;
  category: TelemetryCategory;
  properties: TelemetryProperties;
  timestamp: string;
  offlineBuffered: boolean;
}
