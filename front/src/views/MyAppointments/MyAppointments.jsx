import AppointmentCard from "../../components/AppointmentCard/AppointmentCard";
import { useState, useEffect } from "react";
import styles from "./MyAppointments.module.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { PlusIcon } from "lucide-react";

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/");
      return;
    }

    const getAllAppointments = async (userId) => {
      setLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/appointments?userId=${userId}`);
        setAppointments(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getAllAppointments(user.id);
  }, [navigate]);

  const handleCancelAppointment = (id) => {
    setAppointments(
      appointments.map((appoint) => {
        if (appoint.id === id) {
          appoint.status = "cancelled";
        }
        return appoint;
      })
    );
  };

  return (
    <>
      <div className="flex w-full justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl p-8">
        
        {/* Cabecera con título y botón de Nuevo Turno */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 mx-auto">
          <h1 className="text-3xl font-bold tracking-tight text-[#1b2a57] md:text-4xl">
            Mis Turnos
          </h1>
          
          <Link
            to="/appointments/schedule"
            className="px-5 py-2.5 bg-[#1b2a57] text-white text-sm font-semibold rounded-xl text-center hover:bg-[#152144] transition shadow-sm flex items-center gap-2"
          >
            <PlusIcon size={17} className="text-white" />
            Nuevo Turno
          </Link>
        </div>

        {/* Listado de Turnos */}
        <div className={styles.appointmentsContainer}>
          {loading ? (
            <h2 className={styles.h2}>Loading...</h2>
          ) : appointments.length === 0 ? (
            <p className="text-center text-gray-500 py-10">No tenés turnos agendados.</p>
          ) : (
            appointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                date={appointment.date}
                time={appointment.time}
                status={appointment.status}
                setAppointments={setAppointments}
                onCancel={handleCancelAppointment}
                id={appointment.id}
              />
            ))
          )}
        </div>
      </div>
      </div>
    </>
  );
}

export default MyAppointments;