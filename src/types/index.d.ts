declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production' | 'test';
            DATABASE_NAME: string;
            DATABASE_HOST: string;
            DATABASE_USER: string;
            DATABASE_PASSWORD: string;
            DATABASE_TYPE: string;
            PORT: string;
        }
    }
    namespace Express {
        interface User {
            id: string;
            email: string;
            isAdmin: boolean;
        }
        interface Request {
            user?: User;
            // file?: Multer.File | undefined;
        }
    }
}

export {};
