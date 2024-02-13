import { Express } from 'express';
import { jwtValidatorMiddleware } from '../../config/middleware.config';
import { CinemaWizardController } from '../../controllers/cinemaWizard/cinemaWizard.controller';

export default (app: Express): void => {
    app.get('/api/v1/cinemaWizard/status', jwtValidatorMiddleware, CinemaWizardController.getWizardStatus);
}