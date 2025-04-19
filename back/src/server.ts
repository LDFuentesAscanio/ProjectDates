import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from './routes';

const server: Application = express();

server.use(express.json());
server.use(morgan('dev'));
server.use(cors());
server.use(router);

export default server;
