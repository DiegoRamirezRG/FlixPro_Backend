import { Express } from 'express';
import authRoutes from './auth/auth.route';
import rolesRoutes from './roles/roles.route';
import userRoutes from './users/users.route';
import cinemaWizardRoutes from './cinemaWizard/cinemaWizard.route';

export default (app: Express): void => {
    authRoutes(app);
    rolesRoutes(app);
    userRoutes(app);
    cinemaWizardRoutes(app);
}