import { User } from "../entities/User";
import UserDto from "../dto/User.Dto";
import UserRepository from "../repositories/UserRepository";
import CredentialRepository from "../repositories/CredentialsRepository";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//  Crear usuario con credenciales automáticamente
export const createUserService = async (userData: UserDto): Promise<User> => {
  
  // Crear credenciales
  const newCredential = CredentialRepository.create({
    username: userData.username,
    password: userData.password
  });

  const savedCredential = await CredentialRepository.save(newCredential);

  //  Crear usuario asociado con esa credencial
  const newUser = UserRepository.create({
    name: userData.name,
    email: userData.email,
    birthdate: userData.birthdate,
    nDni: userData.nDni,
    active: true,
    credential: savedCredential
  });

  // Guardar usuario final
  return await UserRepository.save(newUser);
};


// Obtener todos los usuarios
export const getAllUsersService = async (): Promise<User[]> => {
  return await UserRepository.find({
    relations: ["credential"]
  });
};


//  Obtener usuario por ID
export const getUserByIdService = async (id: number): Promise<User | null> => {
  return await UserRepository.findOne({
    where: { id },
    relations: ["credential"]
  });
};


// Eliminar usuario
export const deleteUserService = async (id: number): Promise<void> => {
  await UserRepository.delete(id);
};


// Login
import { validateCredentialService } from "./Credentials.Service";

export const loginUserService = async (username: string, password: string): Promise<{ user: User; token: string }> => {
  // Validar credenciales
  const credentialId = await validateCredentialService(username, password);

  // Buscar usuario con esa credencial
  const user = await UserRepository.findOne({
    where: { credential: { id: credentialId } },
    relations: ["credential"]
  });

  if (!user) {
    throw new Error("Usuario no encontrado para esas credenciales.");
  }

   //  GENERAR TOKEN
  const token = jwt.sign(
    {
      id: user.id,
      username: username
    },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );

  return { user, token };
};
