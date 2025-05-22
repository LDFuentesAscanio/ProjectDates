import { Request, Response } from 'express';
import { UserLoginDTO, UserRegisterDTO } from '../dtos/UserDTO';
import {
  getUserByIdService,
  getUserService,
  registerUserService,
} from '../services/userServices';
import { IPostgresError } from '../Interfaces/ErrorInterface';

export const getUsersController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const response = await getUserService();
    res.status(200).json({
      message: 'Obtener el listado de todos los usuarios',
      data: response,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error en el servidor',
      data: error instanceof Error ? error.message : `Error desconocido`,
    });
  }
};

export const getUserByIdController = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const response = await getUserByIdService(id);
    res.status(200).json({
      message: 'Obtener el detalle de un usuario en especifico: ' + id,
      data: response,
    });
  } catch (error) {
    res.status(404).json({
      message: 'Error en el servidor',
      data: error instanceof Error ? error.message : `Error desconocido`,
    });
  }
};

export const registerUserController = async (
  req: Request<unknown, unknown, UserRegisterDTO>,
  res: Response
): Promise<void> => {
  try {
    await registerUserService(req.body);
    res.status(201).json({
      message: 'Usuario registrado exitosamente',
    });
  } catch (error) {
    const postgresError = error as IPostgresError;
    res.status(400).json({
      message: 'Error en el servidor',
      data:
        postgresError instanceof Error
          ? postgresError.detail
            ? postgresError.detail
            : postgresError.message
          : `Error desconocido`,
    });
  }
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
