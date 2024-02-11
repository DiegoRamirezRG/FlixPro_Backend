import { AuthControllerInterface } from '../../interfaces/auth/auth.controller.interface';
import { AuthModel } from '../../models/auth/auth.model';
import { UsersModel } from '../../models/users/users.model';

export const AuthController: AuthControllerInterface = {
    async createUser(req, res, next) {
        try {
            const { user_account, user_credentials } = req.body;
            const newUserId = await AuthModel.createNewUserAccount(user_account, user_credentials);

            return res.status(201).json({
                success: true,
                message: 'Usuario creado exitosamente',
                data: newUserId
            });
        } catch (error: any) {
            console.error(error);
            return res.status(400).json({
                success: false,
                message: 'Ha ocurrido un error al crear el usuario',
                error: error.message ? error.message : error
            });
        }
    },

    async getAuthenticate(req, res, next){
        try {
            const { email, password } = req.body;
            const authResult = await AuthModel.getUserAuthenticated(email, password);

            return res.status(201).json({
                success: true,
                message: 'Usuario autenticado exitosamente',
                data: authResult
            });
        } catch (error: any) {
            console.error(error);
            return res.status(401).json({
                success: false,
                message: 'Ha ocurrido un error al autenticar el usuario',
                error: error.message ? error.message : error
            });
        }
    },

    async validateAccessToken(req, res, next){
        try {
            const { access_token } = req.query;
            const resolve = await AuthModel.validateAccessToken(access_token as string);
            const loggedUser = await UsersModel.getUserByAccountId(resolve);

            return res.status(201).json({
                success: true,
                message: 'Usuario autenticado exitosamente',
                data: loggedUser
            });
        } catch (error: any) {
            console.error(error);
            return res.status(401).json({
                success: false,
                message: 'Ha ocurrido un error al autenticar el usuario',
                error: error.message ? error.message : error
            });
        }
    },

    async reAuthByRefreshToken(req, res, next){
        try {
            const { refresh_token } = req.body;
            const resolve = await AuthModel.validateRefreshToken(refresh_token);
            const loggedUser = await UsersModel.getUserByAccountId(resolve); 
            const newAccessToken = await AuthModel.updateAccessToken(refresh_token, loggedUser.email, resolve);

            return res.status(201).json({
                success: true,
                message: 'Usuario autenticado exitosamente',
                data: {
                    access_token: newAccessToken,
                    loggedUser: loggedUser
                }
            });
        } catch (error: any) {
            console.error(error);
            return res.status(401).json({
                success: false,
                message: 'Ha ocurrido un error al autenticar el usuario',
                error: error.message ? error.message : error
            });
        }
    }
}