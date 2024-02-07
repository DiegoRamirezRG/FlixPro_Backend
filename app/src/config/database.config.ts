import * as bluebird from 'bluebird';
import pgPromise, { IMain, IDatabase } from 'pg-promise';
import dotenv from 'dotenv';

dotenv.config();

const pgp: IMain = pgPromise({ promiseLib: bluebird });

const types = pgp.pg.types;
types.setTypeParser(1114, (stringValue: string) => stringValue);

const databaseConfig = {
    host: process.env.HOST_DB!,
    port: parseInt(process.env.PORT_DB!),
    database: process.env.NAME_DB!,
    user: process.env.USER_DB!,
    password: process.env.PASS_DB!
};

const db: IDatabase<any> = pgp(databaseConfig);
export default db;