import { Router, Request, Response, NextFunction } from 'express';
import userControllers from '../controllers/userControllers';
import { UserLoginDTO, UserRegisterDTO } from '../dtos/UserDTO';
import { validateUserRegisterData } from '../middlewares/userMiddleware';

const userRouter: Router = Router();

userRouter.get('/', (req: Request, res: Response, next: NextFunction) =>
  userControllers.getUsersController(req, res, next)
);
userRouter.get(
  '/:id',
  (req: Request<{ id: string }>, res: Response, next: NextFunction) =>
    userControllers.getUserByIdController(req, res, next)
);
userRouter.post(
  '/register',
  (req: Request, res: Response, next: NextFunction) =>
    validateUserRegisterData(req, res, next),
  (
    req: Request<unknown, unknown, UserRegisterDTO>,
    res: Response,
    next: NextFunction
  ) => userControllers.registerUserController(req, res, next)
);
userRouter.post(
  '/login',
  (
    req: Request<unknown, unknown, UserLoginDTO>,
    res: Response,
    next: NextFunction
  ) => userControllers.loginUserController(req, res, next)
);

export default userRouter;
