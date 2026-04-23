import { Request, Response} from "express";
import { createUserService, getAllUsersService, getUserByIdService, deleteUserService, loginUserService } from "../services/Users.Service";
import { User } from "../entities/User";

export const createUserController = async (req:Request, res:Response) => {
    try {
        const newUser: User = await createUserService(req.body);
        res.status(201).json(newUser);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}; 

export const getAllUsersContoller = async (req:Request, res:Response) => {
    try {
        const users: User[] = await getAllUsersService();
        res.status(200).json(users);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getUserByIdConroller = async (req: Request, res: Response) => {
     try {
        const { id } = req.params;
        const user: User | null = await getUserByIdService(Number(id));

        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        res.status(200).json(user);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const registerUserController = async (req: Request, res: Response) => {
  try {
    //  Tomar datos del body
    const { name, email, birthdate, nDni, username, password } = req.body;

    //  Crear usuario EN LA BD
    const newUser = await createUserService({
      name,
      email,
      birthdate,
      nDni,
      username,
      password
    });

    //  Responder al frontend
    res.status(201).json({
      message: "Usuario creado correctamente",
      user: newUser
    });

  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteUserController = async (req:Request, res:Response) => {
    const id = Number(req.body.id); 
    await deleteUserService(id);
    res.status(200).json({ messege: "Usuario eliminado correctamente" });
};

export const loginUserController = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const { user, token } = await loginUserService(username, password);

    res.status(200).json({
      login: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        birthdate: user.birthdate,
        nDni: user.nDni
      }
    });

  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};


