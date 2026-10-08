import AppointmentCard from "../../components/AppointmentCard/AppointmentCard";
import { useState, useEffect } from "react";
import styles from "./MyAppointments.module.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { PlusIcon, CheckCircle2, AlertCircle, X, } from "lucide-react";

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
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

  useEffect(() => {
    if (!notification) return;

    const timeout = setTimeout(() => {
      setNotification(null);
    }, 4000);

    return () => clearTimeout(timeout);
  }, [notification]);

  const handleCancelAppointment = (id, error = null) => {
    if (error) {
      setNotification({
        type: "error",
        message: "No se pudo cancelar el turno. Intentá nuevamente.",
      });
      return;
    }

    // Quitar el turno cancelado de la lista del paciente
    setAppointments(prev =>
      prev.filter(appointment => appointment.id !== id)
    );

    setNotification({
      type: "success",
      message: "Turno cancelado correctamente.",
    });
  };

  return (
    <>
      <div className="flex w-full justify-center px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-80px)]">
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

        {notification && (
          <div
            role="status"
            className={`mb-6 flex items-center justify-between gap-3 rounded-xl border px-4 py-3 shadow-sm ${
              notification.type === "success"
                ? "border-green-200 bg-green-50 text-green-800"
                : "border-red-200 bg-red-50 text-red-800"
            }`}
          >
          <div className="flex items-center gap-3">
            {notification.type === "success" ? (
              <CheckCircle2 size={21} />
                ) : (
              <AlertCircle size={21} />
            )}

            <p className="text-sm font-semibold">
              {notification.message}
            </p>
          </div>

    <button
      type="button"
      onClick={() => setNotification(null)}
      className="rounded-lg p-1 transition hover:bg-black/5"
      aria-label="Cerrar notificación"
    >
      <X size={18} />
    </button>
  </div>
)}

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