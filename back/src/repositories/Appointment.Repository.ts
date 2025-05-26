import { AppDataSource } from '../config/data.sourse';
import { Appointment } from '../entities/Appointment.entity';

import {
  parse,
  isValid,
  isBefore,
  differenceInHours,
  getDay,
  getHours,
  getMinutes,
} from 'date-fns';
import { Status } from '../Interfaces/AppointmentInterface';

export const AppointmentRepository = AppDataSource.getRepository(
  Appointment
).extend({
  validateAllowAppointment: async function (
    date: Date,
    time: string,
    userId: number
  ): Promise<void> {
    // 1. Parsear la fecha y hora como una fecha local
    const appointmentDateTime = parse(
      `${date} ${time}`,
      'yyyy-MM-dd HH:mm',
      new Date()
    );

    if (!isValid(appointmentDateTime)) {
      throw new Error('La fecha u hora proporcionada no es válida');
    }

    const now = new Date();

    // 2. Validar que la fecha no esté en el pasado
    if (isBefore(appointmentDateTime, now)) {
      throw new Error('No se pueden agendar citas en fechas pasadas');
    }

    // 3. Validar que haya al menos 24h de anticipación
    const hoursDiff = differenceInHours(appointmentDateTime, now);
    if (hoursDiff < 24) {
      throw new Error(
        'No se pueden agendar citas con menos de 24 horas de antelación'
      );
    }

    // 4. Validar que no sea fin de semana
    const dayOfWeek = getDay(appointmentDateTime); // 0 = domingo, 6 = sábado
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      throw new Error('No se pueden agendar citas los fines de semana');
    }

    // 5. Validar horario entre 08:00 y 18:00
    const hour = getHours(appointmentDateTime);
    const minute = getMinutes(appointmentDateTime);
    if (hour < 8 || (hour === 18 && minute > 0) || hour > 18) {
      throw new Error(
        'No se pueden agendar citas fuera del horario de 8:00 a 18:00'
      );
    }

    // 6. Validar que no exista cita duplicada
    const existingAppointment = await this.findOne({
      where: {
        date,
        time,
        user: { id: userId },
        status: Status.Active,
      },
      relations: ['user'],
    });

    if (existingAppointment) {
      throw new Error(
        'El usuario ya tiene una cita reservada en esta fecha y hora.'
      );
    }
  },
});
