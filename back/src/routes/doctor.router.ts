import { Router } from "express";
import { getDoctors } from "../controllers/Doctor.Controller";
import { getDoctorSchedules } from "../controllers/DoctorScheduleController";
import { getSpecialties } from "../controllers/SpecialtyController";
import { getPractices } from "../controllers/PracticesController";

const router = Router();

router.get("/specialties", getSpecialties);
router.get("/doctors", getDoctors);
router.get("/schedules", getDoctorSchedules);
router.get("/practicas", getPractices);

export default router;