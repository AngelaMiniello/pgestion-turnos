import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  CalendarDays,
  Clock3,
  ClipboardPlus,
  Check,
} from "lucide-react";
import validateAppointment from "../../helpers/validateAppintment";

function AppointmentForm({ onAddAppointment }) {
  const initialState = {
    date: "",
    time: "",
  };

  const handleSubmit = async (values) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Tenés que iniciar sesión para solicitar un turno");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/appointments`,
        {
          ...values,
          userId: user.id,
        }
      );

      alert("Turno solicitado con éxito");
      onAddAppointment(response.data);
    } catch (error) {
      console.error(error);
      alert("No se pudo solicitar el turno. Intentá nuevamente.");
    }
  };

  const hours = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
  ];

  const fieldClass = `
    box-border
    w-full
    rounded-xl
    border
    border-[#dce3ec]
    bg-[#f9fbfd]
    px-4
    py-3.5
    text-sm
    text-[#1f3557]
    outline-none
    transition-all
    duration-200
    hover:border-[#c8d5e5]
    focus:border-[#004aad]
    focus:bg-white
    focus:ring-4
    focus:ring-[#004aad]/10
  `;

  return (
    <Formik
      initialValues={initialState}
      validate={validateAppointment}
      onSubmit={handleSubmit}
    >
      <Form className="w-full max-w-xl overflow-hidden rounded-3xl border border-[#e3e9f1] bg-white shadow-[0_20px_60px_rgba(0,55,120,0.08)]">
        {/* Encabezado */}
        <div className="border-b border-[#edf1f5] px-6 py-7 sm:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#e8f2ff] text-[#004aad]">
              <ClipboardPlus size={24} strokeWidth={1.8} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#073b7a] sm:text-2xl">
                Solicitar turno
              </h2>

              <p className="mt-1 text-xs leading-5 text-[#8a98aa] sm:text-sm">
                Elegí el día y horario que prefieras para tu consulta.
              </p>
            </div>
          </div>
        </div>

        {/* Campos */}
        <div className="px-6 py-7 sm:px-8 sm:py-8">
          <div className="grid gap-5 sm:grid-cols-2">
            {/* Fecha */}
            <div>
              <label
                htmlFor="date"
                className="mb-2.5 flex items-center gap-2 text-sm font-semibold text-[#1f3557]"
              >
                <CalendarDays
                  size={17}
                  strokeWidth={1.8}
                  className="text-[#004aad]"
                />
                Fecha
              </label>

              <Field
                id="date"
                type="date"
                name="date"
                className={fieldClass}
              />

              <ErrorMessage name="date">
                {(message) => (
                  <p className="mt-2 text-xs font-medium text-[#a80b29]">
                    {message}
                  </p>
                )}
              </ErrorMessage>
            </div>

            {/* Hora */}
            <div>
              <label
                htmlFor="time"
                className="mb-2.5 flex items-center gap-2 text-sm font-semibold text-[#1f3557]"
              >
                <Clock3
                  size={17}
                  strokeWidth={1.8}
                  className="text-[#004aad]"
                />
                Hora
              </label>

              <Field
                as="select"
                id="time"
                name="time"
                className={`${fieldClass} cursor-pointer`}
              >
                <option value="">Seleccioná una hora</option>

                {hours.map((hour) => (
                  <option value={hour} key={hour}>
                    {hour}
                  </option>
                ))}
              </Field>

              <ErrorMessage name="time">
                {(message) => (
                  <p className="mt-2 text-xs font-medium text-[#a80b29]">
                    {message}
                  </p>
                )}
              </ErrorMessage>
            </div>
          </div>

          {/* Información */}
          <div className="mt-6 flex items-start gap-3 rounded-xl bg-[#f7faff] px-4 py-3.5">
            <CalendarDays
              size={18}
              strokeWidth={1.8}
              className="mt-0.5 shrink-0 text-[#004aad]"
            />

            <p className="text-xs leading-5 text-[#68758a]">
              Seleccioná una fecha y horario disponible para solicitar tu
              turno. La solicitud quedará registrada en tu cuenta.
            </p>
          </div>

          {/* Botón */}
          <button
            type="submit"
            className="
              mt-6
              flex
              w-full
              items-center
              justify-center
              gap-2.5
              rounded-xl
              bg-[#004aad]
              px-5
              py-3.5
              text-sm
              font-bold
              text-white
              shadow-[0_8px_20px_rgba(0,74,173,0.18)]
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:bg-[#073b7a]
              hover:shadow-[0_12px_28px_rgba(0,74,173,0.22)]
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#004aad]/30
            "
          >
            <Check size={18} strokeWidth={2.2} />
            Solicitar turno
          </button>

          {/* Footer */}
          <div className="mt-5 flex justify-center">
            <p className="text-center text-xs text-[#8a98aa]">
              Podés consultar y gestionar tus turnos desde tu cuenta.
            </p>
          </div>
        </div>
      </Form>
    </Formik>
  );
}

export default AppointmentForm;