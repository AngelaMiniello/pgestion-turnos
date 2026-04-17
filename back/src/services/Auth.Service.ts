import Credential from "../models/Credential";
import User from "../models/Users";

export const registerUserService = async (data: {
    name: string;
    email: string;
    username: string;
    password: string;
}) => {

    //  Crear usuario
    const newUser = await User.create({
        name: data.name,
        email: data.email,
        active: true
    });

    //  Crear credencial asociada
    await Credential.create({
        username: data.username,
        password: data.password,  // ideal usar bcrypt
        userId: newUser.id
    });

    return newUser;
};


export const loginUserService = async (username: string, password: string) => {
    const credential = await Credential.findOne({ username });

    if (!credential) throw new Error("Usuario no encontrado");

    if (credential.password !== password) {
        throw new Error("Contraseña incorrecta");
    }

    const user = await User.findOne({ id: credential.userId });

    return user;
};
