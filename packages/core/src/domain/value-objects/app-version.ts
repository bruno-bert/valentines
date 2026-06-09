export type Platform = "ios" | "android" | "web";

export interface AppVersion {
  installedVersion: string;
  platform: Platform;
}
