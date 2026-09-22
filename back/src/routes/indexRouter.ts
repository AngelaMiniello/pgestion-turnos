import { Router } from "express";
import usersRouter from "./usersRouter";
import appointmentsRouter from "./appointmentsRouter";

const indexRouter: Router = Router();

// Monta cada módulo en su respectiva ruta base de forma limpia
indexRouter.use("/users", usersRouter);
indexRouter.use("/appointments", appointmentsRouter);

export default indexRouter;