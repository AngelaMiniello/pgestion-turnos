import { Router } from "express";
import usersRouter from "./usersRouter";
import appointmentsRouter from "./appointmentsRouter";
import { createUserController, getAllUsersContoller, getUserByIdConroller, registerUserController, loginUserController} from "../controllers/User.Controller";
import auth from "../middlewares/autenticación";

const indexRouter:Router = Router();

// Monta cada módulo en su ruta base
indexRouter.use("/users", usersRouter);
indexRouter.use("/appointments", appointmentsRouter);

indexRouter.use("/users", createUserController);
indexRouter.use("/users", getAllUsersContoller);
indexRouter.use("/users", auth, getUserByIdConroller);
indexRouter.use("/users", registerUserController);
indexRouter.use("/users", loginUserController);

export default indexRouter;
