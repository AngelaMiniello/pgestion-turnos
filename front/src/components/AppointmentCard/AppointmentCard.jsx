import styles from './AppointmentCard.module.css';
import axios from 'axios';

const Appointment = ({id, time, date, status, onCancel}) => {
    const handleCancel = async () => {
        // Lógica para cancelar el turno
        try {
            axios.put(`http://localhost:3000/appointments/cancel/${id}`)
            alert("Turno cancelado con éxito");
            onCancel(id);
        } catch (error) {
            console.error(error);
            alert("Error al cancelar el turno");
        }
    };

    const statusMap = {
      active: "Activo",
      cancelled: "Cancelado",
      pending: "Pendiente",
    };

    return (
        <div className={styles.appointmentCard}>
            <h2 className={styles.title}>Detalle del Turno</h2>

            <label className={styles.label}>Fecha: {date}</label>
            <label  className={styles.label}>Hora: {time}</label>
            <label  className={styles.label}> Estado: {statusMap[status] || status}</label>

            {status === "active" && (
              <button
                className={styles.button}
                onClick={handleCancel}
              >
              Cancelar turno
              </button>
         )}
        </div>
    )
}


export default Appointment;