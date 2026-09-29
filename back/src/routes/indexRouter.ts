import { Router } from "express";
import usersRouter from "./usersRouter";
import appointmentsRouter from "./appointmentsRouter";
import { getDoctors } from "../controllers/Doctor.Controller";
import { getDoctorSchedules } from "../controllers/DoctorScheduleController";
import { getSpecialties } from "../controllers/SpecialtyController";
import { getPractices } from "../controllers/PracticesController";

const indexRouter: Router = Router();

// Monta cada módulo en su respectiva ruta base de forma limpia
indexRouter.use("/users", usersRouter);
indexRouter.use("/appointments", appointmentsRouter);
indexRouter.get("/specialties", getSpecialties);
indexRouter.get("/doctors", getDoctors);
indexRouter.get("/schedules", getDoctorSchedules);
indexRouter.get("/practices", getPractices);

export default indexRouter;