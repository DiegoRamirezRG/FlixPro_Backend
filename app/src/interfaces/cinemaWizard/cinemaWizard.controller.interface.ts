import { Request, Response, NextFunction } from "express";

export interface CinemaWizardControllerInterface {
    getWizardStatus: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
}