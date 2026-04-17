
const myAppointments = [
  {
    id: 1,
    userId: 1,            // id del usuario 
    date: "2025-12-10",   // fecha
    time: "10:00",        // hora
    status: "pending"   // estado: "pending" | "confirmed" | "cancelled"
  },
  {
    id: 2,
    userId: 1,
    date: "2025-12-12",
    time: "16:30",
    status: "confirmed"
  },
  {
    id: 3,
    userId: 2,
    date: "2025-12-15",
    time: "09:00",
    status: "cancelled"
  },
];

export default myAppointments;
