import AppointmentCard from "../../components/AppointmentCard/AppointmentCard";
import { useState, useEffect } from "react";
import styles from "./MyAppointments.module.css";
import axios from "axios";
import AppointmentForm from "../../components/AppointmentForm/AppointmentForm";
import { useNavigate } from "react-router-dom";

function MyAppointments() {

  const [appointments, setAppointments] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const navigate = useNavigate();

useEffect(() => {
  const getAllAppointments = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/appointments?userId=${user.id}`);
      setAppointments(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

   const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/");
    } else {
       getAllAppointments(user.id);
    }
}, [navigate]);

  const handlerAddAppointment = (newAppointment) => {
     setAppointments([...appointments, newAppointment]);
  }

  const handleCancelAppointment = (id) => {
    setAppointments(
      appointments.map((appoint) => {
      if (appoint.id === id) {
        appoint.status = "cancelled"
      }
      return appoint;
    })
    );
  }

return (
  <>
    <div className="p-8">
      <h1 className="text-3xl font-bold tracking-tight text-[#1b2a57] md:text-4xl text-center">Mis Turnos</h1>

      <AppointmentForm onAddAppointment={handlerAddAppointment} />

      <div className={styles.appointmentsContainer}>
      {loading ? (
        <h2 className={styles.h2}>Loading...</h2>
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
  </>
);
}

export default MyAppointments;