import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { baseOptions } from './config';

const AppDataSource = new DataSource(baseOptions);

export default AppDataSource;
