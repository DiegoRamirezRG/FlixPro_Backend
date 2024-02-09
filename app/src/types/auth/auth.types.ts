import { CreateAccountType, CreateCredentialsType } from "../users/users.types";

export interface CreateNewUser{
    user_account: CreateAccountType;
    user_credentials: CreateCredentialsType;
}

export interface GetAuth{
    email: string;
    password: string;
}