import { AppDataSource } from "../config/data-source";
import { Practice } from "../entities/Practices";

export const PracticeRepository = AppDataSource.getRepository(Practice);