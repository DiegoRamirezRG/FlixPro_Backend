import crypto from 'crypto';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../../config/database.config';
import { AuthModelInterface } from '../../interfaces/auth/auth.model.interface';

dotenv.config();
export const AuthModel: AuthModelInterface = {
    async createNewUserAccount(user_account, user_credentials){
        try {
            const result = await db.tx(async t => {
                const newUserAccount = await t.one( `INSERT INTO user_account( first_name, last_name, extra_name, gender, date_of_birth, user_profile, fk_user_roles ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id_user_account`,[ user_account.first_name, user_account.last_name, user_account.extra_name ? user_account.extra_name : null, user_account.gender, user_account.date_of_birth, user_account.user_profile ? user_account.user_profile : null, user_account.fk_user_roles ] );

                const encryptedPassword = crypto.createHash('md5').update(user_credentials.password).digest('hex');
                await t.none(`INSERT INTO user_credentials(email, password, fk_user_account) values ($1, $2, $3)`, [ user_credentials.email, encryptedPassword, newUserAccount.id_user_account ]);
                return newUserAccount.id_user_account;
            });

            return result;
        } catch (error: any) {
            throw new Error('Error al registrar usuario: ' + error.message);
        }
    },

    async getUserAuthenticated(email, password) {
        try {
            const encryptedPassword = crypto.createHash('md5').update(password).digest('hex');
            const result = await db.one('CALL getUserAuthenticate($1, $2, $3, $4)', [email, encryptedPassword, '', '']);

            if(result.resultado != 'success'){
                throw new Error(result.motivo);
            }else{
                const loggedCredentials = result.motivo.split('|');
                const refreshToken = jwt.sign({ id_user_credentials: loggedCredentials[0], id_user_account: loggedCredentials[1], email: email }, process.env.JWT_REF!, {
                    expiresIn: '30d'
                });

                const accessToken = jwt.sign({ refreshToken: refreshToken, email: email }, process.env.JWT_ACC!, {
                    expiresIn: '24h'
                });

                await db.none(`UPDATE user_credentials SET user_token = $1 WHERE id_user_credential = $2`, [accessToken, loggedCredentials[0]]);

                return {
                    refresh_token: refreshToken,
                    access_token: accessToken
                };
            }
        } catch (error: any) {
            throw new Error('Error al registrar usuario: ' + error.message);
        }
    },

    async validateAccessToken(access_token) {
        return new Promise(async (resolve, reject) => {
            try {
                const accessTokenDecoded = jwt.verify(access_token, process.env.JWT_ACC!) as JwtPayload;
                const { refreshToken } = accessTokenDecoded;

                const refreshTokenDecoded = jwt.verify(refreshToken, process.env.JWT_REF!) as JwtPayload;
                const { id_user_account } = refreshTokenDecoded;

                resolve(id_user_account);
            } catch (error: any) {
                reject( 'Error al validar token de acceso: ' + error.message );
            }
        })
    },

    async validateRefreshToken(refresh_token){
        return new Promise(async (resolve, reject) => {
            try {
                const refreshDecoded = jwt.verify(refresh_token, process.env.JWT_REF!) as JwtPayload;
                const { id_user_account } = refreshDecoded;

                resolve(id_user_account);
            } catch (error: any) {
                reject( 'Error al validar token de actualizacion: ' + error.message );
            }
        })
    },

    async updateAccessToken(refresh_token, email, user_id){
        return new Promise(async(resolve, reject) => {
            try {
                const newAccessToken = jwt.sign({ refreshToken: refresh_token, email: email }, process.env.JWT_ACC!, {
                    expiresIn: '24h'
                });

                await db.none(`UPDATE user_credentials SET user_token = $1 WHERE id_user_credential = $2`, [newAccessToken, user_id]);
                resolve(newAccessToken);
            } catch (error: any) {
                reject( 'Error al actualizar el token de acceso: ' + error.message );
            }
        })
    }
}