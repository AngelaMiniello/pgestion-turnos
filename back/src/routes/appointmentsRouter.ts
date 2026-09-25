//arquitectura MVC (Modelo-Vista-Controlador)
import { Router } from "express";
import {
    getAllAppointmentsController,
    getAppointmentByIdController,
    createAppointmentController,
    cancelAppointmentController,
    getAvailableAppointmentsController
} from "../controllers/Appointment.Controller";

const appointmentsRouter: Router = Router();

// GET /appointments/available para buscar turnos filtrados por fecha, médico o especialidad
appointmentsRouter.get("/available", getAvailableAppointmentsController);

// GET /appointments para obtener todos los turnos
appointmentsRouter.get("/", getAllAppointmentsController);

// GET /appointments/:id para obtener un turno x id
appointmentsRouter.get("/:id", getAppointmentByIdController);

// POST /appointments/
appointmentsRouter.post("/", createAppointmentController);

// PUT /appointments/cancel va a cancelar un turno
appointmentsRouter.put("/cancel/:id", cancelAppointmentController);

export default appointmentsRouter;
