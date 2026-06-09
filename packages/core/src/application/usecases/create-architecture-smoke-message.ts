export interface ArchitectureMessageProvider {
  getArchitectureMessage(): Promise<string>;
}

export interface ArchitectureSmokeMessage {
  message: string;
  source: "core-use-case";
}

export function createArchitectureSmokeMessage(provider: ArchitectureMessageProvider) {
  return async (): Promise<ArchitectureSmokeMessage> => ({
    message: await provider.getArchitectureMessage(),
    source: "core-use-case"
  });
}
