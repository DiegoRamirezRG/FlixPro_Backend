import { Request, Response, NextFunction } from 'express';

export interface RolesControllerInterface {
    createRol: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
}