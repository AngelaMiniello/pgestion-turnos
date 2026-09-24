import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState, useEffect } from 'react';
import {  CalendarDays,  Clock3,  ClipboardPlus,  Check,  ChevronDown, Stethoscope, Activity, UserCheck } from "lucide-react";
import validateAppointment from "../../helpers/validateAppintment";

const initialState = {
  tipo: "",
  especialidad: "",
  practica: "",
  medico: "",
  date: "",
  time: ""
};

function AppointmentForm({ onAddAppointment }) {
  const [specialties, setSpecialties] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  // Horarios fijos de ejemplo (puedes ajustarlos o traerlos del backend después)
  const hours = ["08:00", "09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"];
  const practicas = ["Analisis de sangre", "Radiografia", "Electrocardiograma", "Resonancia"];

  useEffect(() => {
    // Cargar especialidades desde el backend
    axios.get('http://localhost:3000/specialties')
      .then(response => setSpecialties(response.data))
      .catch(error => console.error("Error cargando especialidades", error));

    // Cargar médicos desde el backend
    axios.get('http://localhost:3000/doctors')
      .then(response => {
        setDoctors(response.data);
        setFilteredDoctors(response.data);
      })
      .catch(error => console.error("Error cargando médicos", error));
  }, []);

  const handleSubmit = async (values) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Tenés que iniciar sesión para solicitar un turno");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/appointments`,
        {
          ...values,
          userId: user.id,
        }
      );

      alert("Turno solicitado con éxito");
      if (onAddAppointment) onAddAppointment(response.data);
    } catch (error) {
      console.error(error);
      alert("No se pudo solicitar el turno. Intentá nuevamente.");
    }
  };

  // Filtrar médicos dinámicamente cuando el usuario selecciona una especialidad
  const handleSpecialtySelect = (specialtyName, setFieldValue) => {
    setFieldValue("especialidad", specialtyName);
    setFieldValue("medico", ""); // Reseteamos el médico seleccionado

    // Filtramos los médicos que coincidan con la especialidad seleccionada
    const filtered = doctors.filter(doc => doc.specialty?.name === specialtyName);
    setFilteredDoctors(filtered);
  };

  const fieldClass = `
    box-border w-full rounded-xl
    border border-[#dce3ec] bg-[#f9fbfd]
    px-4 py-3.5
    text-sm text-[#1f3557]
    outline-none transition-all  duration-200
    hover:border-[#c8d5e5] focus:border-[#004aad] focus:bg-white focus:ring-4  focus:ring-[#004aad]/10
  `;

  return (
    <div className="w-full flex justify-center px-4">
      <Formik
        initialValues={initialState}
        validate={validateAppointment}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
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

          {/* Campos y Secciones */}
          <div className="px-6 py-7 sm:px-8 sm:py-8 flex flex-col gap-6">
        
          {/* Grilla de Fecha y Hora con buen espacio */}
            {/* PASO 1: ¿Qué tipo de turno querés? */} 
            <div className="flex flex-col gap-2"> 
              <label className="mb-1 flex items-center gap-2 text-sm font-semibold text-[#1f3557]"> 
                <Stethoscope size={17} strokeWidth={1.8} className="text-[#004aad]" /> 
                  ¿Qué tipo de atención necesitás? 
              </label>

              <div className="relative"> 
                <Field 
                  as="select" 
                  name="tipo" 
                  className={`${fieldClass} cursor-pointer h-12 py-0 appearance-none pr-12`}
                  onChange={(e) => {
                    // Al cambiar de tipo, reseteamos los campos dependientes
                    setFieldValue("tipo", e.target.value);
                    setFieldValue("especialidad", "");
                    setFieldValue("practica", "");
                    setFieldValue("medico", "");
                  }}
                > 
                  <option value="">Seleccioná una opción</option> 
                  <option value="especialidad">Especialidad Médica</option> 
                  <option value="practica">Práctica / Estudio</option> 
                </Field> 

                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#1b2a57]"> 
                  <ChevronDown size={18} strokeWidth={2} /> 
                </div> 
              </div> 
            </div>

            {/* PASO 2A: Si elige Especialidad */} 
              {values.tipo === "especialidad" && ( 
                <div className="flex flex-col gap-2 animate-fadeIn"> 
                  <label htmlFor="especialidad" className="mb-1 flex items-center gap-2 text-sm font-semibold text-[#1f3557]"> 
                    <Stethoscope size={17} strokeWidth={1.8} className="text-[#004aad]" /> 
                    Especialidad 
                  </label> 

                  <div className="relative"> 
                    <Field 
                      as="select" 
                      id="especialidad" 
                      name="especialidad" 
                      className={`${fieldClass} cursor-pointer h-12 py-0 appearance-none pr-12`}
                      onChange={(e) => handleSpecialtySelect(e.target.value, setFieldValue)}
                    > 
                      <option value="">Seleccioná una especialidad</option> 
                      {specialties.map((esp) => (
                        <option value={esp.name} key={esp.id}>{esp.name}</option>
                      ))} 
                    </Field> 

                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#1b2a57]"> 
                      <ChevronDown size={18} strokeWidth={2} /> 
                    </div> 
                  </div> 
                </div> 
              )}


            {/* PASO 2B: Si elige Práctica */} 
              {values.tipo === "practica" && ( 
                <div className="flex flex-col gap-2 animate-fadeIn"> 
                  <label htmlFor="practica" className="mb-1 flex items-center gap-2 text-sm font-semibold text-[#1f3557]"> 
                    <Activity size={17} strokeWidth={1.8} className="text-[#004aad]" /> 
                    Práctica o Estudio 
                  </label> 

                  <div className="relative"> 
                    <Field 
                      as="select" 
                      id="practica" 
                      name="practica" 
                      className={`${fieldClass} cursor-pointer h-12 py-0 appearance-none pr-12`}
                    > 
                      <option value="">Seleccioná una práctica</option> 
                      {practicas.map((prac) => ( 
                        <option value={prac} key={prac}>{prac}</option> 
                      ))} 
                    </Field> 

                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#1b2a57]"> 
                      <ChevronDown size={18} strokeWidth={2} /> 
                    </div> 
                  </div> 
                </div> 
              )}

            {/* PASO 3: Selección de Médico (Solo si eligió Especialidad) */} 
              {values.tipo === "especialidad" && values.especialidad && ( 
                <div className="flex flex-col gap-2 animate-fadeIn"> 
                  <label htmlFor="medico" className="mb-1 flex items-center gap-2 text-sm font-semibold text-[#1f3557]"> 
                    <UserCheck size={17} strokeWidth={1.8} className="text-[#004aad]" /> 
                    Profesional 
                  </label> 

                  <div className="relative"> 
                    <Field 
                      as="select" 
                      id="medico" 
                      name="medico" 
                      className={`${fieldClass} cursor-pointer h-12 py-0 appearance-none pr-12`}
                    > 
                      <option value="">Seleccioná un profesional</option> 
                      {filteredDoctors.map((med) => (
                        <option value={med.name} key={med.id}>{med.name}</option>
                      ))} 
                    </Field> 

                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#1b2a57]"> 
                      <ChevronDown size={18} strokeWidth={2} /> 
                    </div> 
                  </div> 
                </div> 
              )}

              {/* PASO 4: Fecha y Hora (Aparecen una vez que avanzó en la selección) */} 
              {((values.tipo === "especialidad" && values.especialidad && values.medico) || (values.tipo === "practica" && values.practica)) && (
                <div className="grid gap-5 sm:grid-cols-2 animate-fadeIn"> 
                  
                  {/* Fecha */} 
                  <div className="flex flex-col gap-2"> 
                    <label htmlFor="date" className="mb-1 flex items-center gap-2 text-sm font-semibold text-[#1f3557]"> 
                      <CalendarDays size={17} strokeWidth={1.8} className="text-[#004aad]" /> 
                      Fecha 
                    </label> 

                    <Field 
                      id="date" 
                      type="date" 
                      name="date" 
                      className={`${fieldClass} cursor-pointer h-12 py-0 flex items-center justify-center`} 
                    /> 

                    <ErrorMessage name="date"> 
                      {(message) => ( 
                        <p className="mt-1 text-xs font-medium text-[#a80b29]">{message}</p> 
                      )} 
                    </ErrorMessage> 
                  </div> 

                  {/* Hora */} 
                  <div className="flex flex-col gap-2"> 
                    <label htmlFor="time" className="mb-1 flex items-center gap-2 text-sm font-semibold text-[#1f3557]"> 
                      <Clock3 size={17} strokeWidth={1.8} className="text-[#004aad]" /> 
                      Hora 
                    </label> 

                    <div className="relative"> 
                      <Field 
                        as="select" 
                        id="time" 
                        name="time" 
                        className={`${fieldClass} cursor-pointer h-12 py-0 appearance-none pr-12`} 
                      > 
                        <option value="">Seleccioná una hora</option> 
                        {hours.map((hour) => ( 
                          <option value={hour} key={hour}>{hour}</option> 
                        ))} 
                      </Field> 

                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#1b2a57]"> 
                        <ChevronDown size={18} strokeWidth={2} /> 
                      </div> 
                    </div> 

                    <ErrorMessage name="time"> 
                      {(message) => ( 
                        <p className="mt-1 text-xs font-medium text-[#a80b29]">{message}</p> 
                      )} 
                    </ErrorMessage> 
                  </div> 
                </div> 
              )} 

              {/* Información adicional */} 
              <div className="flex items-start gap-3 rounded-xl bg-[#f7faff] px-4 py-3.5"> 
                <CalendarDays size={18} strokeWidth={1.8} className="mt-0.5 shrink-0 text-[#004aad]" /> 
                <p className="text-xs leading-5 text-[#68758a]"> 
                  Seleccioná la categoría y completá los campos disponibles para confirmar tu turno. Quedará registrado en tu cuenta. 
                </p> 
              </div>

              {/* Botón */}
              <button
                type="submit"
                className="
                  flex items-center justify-center gap-2.5
                  rounded-xl bg-[#004aad]!
                  px-5 py-3.5
                  text-smfont-bold text-white
                  shadow-[0_8px_20px_rgba(0,74,173,0.18)]
                  transition-all duration-200
                  hover:-translate-y-0.5 hover:bg-[#073b7a] hover:shadow-[0_12px_28px_rgba(0,74,173,0.22)]
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-[#004aad]/30"
                >
                  <Check size={18} strokeWidth={2.2} />
                  Solicitar turno
              </button>

              {/* Footer */}
              <div className="flex justify-center">
                <p className="text-center text-xs text-[#8a98aa]">
                  Podés consultar y gestionar tus turnos desde tu cuenta.
                </p>
              </div>

            </div> 
          </Form> 
        )}
      </Formik> 
    </div> 
  ); 
}

export default AppointmentForm;