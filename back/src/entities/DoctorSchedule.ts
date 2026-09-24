import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Doctor } from "./Doctor";

@Entity()
export class DoctorSchedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dayOfWeek: number; // 0 = Domingo, 1 = Lunes, 2 = Martes, etc.

  @Column()
  startTime: string; // Ej: "08:00"

  @Column()
  endTime: string;   // Ej: "16:00"

  // Muchos horarios pertenecen a un solo médico
  @ManyToOne(() => Doctor, (doctor) => doctor.schedules, { nullable: false, onDelete: "CASCADE" })
  doctor: Doctor;
}