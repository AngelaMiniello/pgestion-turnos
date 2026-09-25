import { Appointment } from "../entities/Appointments";
import { Doctor } from "../entities/Doctor";
import AppointmentRepository from "../repositories/AppointmentsRepository";
import UserRepository from "../repositories/UserRepository";
import { DoctorRepository } from "../repositories/DoctorRepository";

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
    date: string,
    time: string,
    tipo: string,
    especialidad: string,
    practica: string,
    medicoId: number, // Recibo el ID del médico desde el frontend
    userId: number
): Promise<Appointment> => {

    if (!userId) {
      throw new Error("No se puede crear un turno sin userId.");
    }

    // Validar que el usuario exista
    const user = await UserRepository.findById(userId);
    if (!user) {
      throw new Error("El usuario no existe.");
    }

    // Buscar el objeto Doctor en la base de datos si es por especialidad
    let doctorEntity = null;
    if (tipo === "especialidad" && medicoId) {
        doctorEntity = await DoctorRepository.findOneBy({ id: medicoId });
        if (!doctorEntity) {
          throw new Error("El médico seleccionado no existe.");
        }
    }

    // Crear la instancia del turno con los tipos correctos (pasando el objeto Doctor)
    const newAppointment = AppointmentRepository.create({
      date,
      time,
      tipo,
      especialidad: tipo === "especialidad" ? especialidad : null,
      practica: tipo === "practica" ? practica : null,
      medico: doctorEntity, //Acá le paso la entidad Doctor completa, no un string
      status: "active",
      user: user,
    });

    // Guardarlo y retornarlo como un único objeto
    const savedAppointment = await AppointmentRepository.save(newAppointment);
    return savedAppointment;
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
