export type Genders = 'Male' | 'Female' | 'Other';

export interface UserAccountType{
    id_user_account: string;
    first_name: string;
    last_name: string;
    extra_name?: string | null;
    gender: Genders;
    date_of_birth: string;
    user_profile?: string | null;
    fk_user_roles: string;
    user_active: boolean;
    created_at: string;
    updated_at?: string | null;
}

export interface UserCredentialsType{
    id_user_credential: string;
    email: string;
    password: string;
    user_token?: string | null;
    last_login?: string | null;
    last_try?: string | null;
    login_attempts: number;
    fk_user_account: string;
    created_at: string;
    updated_at?: string | null;
}

export type CreateAccountType = Omit<UserAccountType, 'id_user_account' | 'user_active' | 'created_at' | 'updated_at'>;
export type CreateCredentialsType = Omit<UserCredentialsType, 'id_user_credential' | 'user_token' | 'last_login' | 'last_try' | 'login_attempts' | 'fk_user_account' | 'created_at' | 'updated_at' >;