import { AppointmentRegisterDTO } from '../dtos/AppointmentDTO';
import { Appointment } from '../entities/Appointment.entity';
import { Status } from '../Interfaces/AppointmentInterface';
import { AppointmentRepository } from '../repositories/Appointment.Repository';
import { CustomError } from '../utils/customErrors';
import { getUserByIdService } from './userServices';

export const registerAppointentService = async (
  appointment: AppointmentRegisterDTO
): Promise<Appointment> => {
  await getUserByIdService(appointment.userId.toString());
  await AppointmentRepository.validateAllowAppointment(
    appointment.date,
    appointment.time,
    appointment.userId
  );
  const newAppointment = AppointmentRepository.create({
    date: appointment.date,
    time: appointment.time,
    user: { id: appointment.userId },
  });
  return await AppointmentRepository.save(newAppointment);
};

export const getAppointentService = async (): Promise<Appointment[]> => {
  const appointments = await AppointmentRepository.find();
  if (appointments.length > 0) return appointments;
  else throw new CustomError(404, 'No se encontraron citas.');
};

export const getAppointentByIdService = async (
  id: string
): Promise<Appointment> => {
  const appointmentFound = await AppointmentRepository.findOne({
    where: {
      id: parseInt(id, 10),
    },
  });
  if (!appointmentFound) {
    throw new CustomError(404, `No existe una cita con id: ${id}.`);
  } else return appointmentFound;
};

export const cancelStatusAppointentService = async (
  id: string
): Promise<Appointment> => {
  const appointmentFound = await AppointmentRepository.findOne({
    where: {
      id: parseInt(id, 10),
    },
  });
  if (!appointmentFound)
    throw new CustomError(404, `No existe una cita con id: ${id}.`);
  appointmentFound.status = Status.Cancelled;
  return await AppointmentRepository.save(appointmentFound);
};
