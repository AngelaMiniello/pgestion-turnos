import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Specialty } from "../entities/Specialty";
import { Doctor } from "../entities/Doctor";

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

// 2. Obtener todos los médicos
export const getDoctors = async (req: Request, res: Response) => {
    try {
        const { specialty } = req.query; // Capturamos el query param (ej: ?specialty=Pediatría)
        const doctorRepository = AppDataSource.getRepository(Doctor);

        // Si pasan una especialidad, filtramos; si no, traigo todos
        const options: any = {
            relations: ["specialty", "schedules"]
        };

        if (specialty) {
            options.where = {
                specialty: {
                    name: specialty // Filtra por el nombre de la especialidad relacionada
                }
            };
        }

        const doctors = await doctorRepository.find(options);
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener médicos", error });
    }
};