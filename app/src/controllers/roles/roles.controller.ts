import { RolesControllerInterface } from '../../interfaces/roles/roles.controller.interface';

export const RolesController: RolesControllerInterface = {
    async createRol (req, res, next){
        try {
            return res.status(201).json({
                success: true,
                message: 'Usuario authenticado',
                data: 'simon'
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: 'Ha ocurrido un error al autenticarse',
                error: error
            });
        }
    }
}