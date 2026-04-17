import {
  IsDateString,
  IsNumber,
  IsString,
  IsOptional,
  IsIn
} from "class-validator";

class AppointmentDto {

  @IsDateString({}, {
  message: "La fecha debe estar en un formato válido (YYYY-MM-DD o ISO)."
  })
  date: string;

  @IsNumber({}, { message: "El userId debe ser un número." })
  userId: number;

  @IsOptional()
  @IsString()
  time: string; 

  @IsOptional()
  @IsString()
  @IsIn(["active", "cancelled"], {
    message: "El estado debe ser 'active' o 'cancelled'."
  })
  status?: string; 
}

export default AppointmentDto;