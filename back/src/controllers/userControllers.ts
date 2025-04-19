import { Request, Response } from 'express';
import { UserLoginDTO, UserRegisterDTO } from '../dtos/userDTO';

export const getUsersController = (req: Request, res: Response): void => {
  res.status(200).json({
    message: 'Obtener el listado de todos los usuarios',
    data: [],
  });
};

export const getUserByIdController = (
  req: Request<{ id: string }>,
  res: Response
): void => {
  const { id } = req.params;
  res.status(200).json({
    message: 'Obtener el detalle de un usuario en especifico: ' + id,
    data: {},
  });
};

export const registerUserController = (
  req: Request<unknown, unknown, UserRegisterDTO>,
  res: Response
): void => {
  res.status(200).json({
    message: 'Registrar un nuevo usuario',
    data: req.body,
  });
};

export const loginUserController = (
  req: Request<unknown, unknown, UserLoginDTO>,
  res: Response
): void => {
  res.status(200).json({
    message: 'Usuario Logueado',
    data: req.body,
  });
};
