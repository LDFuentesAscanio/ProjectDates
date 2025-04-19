import { Request, Response } from 'express';
import { AppointmentRegisterDTO } from '../dtos/AppointmentDTO';

export const getAppointmentsController = (
  req: Request,
  res: Response
): void => {
  res.status(200).json({
    message: 'Obtener el listado de todos los turnos de todos los usuarios',
    data: [],
  });
};

export const getAppointmentByIdController = (
  req: Request<{ id: string }>,
  res: Response
): void => {
  const { id } = req.params;
  res.status(200).json({
    message: 'Obtener el detalle de un turno en especifico: ' + id,
    data: {},
  });
};

export const registerAppointmentController = (
  req: Request<unknown, unknown, AppointmentRegisterDTO>,
  res: Response
): void => {
  res.status(201).json({
    message: 'Registrar un nuevo turno',
    data: req.body,
  });
};

export const cancelStatusAppointmentController = (
  req: Request<{ id: string }>,
  res: Response
): void => {
  const { id } = req.params;
  res.status(200).json({
    message: 'Cancelar un turno en especifico: ' + id,
    data: {},
  });
};
