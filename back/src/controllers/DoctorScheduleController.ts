import { Request, Response } from "express";
import { getAllDoctorSchedulesService } from "../services/DoctorScheduleService";

export const getDoctorSchedules = async (req: Request, res: Response) => {
    try {
        const schedules = await getAllDoctorSchedulesService();
        res.status(200).json(schedules);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los horarios de los médicos" });
    }
};