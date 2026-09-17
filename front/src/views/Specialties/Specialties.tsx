import { useState } from "react";
import { ChevronDown, Check, Stethoscope } from "lucide-react";

const specialties = [
  {
    id: 1,
    name: "Alergia",
    sections: [
      {
        title: "",
        description: "Diagnóstico y tratamiento de enfermedades alérgicas.",
        studies: [
          "Evaluaciones de riesgo para uso de contraste yodado.",
          "Testificación total para estudio diagnóstico",
          "Parch test para alergia cutánea"
        ]
      },
      ]
  },
  {
    id: 2,
    name: "Cardiología",
    sections: [ 
      {
        title:"Cardiología adultos",
        description: "La Cardiología se ocupa de las enfermedades del corazón y del aparato circulatorio.",
        studies: [
          "Hemodinamia e intervencionismo endovascular",
          "Electrocardiografía",
          "Ecocardiografía",
          "Doppler color",
          "Eco Stress",
          "Ergometría de 12 canales",
          "Holter de ECG 2 y 3 canales",
          "Presurometría dinámica de 24 hs",
          "Electrofisiología, implante de marcapasos, resincronizadores, cardiodefibriladores y rehabilitación cardiovascular"
        ],
      },
      {
        title:"Cardiología infantil",
        description: "La Cardiología Infantil es una especialidad médica que contempla el crecimiento y desarrollo del niño, desde su gestación – nacimiento hasta la adolescencia, evaluando la formación y funcionamiento del corazón, órgano más importante y vital para el organismo.",
        studies: [
          "Ecocardiograma doppler color (pediátrico, neonatal y fetal).",
          "Electrocardiograma"
        ],
      }
    ]
  },
  {
    id: 3,
    name: "Cirujía General",
    sections: [
      {
        title: "",
        description: "La Cirugía General comprende el tratamiento quirúrgico de patologías intraabdominales, de paredes del abdomen y proctológica.",
        studies: [
          "Interconsulta de pacientes internados pertenecientes a otro servicio.",
          "Cirugías programadas.",
          "Cirugías de urgencia."
        ],
      },
    ]
  },
  {
    id: 4,
    name: "Clínica Médica",
    sections: [
      {
        title: "",
        description: "La Clínica Médica se ocupa de la atención integral del adulto en su proceso salud-enfermedad, enfocada en la prevención, diagnóstico y tratamiento de las patologías médicas (no quirúrgicas) prevalentes en el ámbito ambulatorio y fundamentalmente,  durante la internación, hasta la rehabilitación total o parcial del mismo.",
        studies: [
          "Atención a pacientes a través de Consultorios Externos de la Especialidad.",
          "Servicios médicos a todos los pacientes internados."
        ],
      },
    ]
  },
  {
    id: 5,
    name: "Dermatología",
    sections: [
      {
        title: "",
        description: "La Dermatología es la especialidad médica encargada del estudio de la estructura y función de la piel, así como de las enfermedades que le afectan, ofreciendo su prevención, diagnóstico y tratamiento.",
        studies: [
          "Prácticas ambulatorias como biopsias y destrucción de lesiones benignas por diferentes métodos.",
          "Criocirugía: La crio-cirugía es un método que se utiliza en dermatología para el tratamiento de múltiples lesiones benignas y malignas de piel y mucosas. Esta técnica produce la destrucción  selectiva del tejido, utilizando temperaturas de congelación, con un criógeno que generalmente es el nitrógeno líquido que se encuentra a temperatura de -196ºC. Se trata de un tratamiento de ejecución rápida y ambulatoria, que permite tratar múltiples lesiones en una sesión. Brinda la posibilidad de reiterar las aplicaciones y en la mayoría de los casos, se prescinde de cualquier tipo de anestesia. Es una valiosa alternativa frente a clásicos procedimientos como un electro-coagulación, o la cirugía convencional, privilegiando su uso en niños, ancianos, mujeres embarazadas y casos de alto riesgo quirúrgico, alergia por anestésicos, pacientes con marcapasos, o lesiones previamente irradiadas. Las lesiones pasibles de este tratamiento son múltiples: verrugas, condilomas, queratosis actínicas, queratosis seborreicas, lentigos solares, acrocordones, moluscos contagiosos, entre otros."
        ],
      },
    ]
  },
  {
    id: 6,
    name: "Diabetología",
    sections: [
      {
        title: "",
        description: "El servicio de diabetología está enfocado en brindar un manejo integral y personalizado de la diabetes. Contamos con un equipo de profesionales altamente capacitados que se encargan de la prevención, diagnóstico, tratamiento y seguimiento de esta condición. Nos especializamos en diseñar planes de cuidado adaptados a las necesidades de cada paciente, con el objetivo de mejorar su calidad de vida y prevenir complicaciones. Además, ofrecemos orientación sobre hábitos saludables, control de la alimentación y técnicas de autocontrol, todo en un ambiente de confianza y apoyo continuo.",
        studies: [
          "Glucemia",
          "Insulinemia",
          "Hemograma",
          "Hepatograma",
          "Anticuerpos para enfermedad celíaca",
          "Examen de orina",
        ],
      },
    ]
  },
  {
    id: 7,
    name: "Fonoaudiología",
    sections: [
      {
        title: "",
        description: "La audición es fundamental para el desarrollo lingüístico, cognitivo, social y psicoemocional en todas las etapas de la vida. Su detección y diagnostico es el objetivo de este servicio.",
        studies: [
          "Audiometría",
          "Impedanciometría",
          "Logoaudiometría",
          "Pruebas supraliminares",
          "Timpanometría",
        ],
      },
    ]
  },
  {
    id: 8,
    name: "Gastroenterología",
    sections: [
      {
        title: "",
        description: "Es una especialidad clínica que se ocupa de las enfermedades del aparato digestivo y órganos asociados, conformado por: esófago, estómago, hígado y vías biliares, páncreas, intestino delgado, colon y recto.",
        studies: [
          "La endoscopia digestiva es una practica que permite poder realizar diagnostico y tratamiento de la enfermedades que comprometen al aparato digestivo alto y bajo, logrando poder realizar diagnostico precoz de la enfermedad oncológica.",
          "La cápsula endoscópica es un procedimiento mediante el cual una pequeña cámara inalámbrica obtiene imágenes de los órganos por los que pasan los alimentos y líquidos.La cámara de la cápsula endoscópica se encuentra en una cápsula del tamaño de una vitamina. Después de tragarla, esta viaja por el tracto digestivo. La cámara obtiene cientos de imágenes que se envían a una grabadora que se coloca alrededor de la cintura. La cápsula endoscópica muestra el interior del intestino delgado. No es una zona a la que se pueda acceder fácilmente con otros procedimientos endoscópicos, que estudian el estomago y esofago, y el colon y recto."
        ],
      },
    ]
  },
  {
    id: 9,
    name: "Ginecología",
    sections: [
      {
        title: "",
        description: "El Servicio de Ginecología brinda atención de Ginecología General y subespecialidades: Patología cervical Climaterio, Gineco- Endocrinología, Esterilidad, Patología Mamaria, Gineco-Oncología y Planificación Familiar.",
        studies: [
          "Cirugía mamaria.",
          "Colposcopia.",
          "Cirugía Ginecológica,  Abdomino-Previana, Vaginal, Histeroscópica y laparoscópica.",
        ],
      },
    ]
  },
  {
    id: 10,
    name: "Infectología",
    sections: [
      {
        title: "",
        description: "La especialidad Infectología, es una rama de la Medicina Interna que se ocupa de la prevención, diagnóstico y tratamiento de las enfermedades infectocontagiosas provocadas por bacterias, virus, hongos ó parásitos.",
        studies: [
          "Medicina del Viajero (medidas de prevención, vacunación, consultas pre y post viaje)",
          "Infecciones agudas y crónicas",
          "Asesoría en vacunación (pacientes adultos con o sin enfermedades predisponentes)",
        ],
      },
    ]
  },
   {
    id: 11,
    name: "Neurocirugía",
    sections: [
      {
        title: "",
        description: "En el Servicio de Neurocirugía de adultos (mayores de 16 años) se atienden pacientes con patología quirúrgica cerebral, como así también patología de columna vertebral.  Es un Servicio que se destaca por realizar procedimientos mínimamente invasivos en ambas subespecialidades, además de la neurocirugía convencional.",
        studies: [
          "Entre las patologías de cerebro que se realizan podemos nombrar a los tumores de hipófisis, meningiomas, neurinomas del acústico, hidrocefalia, neurooncología quirúrgica en general, aneurismas y otras enfermedades vasculares, entre otras.",
          "En las patologías de columna vertebral podemos destacar el tratamiento del dolor lumbar, hernias de discos, canal estrecho raquideo, tumores del raquis, etc."
        ],
      },
    ]
  },
  {
    id: 12,
    name: "Nutrición",
    sections: [
      {
        title: "",
        description: "La Nutrición se ocupa de la realización de planes de alimentación individuales de acuerdo a la patología de cada paciente. Este Servicio realiza  tratamientos dietológicos individuales adaptados a la patología, edad, gustos y hábitos de los pacientes, acompañando los planes con educación alimentaria. Es conveniente que los pacientes acudan derivados por especialidades con análisis de laboratorio.",
        studies: [
          "Tratamientos dietológicos individuales.",
          "Participación en el equipo de Cirugía Bariátrica."
        ],
      },
    ]
  },
  {
    id: 13,
    name: "Oftalmología",
    sections: [
      {
        title: "Oftalmología Adultos",
        description: "Busca prevenir y tratar, clínica o quirúrgicamente las enfermedades oculares y sus anexos. El ojo humano es el responsable de la captación de sensaciones luminosas que nos informan sobre el tamaño, forma, color y distancia a la que se encuentran los objetos que nos rodean. El buen funcionamiento del sistema visual, es lo que nos permite desarrollar nuestras actividades individuales.",
        studies: [
          "Examen de la Agudeza Visual con la prescripción o no de anteojos, Biomicroscopía, Tonometría o toma de la Presión ocular, Examen de la motilidad ocular, de los párpados y conjuntiva y fondo de ojos.",
          "Fondo de ojos con Oftalmoscopio Binocular Indirecto (OBI).",
          "Topografía Corneal."
        ],
      },
      {
        title: "Oftalmología Infantil",
        description: "Se dedica al diagnóstico y tratamiento de patologías oculares en los niños.",
        studies: [
          "Test de Visión de Colores",
          "Fondo de ojos con Oftalmoscopio Binocular Indirecto (OBI).",
          "Topografía Corneal.",
          "Agudeza visual",
        ],
      },
    ]
  },
  {
    id: 14,
    name: "Otorrinolaringología",
    sections: [
      {
        title: "",
        description: "Se realizan todas las prácticas ambulatorias y cirugías rinosinusales, laríngeas, faríngeas y otológicas. Además, el servicio cuenta con equipos de última generación tanto en lo ambulatorio como en cirugía.",
        studies: [
          "Consulta general y especializada.",
          "Alteraciones y atención de la voz profesional.",
          "Estudio diagnóstico en Roncopatías."
        ],
      },
    ]
  },
   {
    id: 15,
    name: "Pediatría",
    sections: [
      {
        title: "",
        description: "El Servicio de Pediatría brinda atención para seguimiento y control de pacientes pediátricos por demanda espontánea y/o derivada por guardia u otras instituciones. Así mismo, se brinda servicio de Internación por patologías Clínicas o Quirúrgicas (programadas o de urgencia).",
        studies: [],
      },
    ]
  },
  {
    id: 16,
    name: "Traumatología y Ortopedia",
    sections: [
      {
        title: "",
        description: " El Servicio de Traumatología  se ocupa del tratamiento clínico y quirúrgico de las enfermedades del aparato ósteo-muscular. El equipo médico está compuesto por especialidades, en respuesta a las distintas patologías.",
        studies: [],
      },
    ]
  },
  {
    id: 17,
    name: "Urología",
    sections: [
      {
        title: "",
        description: "El Servicio de Urología se desempeña en la atención de las vías genitourinarias.",
        studies: [],
      },
    ]
  },
];

