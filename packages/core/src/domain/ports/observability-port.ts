import type { TelemetryEvent } from "../entities/telemetry-event";

export interface ObservabilityPort {
  addBreadcrumb(event: TelemetryEvent): Promise<void>;
  captureError(error: Error, event?: TelemetryEvent): Promise<void>;
}
