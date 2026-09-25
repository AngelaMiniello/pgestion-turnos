import { SpecialtyRepository } from "../repositories/SpecialtyRepository";

export const getAllSpecialtiesService = async () => {
    return await SpecialtyRepository.find();
};