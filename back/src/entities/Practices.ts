import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Doctor } from "./Doctor";

@Entity()
export class Practice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", unique: true })
  name: string;

  @ManyToMany(() => Doctor, (doctor) => doctor.practices, { nullable: true })
  @JoinTable() //crea una tabla intermedia en la BD para relacionar médicos y prácticas
  doctors: Doctor[];
}