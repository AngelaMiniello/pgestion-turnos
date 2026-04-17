import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Appointment {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string; 

  @Column()
  time: string;

  @Column({ default: "active" })
  status: string;

  //  Relación N:1 con User
  @ManyToOne(() => User, user => user.appointments, { nullable: false })
  user: User;
}
