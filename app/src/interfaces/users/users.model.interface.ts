import { LoggedUser } from "../../types/users/users.types";

export interface UserModelInterface {
    getUserByAccountId(account_id: string): Promise<LoggedUser>;
}