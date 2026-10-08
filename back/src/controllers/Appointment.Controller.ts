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
import { AppDataSource } from "../config/data-source";
import { Doctor } from "../entities/Doctor";
import { User } from "../entities/User";

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

// Controlador para buscar turnos disponibles
export const getAvailableAppointmentsController = async (
  req: Request,
  res: Response
) => {
  try {
    const { date, tipo, especialidad, practica, medico } = req.query;

    const appointmentRepository =
      AppDataSource.getRepository(Appointment);

    const queryBuilder = appointmentRepository
      .createQueryBuilder("appointment")
      .leftJoinAndSelect("appointment.medico", "medico")
      .leftJoinAndSelect("medico.specialty", "specialty")
      .leftJoinAndSelect("medico.practices", "practices")
      .leftJoinAndSelect("appointment.user", "user")
      .where("appointment.status = :status", {
        status: "active",
      })
      .andWhere("appointment.userId IS NULL");

    // FECHA
    if (date) {
      queryBuilder.andWhere(
        "appointment.date = :date",
        { date }
      );
    }

    // TIPO
    if (tipo) {
      queryBuilder.andWhere(
        "appointment.tipo = :tipo",
        { tipo }
      );
    }

    // ESPECIALIDAD
    if (especialidad) {
      queryBuilder.andWhere(
        "appointment.especialidad = :especialidad",
        { especialidad }
      );
    }

    // PRÁCTICA
    if (practica) {
      queryBuilder.andWhere(
        "appointment.practica = :practica",
        { practica }
      );
    }

    // MÉDICO
    if (medico) {
      queryBuilder.andWhere(
        "medico.id = :medicoId",
        {
          medicoId: Number(medico),
        }
      );
    }

    // FECHA Y HORA ACTUAL DE ARGENTINA
    const now = new Date();

    const argentinaDate = new Intl.DateTimeFormat("en-CA", {
      timeZone: "America/Argentina/Buenos_Aires",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(now);

    const argentinaTime = new Intl.DateTimeFormat("en-GB", {
      timeZone: "America/Argentina/Buenos_Aires",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(now);

    // EXCLUIR TURNOS VENCIDOS
    queryBuilder.andWhere(
      `(
        appointment.date > :today
        OR (
          appointment.date = :today
          AND appointment.time > :currentTime
        )
      )`,
      {
        today: argentinaDate,
        currentTime: argentinaTime,
      }
    );

    // EJECUTAR CONSULTA DESPUÉS DE TODOS LOS FILTROS
    const appointments = await queryBuilder
      .orderBy("appointment.time", "ASC")
      .getMany();

    console.log(
      `Turnos disponibles encontrados: ${appointments.length}`
    );

    return res.status(200).json(appointments);

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
  try {
    console.log("🚨 SEED APPOINTMENTS EJECUTADO");
    const appointmentRepo = AppDataSource.getRepository(Appointment);
    const doctorRepo = AppDataSource.getRepository(Doctor);

    // Traemos médicos con especialidad, horarios y prácticas
    const doctors = await doctorRepo.find({
      relations: {
        specialty: true,
        schedules: true,
        practices: true,
      },
    });

    if (doctors.length === 0) {
      console.log("⚠️ No hay médicos cargados.");
      return;
    }

    // Convierte "08:00" a minutos
    const timeToMinutes = (time: string): number => {
      const parts = time.split(":");

      const hours = Number(parts[0] ?? 0);
      const minutes = Number(parts[1] ?? 0);

      return hours * 60 + minutes;
    };

    // Convierte minutos a "HH:mm"
    const minutesToTime = (totalMinutes: number): string => {
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;

      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
        2,
        "0"
      )}`;
    };

    // Formatea fecha local como YYYY-MM-DD
    const formatDate = (date: Date): string => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      return `${year}-${month}-${day}`;
    };

    // Cantidad de días para generar
    const DAYS_TO_GENERATE = 30;
    const MAX_SLOTS_PER_DAY = 3;

    // Duración de cada turno
    const SLOT_DURATION = 30;

    const appointmentsToCreate: Appointment[] = [];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Recorremos los próximos 30 días
    for (
      let dayOffset = 1;
      dayOffset <= DAYS_TO_GENERATE;
      dayOffset++
    ) {
      const appointmentDate = new Date(today);

      appointmentDate.setDate(today.getDate() + dayOffset);

      // 0 domingo, 1 lunes, ..., 6 sábado
      const dayOfWeek = appointmentDate.getDay();

      const formattedDate = formatDate(appointmentDate);

      // Recorremos todos los médicos
      for (const doctor of doctors) {
        // Buscamos el horario del médico para ese día
        const schedule = doctor.schedules.find(
          (schedule) => schedule.dayOfWeek === dayOfWeek
        );

        // Si el médico no trabaja ese día, continuamos
        if (!schedule) {
          continue;
        }

        const startMinutes = timeToMinutes(schedule.startTime);
        const endMinutes = timeToMinutes(schedule.endTime);

        // Generamos horarios cada 30 minutos
        let slotIndex = 0;
        let practiceIndex = 0;
        let generatedSlots = 0;

        for (
          let minutes = startMinutes;
            minutes < endMinutes && generatedSlots < MAX_SLOTS_PER_DAY;
            minutes += 90
        ) {
          const time = minutesToTime(minutes);

          /*
          * Cada tercer turno será de práctica,
          * siempre que el médico tenga prácticas asociadas.
          *
          * Los demás serán turnos de especialidad.
          */
          const shouldBePractice = doctor.practices.length > 0 && slotIndex % 2 === 1;

          if (shouldBePractice) {
          /*
          * Vamos rotando entre las prácticas que
          * realmente realiza este médico.
          */
            const practice = doctor.practices[ practiceIndex % doctor.practices.length ];

    if (practice) {
      const appointment = appointmentRepo.create({
        date: formattedDate,
        time,
        status: "active",

        tipo: "practica",

        especialidad: null,

        practica: practice.name,

        medico: doctor,

        user: null,
      });

      appointmentsToCreate.push(appointment);

      practiceIndex++;
    }
  } else {
    const appointment = appointmentRepo.create({
      date: formattedDate,
      time,
      status: "active",

      tipo: "especialidad",

      especialidad:
        doctor.specialty?.name ?? null,

      practica: null,

      medico: doctor,

      user: null,
    });

    appointmentsToCreate.push(appointment);
  }

  slotIndex++;
   generatedSlots++;
}
      }
    }

    // Guardamos todos los turnos
    await appointmentRepo.save(appointmentsToCreate);

    console.log( `✅ ${appointmentsToCreate.length} turnos disponibles creados.` );
    console.log( `📅 Disponibilidad generada para los próximos ${DAYS_TO_GENERATE} días.` );
    console.log(  `⏱️ Duración de cada turno: ${SLOT_DURATION} minutos.` );
    console.log(  `👨‍⚕️ Médicos utilizados: ${doctors.length}.` );
  } catch (error) {
    console.error("❌ Error creando los turnos:", error);
    throw error;
  }
};

export const getActiveDatesController = async (
  req: Request,
  res: Response
) => {
  try {
    const { tipo, especialidad, practica, medico } = req.query;

    const appointmentRepository =
      AppDataSource.getRepository(Appointment);

    const queryBuilder = appointmentRepository
      .createQueryBuilder("appointment")
      .select("appointment.date", "date")
      .where("appointment.status = :status", {
        status: "active",
      })
      .andWhere("appointment.userId IS NULL");

    // TIPO
    if (tipo) {
      queryBuilder.andWhere(
        "appointment.tipo = :tipo",
        { tipo }
      );
    }

    // ESPECIALIDAD
    if (especialidad) {
      queryBuilder.andWhere(
        "appointment.especialidad = :especialidad",
        { especialidad }
      );
    }

    // PRÁCTICA
    if (practica) {
      queryBuilder.andWhere(
        "appointment.practica = :practica",
        { practica }
      );
    }

    // MÉDICO
    if (medico) {
      queryBuilder.andWhere(
        "appointment.medicoId = :medicoId",
        { medicoId: Number(medico) }
      );
    }

    // FECHA Y HORA ACTUAL DE ARGENTINA
    const now = new Date();

    const argentinaDate = new Intl.DateTimeFormat("en-CA", {
      timeZone: "America/Argentina/Buenos_Aires",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(now);

    const argentinaTime = new Intl.DateTimeFormat("en-GB", {
      timeZone: "America/Argentina/Buenos_Aires",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(now);

    // EXCLUIR TURNOS VENCIDOS
    queryBuilder.andWhere(
      `(
        appointment.date > :today
        OR (
          appointment.date = :today
          AND appointment.time > :currentTime
        )
      )`,
      {
        today: argentinaDate,
        currentTime: argentinaTime,
      }
    );

    // OBTENER FECHAS ÚNICAS
    const results = await queryBuilder
      .distinct(true)
      .orderBy("appointment.date", "ASC")
      .getRawMany();

    const dates = results.map(item => item.date);

    return res.status(200).json(dates);

  } catch (error: any) {
    console.error(
      "Error al obtener fechas disponibles:",
      error
    );

    return res.status(500).json({
      message: "Error al obtener fechas disponibles",
      error: error.message,
    });
  }
};

export const reserveAppointmentController = async (
  req: Request,
  res: Response
) => {
  try {
    const appointmentId = Number(req.params.id);
    const { userId } = req.body;

    if (!appointmentId || !userId) {
      return res.status(400).json({
        error: "appointmentId y userId son obligatorios",
      });
    }

    const appointmentRepository =
      AppDataSource.getRepository(Appointment);

    const userRepository =
      AppDataSource.getRepository(User);

    const appointment =
      await appointmentRepository.findOne({
        where: {
          id: appointmentId,
        },
        relations: {
          user: true,
          medico: {
            specialty: true,
          },
        },
      });

    if (!appointment) {
      return res.status(404).json({
        error: "Turno no encontrado",
      });
    }

    // Si ya tiene usuario, alguien ya lo reservó
    if (appointment.user) {
      return res.status(409).json({
        error: "Este turno ya fue reservado",
      });
    }

    if (appointment.status !== "active") {
      return res.status(409).json({
        error: "Este turno ya no está disponible",
      });
    }

    const user = await userRepository.findOne({
      where: {
        id: Number(userId),
      },
    });

    if (!user) {
      return res.status(404).json({
        error: "Usuario no encontrado",
      });
    }

    appointment.user = user;

    const reservedAppointment =
      await appointmentRepository.save(appointment);

    return res.status(200).json(
      reservedAppointment
    );

  } catch (error: any) {
    console.error(
      "Error al reservar turno:",
      error
    );

    return res.status(500).json({
      error: "Error al reservar el turno",
      message: error.message,
    });
  }
};