function Specialties() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return ( 
    <section className="flex w-full justify-center bg-[#f5f6f8] px-5 py-16 sm:px-6 lg:px-8 lg:py-20"> 
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4"> 
        
        {/* Header */} 
        <div className="flex flex-col items-center gap-3 text-center"> 
          <span className="mb-8 rounded-full bg-[#e8f2ff] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#004aad]"> 
            Clínica Inmaculado 
          </span> 
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#073b7a] sm:text-5xl"> 
            Especialidades Médicas 
          </h2> 
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#68758a] sm:text-lg"> 
            Contamos con profesionales especializados para acompañarte en cada etapa de tu cuidado. 
          </p> 
        </div> 
        
        {/* Separador */} 
        <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-[#a80b29]" /> 
        
        {/* Especialidades */} 
        <div className="mx-auto mt-10 w-full max-w-5xl space-y-3"> 
          {specialties.map((item) => { const isOpen = openId === item.id; 
          
          return ( 
            <article 
              key={item.id} 
              className={` overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${ 
                isOpen ? "border-[#cfe0f7] shadow-[0_12px_35px_rgba(0,55,120,0.10)]" 
                : "border-[#e5eaf1] shadow-[0_4px_15px_rgba(0,55,120,0.04)] hover:border-[#d3e2f5] hover:shadow-[0_8px_25px_rgba(0,55,120,0.08)]" 
              } `} 
            > 
              
              {/* Botón */} 
              <button 
                type="button" 
                onClick={() => toggle(item.id)} 
                aria-expanded={isOpen} 
                className=" flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors duration-200 hover:bg-[#f8fbff] sm:px-7"
              > 
                
                <div className="flex min-w-0 items-center gap-4">   
                  {/* Icono */} 
                  <div className={` flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${ 
                  isOpen ? "bg-[#004aad] text-white" 
                  : "bg-[#e8f2ff] text-[#004aad]"
                } `} > 
                  <Stethoscope size={20} strokeWidth={2} /> 
                  </div> 
                
                  {/* Nombre */} 
                  <span className={` text-base font-semibold transition-colors duration-200 sm:text-lg ${ 
                  isOpen ? "text-[#004aad]" 
                  : "text-[#1f3557]" 
                } `} > 
                  {item.name} 
                  </span> 
                </div> 
                
                {/* Chevron */} 
                <div className={` flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${ 
                  isOpen ? "bg-[#e8f2ff] text-[#004aad]" 
                  : "bg-[#f5f7fa] text-[#68758a]" 
                } `} > 
                  <ChevronDown size={19} className={`transition-transform duration-300 ${ isOpen ? "rotate-180" : "" }`} /> 
                </div> 
              </button> 
                
                {/* Contenido */} 
                {isOpen && ( 
                  <div className="border-t border-[#edf1f6] bg-[#fbfdff] px-5 pb-7 pt-6 sm:px-7"> 
                    <div className="space-y-8"> 
                      {item.sections.map((section, index) => ( 
                        <div key={index} className="space-y-4"> 
              
                          {/* Título de sección */} 
                          {section.title && ( 
                            <h3 className="text-lg font-bold text-[#073b7a] sm:text-xl"> 
                          {section.title}
                            </h3> )} 
                        
                            {/* Descripción */} 
                            <p className="text-sm leading-7 text-[#68758a] sm:text-base"> 
                          {section.description} 
                            </p> 
                        
                            {/* Estudios */} 
                            {section.studies.length > 0 && ( 
                          <div> 
                            <p className="mb-4 text-xs font-bold uppercase tracking-wider text-[#004aad]"> 
                              Prácticas y estudios 
                            </p> 
                            <ul className="space-y-3"> 
                              {section.studies.map((study, i) => ( 
                                <li key={i} className="flex items-start gap-3 text-sm leading-6 text-[#4b5563] sm:text-[15px]" > 
                                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e8f2ff] text-[#004aad]"> 
                                    <Check size={13} strokeWidth={2.5} /> 
                                  </span> 
                                  <span>{study}</span> 
                                </li> 
                              ))}
                            </ul> 
                          </div> 
                            )} 
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

export default Specialties;