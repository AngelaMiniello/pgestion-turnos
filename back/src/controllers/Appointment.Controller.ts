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
    const {
      date,
      especialidad,
      practica,
      medico,
    } = req.query;

    const appointmentRepository = AppDataSource.getRepository(Appointment);

    const queryBuilder = appointmentRepository
      .createQueryBuilder("appointment")
      .leftJoinAndSelect("appointment.medico", "medico")
      .leftJoinAndSelect("medico.specialty", "specialty")
      .where("appointment.status = :status", {
        status: "active",
      });

     // Solo turnos de la fecha seleccionada
    if (date) {
      queryBuilder.andWhere("appointment.date = :date", {
        date: String(date),
      });
    }

    // Solo turnos que todavía no fueron asignados
    queryBuilder.andWhere("appointment.userId IS NULL");

    // Filtrar por especialidad
    if (especialidad) {
      queryBuilder.andWhere(
        "(appointment.especialidad = :especialidad OR specialty.name = :especialidad)",
        {
          especialidad: String(especialidad),
        }
      );
    }

    // Filtrar por práctica
    if (practica) {
      queryBuilder.andWhere(
        "appointment.practica = :practica",
        {
          practica: String(practica),
        }
      );
    }

    // Filtrar por médico
    if (medico) {
      queryBuilder.andWhere(
        "medico.id = :medico",
        {
          medico: Number(medico),
        }
      );
    }

    queryBuilder.orderBy("appointment.time", "ASC");

    const appointments = await queryBuilder.getMany();

    // Transformamos la respuesta para que coincida
    // exactamente con lo que espera el frontend.
    const availableSlots = appointments.map((appointment) => ({
      id: appointment.id,
      time: appointment.time,

      profesional:
        appointment.medico?.name ?? "Cualquier profesional",

      especialidad:
        appointment.medico?.specialty?.name ??
        appointment.especialidad ??
        "Sin especialidad",

      centro:
        "Centro de Atención",

      medicoId:
        appointment.medico?.id ?? null,
    }));

    return res.status(200).json(availableSlots);
  } catch (error: any) {
    console.error(
      "Error al obtener turnos disponibles:",
      error
    );

    return res.status(500).json({
      message: "Error al obtener turnos disponibles",
      error: error.message,
    });
  }
};

export const seedAppointments = async () => {
  const appointmentRepo = AppDataSource.getRepository(Appointment);
  const userRepo = AppDataSource.getRepository(User);
  
  const existingUser = await userRepo.findOne({ where: {} });

  if (!existingUser) {
    console.log("⚠️ Necesitas al menos un usuario en la base de datos.");
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
      especialidad: "Medicina General",
      practica: "Control general",
    });

    await appointmentRepo.save(newAppointment);
  }
  console.log("✅ Turnos de prueba creados exitosamente.");
};

// Controlador para obtener solo las fechas que tienen turnos activos
export const getActiveDatesController = async (req: Request, res: Response) => {
  try {
    const { especialidad, practica, medico } = req.query;
    const appointmentRepository = AppDataSource.getRepository(Appointment);

    // Usamos QueryBuilder de TypeORM para buscar fechas únicas de turnos activos
    const queryBuilder = await appointmentRepository
      .createQueryBuilder("appointment")
      .select("appointment.date", "date")
      .where("appointment.status = :status", { status: "active" })
      .andWhere("appointment.userId IS NULL")

    // Aplicar filtros dinámicos si el frontend los envía
    if (especialidad) {
      queryBuilder.andWhere("appointment.especialidad = :especialidad", { especialidad });
    }
    if (practica) {
      queryBuilder.andWhere("appointment.practica = :practica", { practica });
    }
    if (medico) {
      queryBuilder.andWhere("appointment.medico = :medico", { medico });
    }

    const results = await queryBuilder.distinct(true).getRawMany();
    const dates = results.map((item) => item.date);

    return res.status(200).json(dates);
  } catch (error: any) {
    return res.status(500).json({ 
      message: "Error al obtener fechas disponibles", 
      error: error.message 
    });
  }
};