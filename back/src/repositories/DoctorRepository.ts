import { AppDataSource } from "../config/data-source";
import { Doctor } from "../entities/Doctor";

export const DoctorRepository = AppDataSource.getRepository(Doctor).extend({
    // Puedo agregar métodos personalizados aca si los necesito
});