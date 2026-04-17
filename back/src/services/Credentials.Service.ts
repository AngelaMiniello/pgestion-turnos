import CreateCredentialDto from "../dto/Create.Credential.Dto";
import CredentialsRepository from "../repositories/CredentialsRepository";

// Crear nuevas credenciales
export const createCredentialService = async (data: CreateCredentialDto): Promise<number> => {
    const newCredential = CredentialsRepository.create({
        username: data.username,
        password: data.password,
    });

    const savedCredential = await CredentialsRepository.save(newCredential);

    return savedCredential.id;
};

// Validar credenciales
export const validateCredentialService = async (
  username: string,
  password: string
): Promise<number> => {

  const foundCredential = await CredentialsRepository.findOne({
    where: { username }
  });

  if (!foundCredential) {
    throw new Error("El usuario no existe.");
  }

  if (foundCredential.password !== password) {
    throw new Error("Contraseña incorrecta.");
  }

  return foundCredential.id;
};

