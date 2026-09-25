import { DoctorScheduleRepository } from "../repositories/DoctorScheduleRepository";

export const getAllDoctorSchedulesService = async () => {
    // Traemos los horarios incluyendo los datos del médico asociado
    return await DoctorScheduleRepository.find({ relations: ["doctor"] });
};