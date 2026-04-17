import { Request, Response } from "express";
import {
    createCredentialService,
    validateCredentialService
} from "../services/Credentials.Service";

// Crear credenciales
export const createCredentialController = async (req: Request, res: Response) => {

    try {
        const { username, password } = req.body;

        const id = await createCredentialService({ username, password });

        res.status(201).json({ credentialId: id });

    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

// Validar credenciales
export const validateCredentialsController = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        const id = await validateCredentialService(username, password);

        res.status(200).json({ credentialId: id });

    } catch (error: any) {
        res.status(401).json({ error: error.message });
    }
};
