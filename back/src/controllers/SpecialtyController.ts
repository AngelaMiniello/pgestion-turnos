import { Request, Response } from "express";
import { getAllSpecialtiesService } from "../services/SpecialtyService";
import { Specialty } from "../entities/Specialty";
import { AppDataSource } from "../config/data-source";

// 1. Obtener todas las especialidades con sus médicos
export const getSpecialties = async (req: Request, res: Response) => {
    try {
        const specialtyRepository = AppDataSource.getRepository(Specialty);
        const specialties = await specialtyRepository.find({
            relations: ["doctors"] // Trae los médicos asociados a cada especialidad
        });
        res.status(200).json(specialties);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener especialidades", error });
    }
};
