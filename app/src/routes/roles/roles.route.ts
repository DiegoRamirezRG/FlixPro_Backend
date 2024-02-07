import { Express } from 'express';
import { jwtValidatorMiddleware } from '../../config/middleware.config';
import { RolesController } from '../../controllers/roles/roles.controller';

export default (app: Express): void => {
    app.post('/api/v1/roles', jwtValidatorMiddleware, RolesController.createRol);
}