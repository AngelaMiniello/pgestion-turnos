import { IsString, MinLength } from "class-validator";

class CreateCredentialDto {

  @IsString()
  username: string;

  @IsString()
  @MinLength(6, { message: "La contraseña debe tener al menos 6 caracteres." })
  password: string;
}

export default CreateCredentialDto;