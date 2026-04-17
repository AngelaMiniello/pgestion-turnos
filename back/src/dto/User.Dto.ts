import {
  IsString,
  IsEmail,
  IsDateString,
  IsNumber,
  IsOptional,
  MinLength
} from "class-validator";

class UserDto {

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsDateString()
  birthdate: string;

  @IsNumber()
  nDni: number;

  @IsOptional()
  active?: boolean; 

  @IsString()
  @MinLength(4)
  username: string;

  @IsString()
  @MinLength(8)
  password: string;
}

export default UserDto;
