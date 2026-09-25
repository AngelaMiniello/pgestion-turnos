import { PracticeRepository } from "../repositories/PracticesRepository";

export const getAllPracticesService = async () => {
    return await PracticeRepository.find({ relations: ["doctors"] });
};