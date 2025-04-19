import { Router, Request, Response } from 'express';
import { AppointmentRegisterDTO } from '../dtos/AppointmentDTO';
import {
  cancelStatusAppointmentController,
  getAppointmentByIdController,
  getAppointmentsController,
  registerAppointmentController,
} from '../controllers/appointmentController';

const appointmentRouter: Router = Router();

appointmentRouter.get(`/`, (req: Request, res: Response) =>
  getAppointmentsController(req, res)
);

appointmentRouter.get(`/:id`, (req: Request<{ id: string }>, res: Response) =>
  getAppointmentByIdController(req, res)
);

appointmentRouter.post(
  `/schedule`,
  (req: Request<unknown, unknown, AppointmentRegisterDTO>, res: Response) =>
    registerAppointmentController(req, res)
);

appointmentRouter.put(
  `/cancel/:id`,
  (req: Request<{ id: string }>, res: Response) =>
    cancelStatusAppointmentController(req, res)
);

export default appointmentRouter;
