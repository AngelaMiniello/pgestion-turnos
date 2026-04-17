import { AppDataSource } from "../config/data-source";
import {  Appointment } from "../entities/Appointments";

const AppointmentRepository = AppDataSource.getRepository(Appointment); 

export default AppointmentRepository ;
