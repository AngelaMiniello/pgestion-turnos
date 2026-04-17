import { Router } from "express";
import {
    getAllAppointmentsController,
    getAppointmentByIdController,
    createAppointmentController,
    cancelAppointmentController
} from "../controllers/Appointment.Controller";

const appointmentsRouter: Router = Router();

// GET /appointments para obtener todos los turnos
appointmentsRouter.get("/", getAllAppointmentsController);

// GET /appointments/:id para obtener un turno x id
appointmentsRouter.get("/:id", getAppointmentByIdController);

// POST /appointments/schedule va a crear un nuevo turno
appointmentsRouter.post("/", createAppointmentController);

// PUT /appointments/cancel va a cancelar un turno
appointmentsRouter.put("/cancel/:id", cancelAppointmentController);

export default appointmentsRouter;
