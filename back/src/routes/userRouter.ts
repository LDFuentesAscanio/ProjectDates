import { Router, Request, Response } from 'express';
import {
  getUserByIdController,
  getUsersController,
  loginUserController,
  registerUserController,
} from '../controllers/userControllers';
import { UserLoginDTO, UserRegisterDTO } from '../dtos/userDTO';

const userRouter: Router = Router();

userRouter.get('/', (req: Request, res: Response) =>
  getUsersController(req, res)
);
userRouter.get('/:id', (req: Request<{ id: string }>, res: Response) =>
  getUserByIdController(req, res)
);
userRouter.post(
  '/register',
  (req: Request<unknown, unknown, UserRegisterDTO>, res: Response) =>
    registerUserController(req, res)
);
userRouter.post(
  '/login',
  (req: Request<unknown, unknown, UserLoginDTO>, res: Response) =>
    loginUserController(req, res)
);

export default userRouter;
