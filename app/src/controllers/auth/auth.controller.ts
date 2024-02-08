import { AuthControllerInterface } from '../../interfaces/auth/auth.controller.interface';

export const AuthController: AuthControllerInterface = {
    async createUser(req, res, next) {
        try {
            const {  } = req.body;
            return res.status(201).json({
                success: true,
                message: 'Usuario authenticado',
                data: 'simon'
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Ha ocurrido un error al autenticarse',
                error: error
            });
        }
    }
}