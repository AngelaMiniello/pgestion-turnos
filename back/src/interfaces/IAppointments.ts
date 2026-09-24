export interface IAppointment {
    id?: number;
    date: string;          // Coincide con tu entidad (string)
    time: string | null;   // Puede ser nulo
    tipo: string;          // ¡Fundamental!
    especialidad?: string | null;
    practica?: string | null;
    medico?: string | null;
    status?: string;
    user?: any;            // O el tipo de tu usuario
}
export default IAppointment;
