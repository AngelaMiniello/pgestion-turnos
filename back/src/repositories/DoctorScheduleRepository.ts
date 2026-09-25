import { AppDataSource } from "../config/data-source";
import { DoctorSchedule } from "../entities/DoctorSchedule";

export const DoctorScheduleRepository = AppDataSource.getRepository(DoctorSchedule);