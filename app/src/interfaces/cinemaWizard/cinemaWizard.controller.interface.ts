import { Request, Response, NextFunction } from "express";
import { FinishInitConfig } from "../../types/cinemaWizard/cinemaWizard.types";

export interface CinemaWizardControllerInterface {
    getWizardStatus: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    finishInitConfig: (req: Request<{}, {}, FinishInitConfig>, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
}