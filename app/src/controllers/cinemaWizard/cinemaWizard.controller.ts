import { IncomingHttpHeaders } from "http";
import { CinemaWizardControllerInterface } from "../../interfaces/cinemaWizard/cinemaWizard.controller.interface";
import { CinemaWizardModel } from "../../models/cinemaWizard/cinemaWizard.model";
import { AuthModel } from "../../models/auth/auth.model";

export const CinemaWizardController: CinemaWizardControllerInterface = {
    async getWizardStatus(req, res, next){
        try {
            const headers: IncomingHttpHeaders = req.headers;
            const access_token = headers['authorization'];

            const user_id = await AuthModel.validateAccessToken(access_token as string);
            const status = await CinemaWizardModel.getWizardStatusByUserId(user_id );

            return res.status(201).json({
                success: true,
                message: 'Estado de configuracion de inicio obtenida correctamente',
                data: status
            });
        } catch (error: any) {
            console.error(error);
            return res.status(400).json({
                success: false,
                message: 'Ha ocurrido un error al crear el usuario',
                error: error.message ? error.message : error
            });
        }
    }
}