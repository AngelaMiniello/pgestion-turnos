import {
  IsDateString,
  IsString,
  IsOptional,
  IsIn
} from "class-validator";

class AppointmentDto {

  @IsDateString({}, {
    message: "La fecha debe estar en un formato válido (YYYY-MM-DD o ISO)."
  })
  date: string;

  @IsString({ message: "La hora es obligatoria." })
  time: string;

  @IsString({ message: "El tipo de turno es obligatorio." })
  @IsIn(["especialidad", "practica"], {
    message: "El tipo debe ser 'especialidad' o 'practica'."
  })
  tipo: string;

  @IsOptional()
  @IsString()
  especialidad?: string;

  @IsOptional()
  @IsString()
  practica?: string;

  @IsOptional()
  @IsString()
  medico?: string;

  @IsOptional()
  @IsString()
  @IsIn(["active", "cancelled"], {
    message: "El estado debe ser 'active' o 'cancelled'."
  })
  status?: string; 

  // Ajustar esto según si userId es de tipo string (ObjectId) o number
  userId: any; 
}

export default AppointmentDto;