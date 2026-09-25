import { AppDataSource } from "../config/data-source";
import { Specialty } from "../entities/Specialty";

export const SpecialtyRepository = AppDataSource.getRepository(Specialty);