import Credential from "../models/Credential";
import User from "../models/Users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

    const hashedPassword = await bcrypt.hash(data.password, 10);

    //  Crear credencial asociada
    await Credential.create({
        username: data.username,
        password: hashedPassword,  //bcrypt
        userId: newUser.id
    });

    return newUser;
};


export const loginUserService = async (username: string, password: string) => {
    const credential = await Credential.findOne({ username });
 
    if (!credential) throw new Error("Usuario no encontrado");

    const isMatch = await bcrypt.compare(password, credential.password);
    
    if (!isMatch) {
      throw new Error("Contraseña incorrecta");
    }

    const user = await User.findOne({ id: credential.userId });
    
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET no definido");
    } 
    
    // generar token
    const token = jwt.sign(
        {
            id: user.id,
            username: credential.username
        },
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" }
    );

    return {
        user,
        token
    };
};
