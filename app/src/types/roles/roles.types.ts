export interface RolType {
    id_user_role: string;
    role_name: string;
    role_description?: string | null;
    role_active: boolean;
    created_at: Date;
    updated_at?: Date | null;
}