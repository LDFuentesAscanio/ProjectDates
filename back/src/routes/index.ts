import { Router } from 'express';
import appointmentRouter from './appointmentRouter';
import userRouter from './userRouter';

const router: Router = Router();

router.use('/users', userRouter);
router.use('/appointments', appointmentRouter);

export default router;
