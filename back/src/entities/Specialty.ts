import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Doctor } from "./Doctor";

@Entity()
export class Specialty {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  // Una especialidad puede tener muchos médicos
  @OneToMany(() => Doctor, (doctor) => doctor.specialty)
  doctors: Doctor[];
}