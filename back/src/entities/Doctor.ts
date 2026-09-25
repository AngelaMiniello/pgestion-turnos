import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany } from "typeorm";
import { Specialty } from "./Specialty";
import { Appointment } from "./Appointments"; 
import { DoctorSchedule } from "./DoctorSchedule";
import { Practice } from "./Practices";

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  // Muchos médicos pertenecen a una sola especialidad
  @ManyToOne(() => Specialty, (specialty) => specialty.doctors, { nullable: false, onDelete: "CASCADE" })
  specialty: Specialty;

  // Un médico puede tener muchos turnos asignados
  @OneToMany(() => Appointment, (appointment) => appointment.medico)
  appointments: Appointment[];

  @OneToMany(() => DoctorSchedule, (schedule) => schedule.doctor)
  schedules: DoctorSchedule[];

  @ManyToMany(() => Practice, (practice) => practice.doctors)
  practices: Practice[];
}