import { Router, Request, Response, NextFunction } from 'express';
import { AppointmentRegisterDTO } from '../dtos/AppointmentDTO';
import appointmentController from '../controllers/appointmentController';
import { validateAppointmentRegisterData } from '../middlewares/appointmentMiddleware';

const appointmentRouter: Router = Router();

appointmentRouter.get(`/`, (req: Request, res: Response, next: NextFunction) =>
  appointmentController.getAppointmentsController(req, res, next)
);

appointmentRouter.get(
  `/:id`,
  (req: Request<{ id: string }>, res: Response, next: NextFunction) =>
    appointmentController.getAppointmentByIdController(req, res, next)
);

appointmentRouter.post(
  `/schedule`,
  (req: Request, res: Response, next: NextFunction) =>
    validateAppointmentRegisterData(req, res, next),
  (
    req: Request<unknown, unknown, AppointmentRegisterDTO>,
    res: Response,
    next: NextFunction
  ) => appointmentController.registerAppointmentController(req, res, next)
);

appointmentRouter.put(
  `/cancel/:id`,
  (req: Request<{ id: string }>, res: Response, next: NextFunction) =>
    appointmentController.cancelStatusAppointmentController(req, res, next)
);

export default appointmentRouter;
