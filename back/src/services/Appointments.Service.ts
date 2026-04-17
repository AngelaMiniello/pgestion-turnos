import { Appointment } from "../entities/Appointments";
import AppointmentRepository from "../repositories/AppointmentsRepository";
import UserRepository from "../repositories/UserRepository";

// Obtener todos los turnos. Solo retorna el array de turnos.
export const getAllAppointmentsService = async (userId?: string) => {
  if (userId) {
    return await AppointmentRepository.find({
      where: { user: { id: Number(userId) } },
      relations: ["user"],
    });
  }

  // Si no viene userId, se devuelven todos los turnos
  return await AppointmentRepository.find({
    relations: ["user"],
  });
};


// Obtener el detalle de un turno por ID. Busca un turno en el array
export const getAppointmentByIdService = async (id: number): Promise<Appointment | null> => {
    return await AppointmentRepository.findOne({
        where: { id },
        relations: ["user"]
    });
};

// Crear un nuevo turno
export const createAppointmentService = async (
    //Recibe la fecha, hora y userId.
    date: string,
    time: string,
    userId: number
): Promise<Appointment> => {

    if (!userId) {//Valida que userId exista.
        throw new Error("No se puede crear un turno sin userId.");
    }

    //  Validar que el usuario exista (usando tu método findById)
    const user = await UserRepository.findById(userId);
  
    if (!user) {
        throw new Error("El usuario no existe.");
    } 

    //  Crear el turno con el repositorio personalizado
    const newAppointment = AppointmentRepository.create({
        date,
        time,
        status: "active",
        user: user,
    });

    // Guardarlo
    return await AppointmentRepository.save(newAppointment);
};

// Cancelar un turno
export const cancelAppointmentService = async (id: number): Promise<Appointment | undefined> => {
  //  Buscar turno
  const appointment = await AppointmentRepository.findOne({ where: { id } });

  if (!appointment) {
    return undefined;
  }

  //  Cambiar estado
  appointment.status = "cancelled";

  //  Guardar cambios
  return await AppointmentRepository.save(appointment);
};
