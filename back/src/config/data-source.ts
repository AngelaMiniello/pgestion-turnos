import "reflect-metadata"; //hace que los decoradores funcionen
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Credential } from "../entities/Credentials";
import { Appointment } from "../entities/Appointments";

export const AppDataSource = new DataSource({
type: "postgres",
host: "localhost",
port: 5432,
username: "postgres",
password: "CristoRey",
database: "gestor_turnos",
synchronize: true,
logging: false,
entities: [User, Credential, Appointment],
subscribers: [],
migrations: [],
});