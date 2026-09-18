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
     const [openId, setOpenId] = useState<number | null>(null);

  const toggle = (id: number)  => {
    setOpenId(openId === id ? null : id);
  };

   return (
      <section  className="box-border flex w-full justify-center bg-[#f5f6f8] px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4">
          
          {/* Header */} 
          <div className="flex flex-col items-center gap-3 text-center"> 
            <span className="mb-8 rounded-full bg-[#e8f2ff] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#004aad]"> 
              Clínica Inmaculado 
            </span>
            {/* Título */}
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#073b7a] sm:text-5xl">
              Estudios y Prácticas
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#68758a] sm:text-lg"> 
            Contamos con una gran variedad de estudios y prácticas <br/> que puede realizarse en nuestro establecimiento. 
            </p> 
          </div> 

          {/* Separador */} 
          <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-[#a80b29]" /> 

          {/* Lista */}
          <div className="mx-auto mt-10 w-full max-w-5xl space-y-3">
            {studies.map((item) => {
              const isOpen = openId === item.id;
  
              return (
                <article 
                  key={item.id} 
                  className={` overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${ 
                    isOpen ? "shadow-[0_12px_35px_rgba(0,55,120,0.10)]" 
                    : "shadow-[0_4px_15px_rgba(0,55,120,0.04)]" 
                  } `} 
                >
                  
                  {/* Botón */}
                  <button
                    type="button" 
                    onClick={() => toggle(item.id)}
                    aria-expanded={isOpen} 
                    className="flex w-full 
                      items-center justify-between 
                      gap-4 rounded-2xl 
                      px-5 py-5 
                      border-0 bg-transparent 
                      text-left outline-none 
                      transition-colors duration-200 
                     hover:bg-[#f8fbff] focus:outline-none 
                      focus-visible:outline-none sm:px-7"
                  >
                    <ChevronRight
                      size={19} 
                      className={`transition-transform duration-300 ${ isOpen ? "rotate-180" : "" }`} 
                    />
                    <span 
                      className={` text-base font-semibold transition-colors duration-200 sm:text-lg ${ 
                        isOpen ? "text-[#004aad]" 
                        : "text-[#1f3557]" 
                      } `} 
                    >
                      {item.name}
                    </span>
                  </button>
  
                  {isOpen && (
                    <div className="border-t border-[#edf1f6] bg-[#fbfdff] px-5 pb-7 pt-6 sm:px-7 gap-4">
                      <div className="space-y-8"> 
                        {item.sections.map((section, index) => (
                          <div key={index} className="space-y-4">
  
                            {/* Título */}
                            <h3 className="text-lg font-bold text-[#073b7a] sm:text-xl">
                              {item.name}
                            </h3>
  
                            {/* Lista */}
                            <ul className="space-y-2 pt-2 md:pt-3">
                            {section.practices.map((study, i) => (
                              <li key={i} className="flex gap-2 text-sm">
                                <Check className="w-4 h-4 mt-0.5"/> {study}
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
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>
    );
  }
  
  export default Studies;
