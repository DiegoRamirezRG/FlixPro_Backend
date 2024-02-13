import { CinemaWizardControllerInterface } from "../../interfaces/cinemaWizard/cinemaWizard.controller.interface";
import { CinemaWizardModel } from "../../models/cinemaWizard/cinemaWizard.model";

export const CinemaWizardController: CinemaWizardControllerInterface = {
    async getWizardStatus(req, res, next){
        try {
            const status = await CinemaWizardModel.getWizardStatusByUserId('f1d79a8f-fa0e-4254-aaa0-4c997eeebbad');

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