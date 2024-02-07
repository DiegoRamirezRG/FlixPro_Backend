import jwt from 'jsonwebtoken';
import { AuthGuardianInterface } from '../../interfaces/auth/auth.guardian.interface';
import dotenv from 'dotenv';
dotenv.config();

export const AuthGuardian : AuthGuardianInterface = {

    async validateToken(token: string) {
        return new Promise(async(resolve, reject) => {
            jwt.verify(token, process.env.JWTS!, (err, decoded) => {
                if(err){
                    reject(new Error('El token no es valido'));
                }else{
                    resolve();
                }
            })
        })
    },

};
