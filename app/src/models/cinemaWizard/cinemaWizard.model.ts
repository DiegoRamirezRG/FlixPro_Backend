import dotenv from 'dotenv';
import db from '../../config/database.config';
import { CinemaWizardModelInterface } from '../../interfaces/cinemaWizard/cinemaWizard.model.interface';

dotenv.config();
export const CinemaWizardModel: CinemaWizardModelInterface = {
    async getWizardStatusByUserId(id_user_account){
        return new Promise(async (resolve, reject) => {
            try {
                const status = await db.oneOrNone('SELECT config_finished FROM cinema_global WHERE fk_admin_user = $1', [ id_user_account ]);
                resolve(status);
            } catch (error: any) {
                reject( 'Error al obtener el estado de la configuracion de inicio: ' + error.message );
            }
        });
    }
}