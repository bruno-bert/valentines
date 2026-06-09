export interface AuthenticatedSubject {
  authenticated: boolean;
  subject: string;
}

export interface AuthenticationProviderPort {
  verifyGoogleToken(idToken: string): Promise<AuthenticatedSubject>;
}
