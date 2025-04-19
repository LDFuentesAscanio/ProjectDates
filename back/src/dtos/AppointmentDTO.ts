export interface AppointmentRegisterDTO {
  date: Date;
  time: string;
  status: string;
}

export enum Status {
  Active = 'active',
  Cancelled = 'cancelled',
}
