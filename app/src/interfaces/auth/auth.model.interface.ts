import { CreateAccountType, CreateCredentialsType } from "../../types/users/users.types";

export interface AuthModelInterface {
    createNewUserAccount(user_account: CreateAccountType, user_credentials: CreateCredentialsType): Promise<{newUserAccount: any;}>
    getUserAuthenticated(email: string, password: string): Promise<{refresh_token: string; access_token: string;}>
}