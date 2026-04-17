import { Router } from "express";
import {
    getAllUsersContoller,
    getUserByIdConroller,
    registerUserController,
    loginUserController
} from "../controllers/User.Controller";

const usersRouter: Router = Router();

usersRouter.get("/", getAllUsersContoller);
usersRouter.get("/:id", getUserByIdConroller);
usersRouter.post("/register", registerUserController);
usersRouter.post("/login", loginUserController);

export default usersRouter;
