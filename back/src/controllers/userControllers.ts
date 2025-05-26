import { Request, Response } from 'express';
import {
  UserLoginDTO,
  UserLoginSuccessDTO,
  UserRegisterDTO,
} from '../dtos/UserDTO';
import {
  getUserByIdService,
  getUserService,
  loginUserService,
  registerUserService,
} from '../services/userServices';
import { catchErrors } from '../utils/catchErrors';

const getUsersController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const response = await getUserService();
  res.status(200).json({
    message: 'Obtener el listado de todos los usuarios',
    data: response,
  });
};

const getUserByIdController = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const response = await getUserByIdService(id);
  res.status(200).json(response);
};

const registerUserController = async (
  req: Request<unknown, unknown, UserRegisterDTO>,
  res: Response
): Promise<void> => {
  await registerUserService(req.body);
  res.status(201).json({
    message: 'Usuario registrado exitosamente',
  });
};

const loginUserController = async (
  req: Request<unknown, unknown, UserLoginDTO>,
  res: Response
): Promise<void> => {
  const response: UserLoginSuccessDTO | null = await loginUserService(req.body);
  res.status(200).json(response);
};

const userControllers = {
  getUsersController: catchErrors(getUsersController),
  getUserByIdController: catchErrors(getUserByIdController),
  registerUserController: catchErrors(registerUserController),
  loginUserController: catchErrors(loginUserController),
};

export default userControllers;
