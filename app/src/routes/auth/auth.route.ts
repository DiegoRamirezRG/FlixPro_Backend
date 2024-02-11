import { Express } from 'express';
import { jwtValidatorMiddleware } from '../../config/middleware.config';
import { AuthController } from '../../controllers/auth/auth.controller';

export default (app: Express): void => {
    app.post('/api/v1/auth', AuthController.createUser);
    app.post('/api/v1/auth/getAuth', AuthController.getAuthenticate);
    app.post('/api/v1/auth/reAuthByRefresh', AuthController.reAuthByRefreshToken);
    
    app.get('/api/v1/auth/getAccessValidate', AuthController.validateAccessToken);
}