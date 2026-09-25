import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
import { Doctor } from "./Doctor";

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  date: string; 

  @Column({ type: "varchar", nullable: true })
  time: string | null;

  @Column({ type: "varchar", default: "active" })
  status: string;

  @ManyToOne(() => User, user => user.appointments, { nullable: false })
  user: User;

  @Column({ type: "varchar" })
  tipo: string;

  @Column({ type: "varchar", nullable: true })
  especialidad: string | null; 

  @Column({ type: "varchar", nullable: true })
  practica: string | null;    

  @ManyToOne(() => Doctor, (doctor) => doctor.appointments, { nullable: true })
  medico: Doctor | null;    
}