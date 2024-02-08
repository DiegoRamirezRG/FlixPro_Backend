import { Request, Response, NextFunction } from 'express';

export interface AuthControllerInterface {
    createUser: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
} 