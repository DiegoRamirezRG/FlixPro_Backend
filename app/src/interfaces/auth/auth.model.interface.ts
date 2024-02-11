import { CreateAccountType, CreateCredentialsType } from "../../types/users/users.types";

export interface AuthModelInterface {
    createNewUserAccount(user_account: CreateAccountType, user_credentials: CreateCredentialsType): Promise<{newUserAccount: any;}>
    getUserAuthenticated(email: string, password: string): Promise<{refresh_token: string; access_token: string;}>
    validateAccessToken(access_token: string): Promise<string>;
    validateRefreshToken(refresh_token: string): Promise<string>;
    updateAccessToken(refresh_token: string, email: string, user_id: string): Promise<string>;
}