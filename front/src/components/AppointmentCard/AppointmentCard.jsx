import axios from "axios";
import {
  CalendarDays,
  Clock3,
  CircleCheck,
  CircleX,
  Hourglass,
  X,
} from "lucide-react";

const Appointment = ({ id, time, date, status, onCancel }) => {
  const handleCancel = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/appointments/cancel/${id}`
      );

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

  const statusStyles = {
    active: {
      container: "bg-[#edf8f2] text-[#18794e] border-[#ccebdc]",
      icon: <CircleCheck size={15} strokeWidth={2} />,
    },
    cancelled: {
      container: "bg-[#fff1f3] text-[#a80b29] border-[#f1d0d6]",
      icon: <CircleX size={15} strokeWidth={2} />,
    },
    pending: {
      container: "bg-[#fff8e8] text-[#9a6b00] border-[#f1dfac]",
      icon: <Hourglass size={15} strokeWidth={2} />,
    },
  };

  const currentStatus = statusStyles[status] || {
    container: "bg-[#f3f5f8] text-[#68758a] border-[#e1e6ed]",
    icon: <Hourglass size={15} strokeWidth={2} />,
  };

  return (
    <article className="group w-full max-w-md overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white shadow-[0_6px_24px_rgba(0,55,120,0.07)] transition-all duration-300 hover:-translate-y-1 hover:border-[#cbdcf2] hover:shadow-[0_12px_32px_rgba(0,55,120,0.11)]">
      {/* Encabezado */}
      <div className="flex items-center justify-between border-b border-[#edf1f5] px-5 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8f2ff] text-[#004aad]">
            <CalendarDays size={20} strokeWidth={1.9} />
          </div>

          <div>
            <h2 className="text-base font-bold text-[#073b7a] sm:text-lg">
              Detalle del turno
            </h2>
            <p className="text-xs text-[#8a98aa]">
              Información de tu cita
            </p>
          </div>
        </div>

        <span
          className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${currentStatus.container}`}
        >
          {currentStatus.icon}
          {statusMap[status] || status}
        </span>
      </div>

      {/* Información */}
      <div className="space-y-3 px-5 py-5 sm:px-6">
        <div className="flex items-center gap-4 rounded-xl bg-[#f8faff] px-4 py-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-[#004aad] shadow-sm">
            <CalendarDays size={18} strokeWidth={1.8} />
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-[#8a98aa]">
              Fecha
            </p>
            <p className="mt-0.5 text-sm font-semibold text-[#1f3557]">
              {date}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-xl bg-[#f8faff] px-4 py-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-[#004aad] shadow-sm">
            <Clock3 size={18} strokeWidth={1.8} />
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-[#8a98aa]">
              Horario
            </p>
            <p className="mt-0.5 text-sm font-semibold text-[#1f3557]">
              {time}
            </p>
          </div>
        </div>
      </div>

      {/* Acción */}
      {status === "active" && (
        <div className="border-t border-[#edf1f5] px-5 py-4 sm:px-6">
          <button
            type="button"
            onClick={handleCancel}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#f0cdd3] bg-[#fff7f8] px-4 py-3 text-sm font-semibold text-[#a80b29] transition-all duration-200 hover:border-[#a80b29] hover:bg-[#a80b29] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#a80b29]/20"
          >
            <X size={17} strokeWidth={2} />
            Cancelar turno
          </button>
        </div>
      )}
    </article>
  );
};

export default Appointment;