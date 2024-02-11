import { Request, Response, NextFunction } from 'express';
import { CreateNewUser, GetAuth } from '../../types/auth/auth.types';

export interface AuthControllerInterface {
    createUser: (req: Request<{}, {}, CreateNewUser>, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    getAuthenticate: (req: Request<{}, {}, GetAuth>, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    validateAccessToken: (req: Request<{ access_token: string }>, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    reAuthByRefreshToken: (req: Request<{}, {}, { refresh_token: string }>, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
} 