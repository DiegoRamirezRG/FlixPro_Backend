import { IncomingHttpHeaders } from "http";
import { CinemaWizardControllerInterface } from "../../interfaces/cinemaWizard/cinemaWizard.controller.interface";
import { CinemaWizardModel } from "../../models/cinemaWizard/cinemaWizard.model";
import { AuthModel } from "../../models/auth/auth.model";
import { cinema_files_bucket } from "../../config/multer.config";
import path from 'path';
import multer from "multer";

export const CinemaWizardController: CinemaWizardControllerInterface = {
    async getWizardStatus(req, res, next){
        try {
            const headers: IncomingHttpHeaders = req.headers;
            const access_token = headers['authorization'];

            const user_id = await AuthModel.validateAccessToken(access_token as string);
            const status = await CinemaWizardModel.getWizardStatusByUserId(user_id);

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
    },

    async finishInitConfig(req, res, next){
        try {

            const headers: IncomingHttpHeaders = req.headers;
            const access_token = headers['authorization'];

            const user_id = await AuthModel.validateAccessToken(access_token as string);

            const cinema_bucket = multer({storage: await cinema_files_bucket('cinemaLogo', user_id)}).single('file');
            cinema_bucket(req, res, async(err) => {
                try {
                    if(err){
                        throw new Error(err);
                    }
    
                    const { cinemaName, tmdb_access_token, tmdb_api_key } = req.body;
                    await CinemaWizardModel.saveInitConfig(cinemaName, req.file ? 'cinemaLogo'+path.extname(req.file?.originalname) : '', tmdb_access_token, tmdb_api_key, user_id);
                    
                    return res.status(201).json({
                        success: true,
                        message: 'Configuracion inicial guardada con exito',
                        data: 'Exito'
                    });
                } catch (error: any) {
                    console.error(error);
                    return res.status(400).json({
                        success: false,
                        message: 'Ha ocurrido un error al guardar la configuracion inicial',
                        error: error.message ? error.message : error
                    });
                }
            });
        } catch (error: any) {
            console.error(error);
            return res.status(400).json({
                success: false,
                message: 'Ha ocurrido un error al guardar la configuracion inicial',
                error: error.message ? error.message : error
            });
        }
    }
}
