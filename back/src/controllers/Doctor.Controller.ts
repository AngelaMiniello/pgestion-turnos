import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Doctor } from "../entities/Doctor";

//Obtener todos los médicos
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