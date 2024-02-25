import dotenv from 'dotenv';
import db from '../../config/database.config';
import { CinemaWizardModelInterface } from '../../interfaces/cinemaWizard/cinemaWizard.model.interface';

dotenv.config();
export const CinemaWizardModel: CinemaWizardModelInterface = {
    async getWizardStatusByUserId(id_user_account){
        return new Promise(async (resolve, reject) => {
            try {
                const status = await db.oneOrNone('SELECT config_finished FROM cinema_global WHERE fk_admin_user = $1', [ id_user_account ]);
                resolve(status !== null && status !== undefined ? status.config_finished : false);
            } catch (error: any) {
                reject( 'Error al obtener el estado de la configuracion de inicio: ' + error.message );
            }
        });
    },

    async saveInitConfig(cinemaName, cinemaLogo, tmdb_access_token, tmdb_api_key, admin_id){
        return new Promise(async (resolve, reject) => {
            try {
                await db.tx(async t => {
                    const insertedCinema = await t.one(`INSERT INTO cinema_global(name, image, fk_admin_user, setting_step, config_finished) VALUES ($1, $2, $3, $4, $5) RETURNING id_cinema_global`, [ cinemaName, cinemaLogo, admin_id, 3, true]);

                    await t.none(`INSERT INTO cinema_tmdb_credentials(tmdb_api_key, tmdb_access_token, fk_cinema) VALUES ($1, $2, $3)`, [ tmdb_api_key, tmdb_access_token, insertedCinema.id_cinema_global ]);
                });
                resolve(true);
            } catch (error: any) {
                reject( 'Error al obtener el guardar la configuracion de inicio: ' + error.message );
            }
        })
    }
}
