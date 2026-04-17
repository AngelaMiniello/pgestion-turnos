interface IUser {
    name: string;        // nombre completo
    email: string;       // email
    birthdate: Date;     // fecha de nacimiento
    nDni: number;        // número de DNI
    credentialsId: number; // id numérico que referencia las credenciales
}

export default IUser;