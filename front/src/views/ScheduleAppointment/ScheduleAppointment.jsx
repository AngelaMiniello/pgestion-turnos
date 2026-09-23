import { useNavigate } from "react-router-dom";
import AppointmentForm from "../../components/AppointmentForm/AppointmentForm";

function ScheduleAppointment() {
  const navigate = useNavigate();

  //se ejecuta cuando el formulario termina de crear el turno con éxito
  const handleAddAppointment = () => {
    navigate("/appointments"); //redirige automáticamente a la lista de turnos
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight text-[#1b2a57] md:text-4xl text-center mb-10">
        Agendar Nuevo Turno
      </h1>

      <AppointmentForm onAddAppointment={handleAddAppointment} />
    </div>
  );
}

export default ScheduleAppointment;