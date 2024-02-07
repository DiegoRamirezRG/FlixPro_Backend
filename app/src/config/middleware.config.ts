import {Request, Response, NextFunction} from 'express';
import { IncomingHttpHeaders } from 'http';
import { AuthGuardian } from '../guard/auth/auth.guard';

export const jwtValidatorMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const headers: IncomingHttpHeaders = req.headers;
        const jwt_token = headers['authorization'];

        if(!jwt_token){
            return res.status(401).json({
                success: false,
                message: 'Acceso no autorizado, token no proporcionado.'
            });
        }

        await AuthGuardian.validateToken(jwt_token);
        next();
    } catch (error: any) {
        return res.status(401).json({
            success: false,
            message: error.message
        })
    }
}