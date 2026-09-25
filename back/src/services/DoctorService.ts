import { DoctorRepository } from "../repositories/DoctorRepository";

export const getAllDoctorsService = async () => {
    // Usamos relations para traer también la especialidad asociada (clave para filtrar)
    return await DoctorRepository.find({ relations: ["specialty"] });
};