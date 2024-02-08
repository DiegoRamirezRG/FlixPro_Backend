import { Express } from 'express';
import { jwtValidatorMiddleware } from '../../config/middleware.config';
import { AuthController } from '../../controllers/auth/auth.controller';

export default (app: Express): void => {
    app.post('/api/v1/auth', AuthController.createUser);
}