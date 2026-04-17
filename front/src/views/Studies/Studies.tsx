import { useState } from "react";
import { ChevronRight, Check, Quote } from "lucide-react";

const studies = [
  {
    id: 1,
    name: "Estudios y prácticas de Consultorios Externos",
    sections: 
    [{
    practices: [
        "Campo visual",
        "Fondo de ojos",
        "Papanicolau y colposcopia",
        "Biospsias",
        "Monitoreos fetales",
        "Electrocardiograma",
        "Riesgo quirurgico",
        "Ecodoppler cardiaco",
        "Holter",
        "Electroencefalogramas*",
        "Impedanciometria",
        "Practicas dermatológicas",
        "Practicas ginecológicas",
    ],
    highlight: {
        title:"Solicitud de turno",
        text: "Todas las Prácticas se realizan en consultorios externos. Para solicitar un turno podes hacerlo desde nuestra Central de Atención Telefónica: 011-1111-1111 o también podes solicitar un turno de manera presencial en nuestra sede acercandore al “Stand de turnos”.",
    },
   }]

  },
  {
    id: 2,
    name: "Estudios y prácticas de Diagnóstico por Imágenes",
    sections: 
    [{
    practices: [
        "Resonancias Magnéticas nucleares",
        "Tomografías computadas",
        "Mamografía",
        "Ecografías",
        "Eco-Doppler",
        "Densitometría",
        "Medicina Nuclear",
        "Radiología (sin turno previo)",
    ],
    highlight: {
        title:"Solicitud de turno",
        text: "Todas las Prácticas se realizan en consultorios externos. Para solicitar un turno podes hacerlo desde nuestra Central de Atención Telefónica: 011-1111-1111 o también podes solicitar un turno de manera presencial en nuestra sede acercandore al “Stand de turnos”.",
    },
    }]
  },
  {
    id: 3,
    name: "Estudios y prácticas de Endoscopía Digestiva",
     sections: 
    [{
    practices: [
        "Veda (Videoendoscopia alta diagnóstica y terapéutica)",
        "Endoscopia",
    ],
    highlight: {
        title:"Solicitud de turno",
        text: "Para poder realizar alguno de estos estudios en Casa Hospital, previamente debes realizar una consulta con un gastroenterólogo de nuestras sedes ya que el mismo lleva preparación previa, que coordina el doctor en dicha consulta y evaluar si requiere de riesgo quirúrgico.En caso que ya tengas la consulta previa hecha,  podes hacerlo desde nuestra Central de Atención Telefónica: 011-1111-1111 o también podes solicitar un turno de manera presencial en nuestra sede acercandore al “Stand de turnos”.",
    },
     }]
  },
   {
    id: 4,
    name: "Estudios y prácticas de Endoscopía Digestiva",
      sections: 
    [{
    practices: [
        "Análisis de Sangre",
        "Hemograma",
         "Plaquetas",
        "Glucosa",
         "Ácido Úrico",
        "Colesterol Total",
         "Triglicéridos",
        "Hepatograma",
         "T4 libre",
        "Coagulación",
    ],
    highlight: {
        title:"Solicitud de turno",
        text: "En ambas sedes podes venir sin turno previo para la mayoría de nuestros estudios. Tene presente que algunos estudios especiales pueden requerir un día y horario en particular (como Hemostasia o Estudios genéticos), por lo que te recomendamos contactarte siempre con nosotros para averiguar si tu estudio requiere de autorización previa, indicaciones y preparación previa",
    },
      }]
  },
]

function Studies() {
     const [openId, setOpenId] = useState(null);

  const toggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

   return (
      <section className="px-6 py-16 bg-[#f5f6f8] flex justify-center min-w-3xl min-h-screen">
        <div className="min-w-4xl max-w-4xl mx-auto">
          
          {/* Título */}
          <h2 className="text-3xl font-bold text-[#1b2a57] mb-8 flex justify-start pb-8">
            Especialidades Médicas
          </h2>
  
          {/* Lista */}
          <div className="space-y-3">
            {studies.map((item) => {
              const isOpen = openId === item.id;
  
              return (
                <div key={item.id} className="pb-3 pt-3">
                  
                  {/* Botón */}
                  <button
                    onClick={() => toggle(item.id)}
                    className="flex items-center gap-2 text-left w-full text-[#4b5563] font-medium bg-transparent hover:border-[#1b2a57]"
                  >
                    <ChevronRight
                      className={`transition-transform duration-300 ${
                        isOpen ? "rotate-90" : ""
                      }`}
                    />
                    {item.name}
                  </button>
  
                  {isOpen && (
                    <div className="mt-4 ml-6 space-y-6">
  
                      {item.sections.map((section, index) => (
                      <div key={index} className="space-y-3">
  
                        {/* Título */}
                        <h4 className="font-semibold text-s pt-3">
                          {section.practices}
                        </h4>
  
  {/* Lista */}
        <ul className="space-y-2 pt-3">
          {section.practices.map((study, i) => (
            <li key={i} className="flex gap-2 text-sm">
              <Check size={15}/> {study}
            </li>
          ))}
        </ul>
                       
          {/* Lista */}
          <ul className="space-y-2 pt-3">
            {section.highlight && (
  <blockquote className="bg-[#e6f0ff] border-l-4 border-[#1f4fbf] p-4 rounded-md flex gap-2">
  <Quote className="w-5 h-5 text-[#1f4fbf]" />
  <p className="text-sm">{section.highlight.text}</p>
</blockquote>
)}
          </ul>
  
        </div>
      ))}
  
    </div>
  )}
                </div>
              );
            })}
          </div>
  
        </div>
      </section>
    );
  }
  
  export default Studies;
