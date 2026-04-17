interface IAppointment {
    id: number;             // ID numérico del turno
    date: Date;             // fecha del turno
    time: string;           // hora del turno (ej: "14:30")
    userId: number;         // referencia al usuario que reservó el turno
    status: "active" | "cancelled"; // estado actual del turno
}

export default IAppointment;
