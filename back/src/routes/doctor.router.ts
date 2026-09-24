import { Router } from "express";
import { getSpecialties, getDoctors } from "../controllers/Doctor.Controller";

const router = Router();

router.get("/specialties", getSpecialties);
router.get("/doctors", getDoctors);

export default router;