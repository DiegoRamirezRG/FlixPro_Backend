import { AuthControllerInterface } from '../../interfaces/auth/auth.controller.interface';
import { AuthModel } from '../../models/auth/auth.model';

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
            return res.status(500).json({
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
            return res.status(500).json({
                success: false,
                message: 'Ha ocurrido un error al autenticar el usuario',
                error: error.message ? error.message : error
            });
        }
    }
}