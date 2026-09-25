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
  const [practices, setPractices] = useState([]);

  // Estado para simular la grilla de turnos disponibles según la imagen de referencia
  const [availableSlots, setAvailableSlots] = useState([]);
  const [hours, setHours] = useState([]);

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
  
      // Cargar prácticas desde el backend (conectado a tu tabla practice)
    axios.get('http://localhost:3000/practices')
      .then(response => setPractices(response.data))
      .catch(error => console.error("Error cargando prácticas", error));
  }, []);

  // Función que se dispara al hacer clic en un día del calendario
  const handleDateSelection = async (selectedDate, setFieldValue, values) => {
    setFieldValue("date", selectedDate);
    setFieldValue("time", ""); // Reseteamos la hora elegida previamente

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/appointments/available`,
        {
          params: {
            date: selectedDate,
            especialidad: values.especialidad,
            practica: values.practica,
            medico: values.medico
          }
        }
      );

      // Guardamos los turnos disponibles en el estado para poblar la tabla de la derecha
      setAvailableSlots(response.data);
      
    } catch (error) {
      console.error("Error al obtener turnos disponibles", error);
      setAvailableSlots([]);
    }
  };
    
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
                    setFieldValue("tipo", e.target.value);
                    setFieldValue("especialidad", "");
                    setFieldValue("practica", "");
                    setFieldValue("date", "");
                    setFieldValue("time", "");
                    setAvailableSlots([]);
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
              {values.tipo === "practice" && ( 
                <div className="flex flex-col gap-2 animate-fadeIn"> 
                  <label htmlFor="practice" className="mb-1 flex items-center gap-2 text-sm font-semibold text-[#1f3557]"> 
                    <Activity size={17} strokeWidth={1.8} className="text-[#004aad]" /> 
                    Práctica o Estudio 
                  </label> 

                  <div className="relative"> 
                    <Field 
                      as="select" 
                      id="practice" 
                      name="practice" 
                      className={`${fieldClass} cursor-pointer h-12 py-0 appearance-none pr-12`}
                    > 
                      <option value="">Seleccioná una práctica</option> 
                      {practices.map((prac) => ( 
                        <option value={prac.name} key={prac.id}>{prac.name}</option> 
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

                      {/* Opción para ver o seleccionar todos / cualquiera */}
                      <option value="">Cualquier profesional disponible</option> 

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

              {/* PASO 4: Fecha y Hora (Aparecen al elegir especialidad o práctica) */} 
              {/* SECCIÓN PRINCIPAL: Calendario a la izquierda y Tabla de turnos a la derecha */}
              {((values.tipo === "especialidad" && values.especialidad) || (values.tipo === "practica" && values.practica)) && (
                <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 border-t border-slate-100 animate-fadeIn">
                  
                  {/* CALENDARIO ESTILO DOCTORALIA (Izquierda - 4 columnas) */}
                  <div className="lg:col-span-5 rounded-2xl border border-slate-200 p-5 bg-slate-50/50 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-[#073b7a] text-base">Septiembre 2026</h3>
                        <div className="flex gap-1">
                          <button type="button" className="p-1.5 rounded-lg border bg-white hover:bg-slate-100"><ChevronLeft size={16}/></button>
                          <button type="button" className="p-1.5 rounded-lg border bg-white hover:bg-slate-100"><ChevronRight size={16}/></button>
                        </div>
                      </div>

                      {/* Días de la semana */}
                      <div className="grid grid-cols-7 text-center text-xs font-bold text-slate-400 mb-2">
                        <span>D</span><span>L</span><span>M</span><span>M</span><span>J</span><span>V</span><span>S</span>
                      </div>

                      {/* Días del mes (Simulación interactiva de selección de fecha) */}
                      <div className="grid grid-cols-7 gap-1 text-center text-sm">
                        {[...Array(30)].map((_, i) => {
                          const dayNum = i + 1;
                          const formattedDate = `2026-09-${dayNum < 10 ? '0' + dayNum : dayNum}`;
                          const isSelected = values.date === formattedDate;

                          return (
                            <button
                              key={i}
                              type="button"
                              onClick={() => handleDateSelection(formattedDate, setFieldValue)}
                              className={`h-9 w-9 mx-auto rounded-xl flex items-center justify-center font-medium transition-all ${
                                isSelected 
                                  ? 'bg-[#004aad] text-white shadow-md' 
                                  : 'hover:bg-blue-100 text-slate-700'
                              }`}
                            >
                              {dayNum}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mt-6 text-xs text-slate-500 pt-3 border-t border-slate-200">
                      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span> Disponible</span>
                      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-400 inline-block"></span> Feriado</span>
                    </div>
                  </div>

                  {/* TABLA DE HORARIOS DISPONIBLES (Derecha - 7 columnas) */}
                  <div className="lg:col-span-7 flex flex-col">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        {values.date ? `Fecha seleccionada: ${values.date}` : "Seleccioná una fecha en el calendario"}
                      </span>
                    </div>

                    <div className="border border-slate-200 rounded-2xl overflow-hidden flex-1 bg-white">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-100 text-slate-600 text-xs border-b border-slate-200">
                            <th className="p-3 font-semibold">Hora</th>
                            <th className="p-3 font-semibold">Profesional</th>
                            <th className="p-3 font-semibold">Especialidad</th>
                            <th className="p-3 font-semibold">Centro Atención</th>
                          </tr>
                        </thead>
                        <tbody className="text-xs text-slate-700 divide-y divide-slate-100">
                          {values.date && availableSlots.length > 0 ? (
                            availableSlots.map((slot) => {
                              const isSlotSelected = values.time === slot.time;
                              return (
                                <tr 
                                  key={slot.id} 
                                  onClick={() => setFieldValue("time", slot.time)}
                                  className={`cursor-pointer transition-colors ${isSlotSelected ? 'bg-blue-50 font-bold text-[#004aad]' : 'hover:bg-slate-50'}`}
                                >
                                  <td className="p-3 flex items-center gap-1.5">
                                    <Clock3 size={14} className="text-[#004aad]" />
                                    {slot.time}
                                  </td>
                                  <td className="p-3">{slot.profesional}</td>
                                  <td className="p-3">{slot.especialidade}</td>
                                  <td className="p-3">{slot.centro}</td>
                                </tr>
                              );
                            })
                          ) : (
                            <tr>
                              <td colSpan="4" className="p-8 text-center text-slate-400">
                                {values.date ? "No hay turnos disponibles para esta fecha." : "Hacé clic en un día del calendario para ver los turnos disponibles."}
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* Hora seleccionada y botón de confirmación final */}
                    {values.time && (
                      <div className="mt-4 flex items-center justify-between bg-blue-50/70 border border-blue-100 p-4 rounded-xl animate-fadeIn">
                        <div>
                          <p className="text-xs text-slate-500">Turno seleccionado:</p>
                          <p className="text-sm font-bold text-[#004aad]">{values.date} a las {values.time} hs</p>
                        </div>
                        <button
                          type="submit"
                          className="flex items-center gap-2 rounded-xl bg-[#004aad] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#073b7a] transition-all"
                        >
                          <Check size={16} strokeWidth={2.5} />
                          Confirmar Turno
                        </button>
                      </div>
                    )}
                  </div>

                </div>
              )}

            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AppointmentForm;