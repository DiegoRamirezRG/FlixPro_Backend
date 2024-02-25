export interface CinemaWizardModelInterface {
    getWizardStatusByUserId(id_user_account: string): Promise<boolean>;
    saveInitConfig(cinemaName: string, cinemaLogo: string, tmdb_access_token: string, tmdb_api_key: string, admin_id: string): Promise<boolean>;
}