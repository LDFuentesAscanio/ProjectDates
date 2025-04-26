import { Request, Response, NextFunction } from 'express';

export const validateAppointmentRegisterData = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const campos: string[] = ['date', 'time', 'userId'];
  const camposFiltered: string[] = campos.filter((campo) => !req.body[campo]);

  if (camposFiltered.length > 0) {
    res.status(400).json({
      message: `Falta la informacion: ${camposFiltered.join(', ')} para poder agendar una cita`,
    });
  } else next();
};
