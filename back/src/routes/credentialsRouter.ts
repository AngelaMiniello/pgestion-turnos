import { Router } from "express";
import {
    createCredentialController,
    validateCredentialsController
} from "../controllers/Credentials.Controller";

const credentialRouter = Router();

// POST /credentials → crear credenciales
credentialRouter.post("/", createCredentialController);

// POST /credentials/validate → validar credenciales
credentialRouter.post("/validate", validateCredentialsController);

export default credentialRouter;
