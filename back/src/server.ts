import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from './routes';
import { IPostgresError } from './Interfaces/ErrorInterface';

const server: Application = express();

server.use(express.json());
server.use(morgan('dev'));
server.use(cors());
server.use(router);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
server.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  const error = err as IPostgresError;
  if (error.code === 404) {
    res.status(404).json({
      message: error.message,
      details: error.detail,
    });
  } else {
    res.status(400).json({
      message: error.message,
      details: error.detail,
    });
  }
});

export default server;
