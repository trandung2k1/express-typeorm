import { DataSourceOptions } from 'typeorm';
import { User } from '../entities/User.entity';
import sql from 'mssql';

export const sqlConfig: sql.config = {
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    server: process.env.DATABASE_HOST as string,
    options: {
        trustServerCertificate: true,
    },
};

export const baseOptions: DataSourceOptions = {
    type: 'mssql',
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: parseInt(process.env.DATABASE_PORT as string),
    database: process.env.DATABASE_NAME,
    synchronize: true,
    logging: true,
    entities: [User],
    options: {
        trustServerCertificate: true,
    },
    extra: {
        trustServerCertificate: true,
    },
    requestTimeout: 30000,
};

export const optionsNotExits: DataSourceOptions = {
    ...baseOptions,
};
