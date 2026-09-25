//get /appointents para obtener todos los turnos
//get /appointents/:id para obtener un turno x id

//POST /appointents/shedule va a crear un nuevo turno

//PuT /appointents/cancel va a cancelar un turno
import { Request, Response } from "express";
import {
    getAllAppointmentsService,
    getAppointmentByIdService,
    createAppointmentService,
    cancelAppointmentService
} from "../services/Appointments.Service";
import Appointment from "../models/Appointments";

export const getAllAppointmentsController = async (req: Request, res: Response) => {
     try {
        const userId = req.query.userId as string | undefined;

        const appointments = await getAllAppointmentsService(userId);

        res.status(200).json(appointments);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getAppointmentByIdController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const appointment = await getAppointmentByIdService(id);

        if (!appointment) {
            return res.status(404).json({ error: "Turno no encontrado" });
        }

        res.status(200).json(appointment);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};


export const createAppointmentController = async (req: Request, res: Response) => {
    try {
        const { date, time, tipo, especialidad, practica, medico, userId } = req.body;

        const newAppointment = await createAppointmentService(
            date,
            time,
            tipo,
            especialidad,
            practica,
            medico,
            userId
        );

        res.status(201).json(newAppointment);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const cancelAppointmentController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        const cancelled = await cancelAppointmentService(id);

        res.status(200).json(cancelled);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

// Controlador para buscar turnos disponibles por fecha, especialidad y médico
export const getAvailableAppointmentsController = async (req: Request, res: Response) => {
  try {
    const { date, medico, especialidad } = req.query;

    let query: any = { status: "active" };

    // Si el usuario hace clic en una fecha del calendario
    if (date) {
      const startOfDay = new Date(date as string);
      startOfDay.setHours(0, 0, 0, 0);
      
      const endOfDay = new Date(date as string);
      endOfDay.setHours(23, 59, 59, 999);

      query.date = { $gte: startOfDay, $lte: endOfDay };
    }

    if (medico) query.medico = medico;
    if (especialidad) query.especialidad = especialidad;

    const appointments = await Appointment.find(query).populate('user');
    return res.status(200).json(appointments);

  } catch (error: any) {
    return res.status(500).json({ message: "Error al obtener turnos disponibles", error: error.message });
  }
};