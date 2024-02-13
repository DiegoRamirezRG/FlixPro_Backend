export interface CinemaWizardModelInterface {
    getWizardStatusByUserId(id_user_account: string): Promise<boolean>;
}