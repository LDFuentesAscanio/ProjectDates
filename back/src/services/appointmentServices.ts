import { AppointmentRegisterDTO } from '../dtos/AppointmentDTO';
import { IAppointment, Status } from '../Interfaces/AppointmentInterface';
import { getUserByIdService } from './userServices';

const appointmentList: IAppointment[] = [];
let id: number = 1;

export const registerAppointentService = (
  appointment: AppointmentRegisterDTO
): IAppointment => {
  getUserByIdService(appointment.userId.toString());
  const objectAppointment: IAppointment = {
    id: id++,
    date: appointment.date,
    time: appointment.time,
    status: Status.Active,
    userId: appointment.userId,
  };
  appointmentList.push(objectAppointment);
  return objectAppointment;
};

export const getAppointentService = (): IAppointment[] => {
  return appointmentList;
};

export const getAppointentByIdService = (id: string): IAppointment => {
  const appointmentFound = appointmentList.find(
    (appointment) => appointment.id === parseInt(id, 10)
  );
  if (!appointmentFound) {
    throw new Error(`No existe una cita con id: ${id}.`);
  } else return appointmentFound;
};

export const cancelStatusAppointentService = (id: string): IAppointment => {
  const appointmentFound = appointmentList.find(
    (appointment) => appointment.id === parseInt(id, 10)
  );
  if (!appointmentFound) throw new Error(`No existe una cita con id: ${id}.`);
  appointmentFound.status = Status.Cancelled;
  return appointmentFound;
};
