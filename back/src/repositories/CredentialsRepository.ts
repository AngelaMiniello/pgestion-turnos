import { AppDataSource } from "../config/data-source";
import { Credential }  from "../entities/Credentials";

const CredentialsRepository = AppDataSource.getRepository(Credential);

export default CredentialsRepository ;