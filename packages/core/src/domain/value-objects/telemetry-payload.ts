export const forbiddenTelemetryKeys = [
  "childName",
  "uploadedPdfContent",
  "freeTextAnswer",
  "photo",
  "ocrContent",
  "voiceRecording",
  "sensitiveEducationalData",
  "credential",
  "rawToken",
  "cookie",
  "secret"
] as const;

export type ForbiddenTelemetryKey = (typeof forbiddenTelemetryKeys)[number];
export type TelemetryProperties = Record<string, string | number | boolean | null>;

export function containsForbiddenTelemetry(properties: Record<string, unknown>) {
  return forbiddenTelemetryKeys.some((key) =>
    Object.prototype.hasOwnProperty.call(properties, key)
  );
}

export function createTelemetryProperties(properties: TelemetryProperties): TelemetryProperties {
  if (containsForbiddenTelemetry(properties)) {
    throw new Error("Telemetry contains forbidden child-sensitive data");
  }

  return properties;
}
