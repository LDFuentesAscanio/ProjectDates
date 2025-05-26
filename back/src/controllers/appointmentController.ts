import { Request, Response } from 'express';
import { AppointmentRegisterDTO } from '../dtos/AppointmentDTO';
import {
  cancelStatusAppointentService,
  getAppointentByIdService,
  getAppointentService,
  registerAppointentService,
} from '../services/appointmentServices';
import { catchErrors } from '../utils/catchErrors';

const getAppointmentsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const response = await getAppointentService();
  res.status(200).json({
    message: 'Obtener el listado de todos los turnos de todos los usuarios',
    data: response,
  });
};

const getAppointmentByIdController = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const response = await getAppointentByIdService(id);
  res.status(200).json({
    message: 'Obtener el detalle de un turno en especifico: ' + id,
    data: response,
  });
};

const registerAppointmentController = async (
  req: Request<unknown, unknown, AppointmentRegisterDTO>,
  res: Response
): Promise<void> => {
  const response = await registerAppointentService(req.body);
  res.status(201).json({
    message: 'Cita agendada con éxito',
    data: response,
  });
};

const cancelStatusAppointmentController = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const response = await cancelStatusAppointentService(id);
  res.status(200).json({
    message: 'Cancelar un turno en especifico: ' + id,
    data: response,
  });
};

const AppointmentsControllers = {
  getAppointmentsController: catchErrors(getAppointmentsController),
  getAppointmentByIdController: catchErrors(getAppointmentByIdController),
  registerAppointmentController: catchErrors(registerAppointmentController),
  cancelStatusAppointmentController: catchErrors(
    cancelStatusAppointmentController
  ),
};

export default AppointmentsControllers;
