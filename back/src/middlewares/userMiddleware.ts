import { Request, Response, NextFunction } from 'express';

export const validateUserRegisterData = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const campos: string[] = [
    'birthdate',
    'email',
    'nDni',
    'name',
    'password',
    'username',
  ];
  const camposFiltered: string[] = campos.filter((campo) => !req.body[campo]);

  if (camposFiltered.length > 0) {
    res.status(400).json({
      message: `Falta la informacion: ${camposFiltered.join(', ')} para poder registrar al usuario`,
    });
  } else next();
};
