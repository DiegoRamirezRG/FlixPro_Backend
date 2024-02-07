export interface AuthGuardianInterface {
    validateToken: (token: string) => Promise<void>;
}