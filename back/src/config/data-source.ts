import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Credential } from "../entities/Credentials";
import { Appointment } from "../entities/Appointments";
import dotenv from "dotenv";
import { Doctor } from "../entities/Doctor";
import { Specialty } from "../entities/Specialty";
import { DoctorSchedule } from "../entities/DoctorSchedule";
import { Practice } from "../entities/Practices";

dotenv.config();

const isProduction = !!process.env.DATABASE_URL;

export const AppDataSource = new DataSource(
  isProduction
    ? {
        type: "postgres",
        url: process.env.DATABASE_URL as string,

        synchronize: true,
        logging: false,
        entities: [User, Credential, Appointment, Doctor, Specialty, DoctorSchedule, Practice ],
        subscribers: [],
        migrations: [],

        ssl: { rejectUnauthorized: false },
      }
    : {
        type: "postgres",
        host: process.env.DB_HOST || "localhost",
        port: Number(process.env.DB_PORT) || 5432,
        username: process.env.DB_USER || "postgres",
        password: process.env.DB_PASSWORD || "",
        database: process.env.DB_NAME || "gestor_turnos",

        synchronize: true,
        logging: false,
        entities: [User, Credential, Appointment],
        subscribers: [],
        migrations: [],
      }
);