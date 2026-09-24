import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
import { Doctor } from "./Doctor";

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string; 

  @Column({ nullable: true })
  time: string | null;

  @Column({ default: "active" })
  status: string;

  @ManyToOne(() => User, user => user.appointments, { nullable: false })
  user: User;

  @Column()
  tipo: string;

  @Column({ nullable: true })
  especialidad: string | null; 

  @Column({ nullable: true })
  practica: string | null;    

  @ManyToOne(() => Doctor, (doctor) => doctor.appointments, { nullable: true })
  medico: Doctor | null;    
}