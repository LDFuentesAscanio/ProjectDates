import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User.entity';
import { Status } from '../Interfaces/AppointmentInterface';

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date', nullable: false })
  date: Date;

  @Column({ type: 'varchar', length: 5, nullable: false })
  time: string;

  @Column({
    type: 'varchar',
    length: 10,
    nullable: false,
    default: Status.Active,
  })
  status: Status;

  @ManyToOne(() => User, (user) => user.appointments)
  @JoinColumn()
  user: User;

  @CreateDateColumn()
  createdAt?: Date;

  @CreateDateColumn()
  updatedAt?: Date;
}
