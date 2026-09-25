import { Request, Response } from "express";
import { getAllPracticesService } from "../services/PracticesService";

export const getPractices = async (req: Request, res: Response) => {
    try {
        const practices = await getAllPracticesService();
        res.status(200).json(practices);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las prácticas" });
    }
};