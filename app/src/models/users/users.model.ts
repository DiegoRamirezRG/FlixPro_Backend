import dotenv from 'dotenv';
import db from '../../config/database.config';
import { UserModelInterface } from '../../interfaces/users/users.model.interface';
import { LoggedUser } from '../../types/users/users.types';

export const UsersModel: UserModelInterface =  {
    async getUserByAccountId(account_id: string){
        return new Promise(async (resolve, reject) => {
            try {
                const loggedUser: LoggedUser = await db.oneOrNone(`SELECT 
                    user_account.first_name,
                    user_account.last_name,
                    user_account.extra_name,
                    user_account.gender,
                    user_account.date_of_birth,
                    user_account.fk_user_roles,
                    user_account.user_active,
                    user_account.user_profile,
                    user_roles.role_name,
                    user_roles.role_description,
                    user_credentials.email
                FROM user_account
                LEFT JOIN user_roles ON user_roles.id_user_role = user_account.fk_user_roles
                LEFT JOIN user_credentials ON user_credentials.fk_user_account = user_account.id_user_account
                WHERE id_user_account = $1`, [ account_id ]) as LoggedUser;

                resolve(loggedUser);
            } catch (error: any) {
                reject( 'Error al obtener al usuario: ' + error.message);
            }
        });
    },
}