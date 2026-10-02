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

    // 1. Como `date` es un varchar ("YYYY-MM-DD"), filtramos por el string exacto recibido
    if (date) {
      whereCondition.date = date as string;
    }

    // 2. Como `medico` es una relación, TypeORM espera un objeto con su ID
    // --- BLINDAJE CONTRA EL NaN ---
    // Verificamos que 'medico' exista, no sea un string vacío y sea un número real.
    if (medico && medico !== "undefined" && medico !== "null") {
      const medicoId = Number(medico);
      if (!isNaN(medicoId)) {
        whereCondition.medico = { id: medicoId };
      }
    }

    // 3. `especialidad` en Appointment es un varchar directo
    if (especialidad) {
      whereCondition.especialidad = especialidad as string;
    }

    // 4. Buscamos y traemos las relaciones de user y medico para que la UI tenga toda la info
    const appointments = await appointmentRepository.find({
      where: whereCondition,
      relations: ["user", "medico"] 
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

// Controlador para obtener solo las fechas que tienen turnos activos
export const getActiveDatesController = async (req: Request, res: Response) => {
  try {
    const appointmentRepository = AppDataSource.getRepository(Appointment);

    // Usamos QueryBuilder de TypeORM para buscar fechas únicas de turnos activos
    const results = await appointmentRepository
      .createQueryBuilder("appointment")
      .select("appointment.date", "date")
      .where("appointment.status = :status", { status: "active" })
      .distinct(true)
      .getRawMany();

    // results devuelve algo como [{ date: "2026-10-02" }, { date: "2026-10-03" }]
    // Las transformamos en un array plano de strings: ["2026-10-02", "2026-10-03"]
    const dates = results.map((item) => item.date);

    return res.status(200).json(dates);
  } catch (error: any) {
    return res.status(500).json({ 
      message: "Error al obtener fechas disponibles", 
      error: error.message 
    });
  }
};