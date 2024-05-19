import 'dotenv/config';
import express, { Application, Request, Response } from 'express';
import AppDataSource from './data-source';
import { User } from './entities/User.entity';
import sql from 'mssql';
import { createDatabase } from 'typeorm-extension';
import { sqlConfig, optionsNotExits } from './config';
import path from 'path';
const app: Application = express();
const port = parseInt(process.env.PORT as string) || 4000;

async function initDatabase() {
    const pool = await sql.connect(sqlConfig);
    const arrayObjectDatabase = await pool.query('SELECT name FROM master.sys.databases');
    const arrayDB = arrayObjectDatabase.recordset.map((db) => db.name);
    if (arrayDB.includes(process.env.DATABASE_NAME)) {
        console.log('Database already exists');
    } else {
        await createDatabase({ options: optionsNotExits });
        console.log('Database created');
    }
}
app.get('/', async (req: Request, res: Response) => {
    try {
        const userRepo = AppDataSource.getRepository(User);
        const users = await userRepo.find();
        return res.json(users);
    } catch (error) {
        return res.status(500).json(error);
    }
});
app.get('/backup', async (req: Request, res: Response) => {
    try {
        // const users = await AppDataSource.manager.query('SELECT * FROM User');
        const time = new Date().getTime();
        const path = `'D:\\express-typeorm\\backups\\${time + '.bak'}'`;
        await AppDataSource.manager.query(
            `BACKUP DATABASE haha TO DISK = ${path}  WITH DIFFERENTIAL`,
        );
        return res.json({ msg: 'Backup database successfully!' });
    } catch (error) {
        return res.status(500).json(error);
    }
});

app.listen(port, () => {
    initDatabase().then(() => {
        AppDataSource.initialize()
            .then(() => {
                console.log('Connected to SQL Server');
            })
            .catch((err: Error) => {
                console.log(err);
            });
    });
    console.log(`Server listening on http://localhost:${port}`);
}).on('error', (e: Error) => {
    console.log(e);
    process.exit(1);
});
