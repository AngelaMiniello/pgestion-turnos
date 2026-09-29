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
import { Appointment } from "../entities/Appointments";
import { User } from "../entities/User";
import { AppDataSource } from "../config/data-source";
import { Between } from "typeorm";

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
    const appointmentRepository = AppDataSource.getRepository(Appointment);

    let whereCondition: any = { status: "active" };

    // Si el usuario selecciona una fecha, filtramos por el rango de ese día
    if (date) {
      const startOfDay = new Date(date as string);
      startOfDay.setHours(0, 0, 0, 0);
      
      const endOfDay = new Date(date as string);
      endOfDay.setHours(23, 59, 59, 999);

      whereCondition.date = Between(startOfDay, endOfDay);
    }

    if (medico) whereCondition.medico = medico;
    if (especialidad) whereCondition.especialidad = especialidad;

    // Usamos find con 'where' y 'relations' (equivalente a populate) de TypeORM
    const appointments = await appointmentRepository.find({
      where: whereCondition,
      relations: ["user"] // Trae la relación con el usuario asociado
    });

    return res.status(200).json(appointments);

  } catch (error: any) {
    return res.status(500).json({ message: "Error al obtener turnos disponibles", error: error.message });
  }
};

export const seedAppointments = async () => {
  const appointmentRepo = AppDataSource.getRepository(Appointment);
  const userRepo = AppDataSource.getRepository(User);
  
  const count = await appointmentRepo.count();

  if (count === 0) {
    // Buscamos un usuario existente para asignarle el turno (ya que user es obligatorio)
    const existingUser = await userRepo.findOne({ where: {} });

    if (!existingUser) {
      console.log("⚠️ Necesitas al menos un usuario en la base de datos para crear turnos de prueba.");
      return;
    }

    const today = new Date();
    
    for (let i = 1; i <= 7; i++) {
      const appointmentDate = new Date();
      appointmentDate.setDate(today.getDate() + i);

      const newAppointment = appointmentRepo.create({
        date: appointmentDate.toISOString().slice(0, 10),
        time: "10:00",
        status: "active",
        tipo: "Consulta", 
        user: existingUser,
        especialidad: "Medicina General",
        practica: "Control general",
        medico: null 
      });

      await appointmentRepo.save(newAppointment);
    }
    console.log("✅ Turnos de prueba creados exitosamente.");
  }
};