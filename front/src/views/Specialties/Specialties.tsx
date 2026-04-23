import { useState } from "react";
import { ChevronRight, Check } from "lucide-react";

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
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="px-4 md:px-6 py-10 md:py-16 bg-[#f5f6f8] flex justify-center">
      <div className="w-full max-w-4xl mx-auto">
        
        {/* Título */}
        <h2 className="text-xl md:text-3xl font-bold text-[#1b2a57] mb-6 md:mb-8 flex justify-start pb-4 md:pb-8">
          Especialidades Médicas
        </h2>

        {/* Lista */}
        <div className="space-y-3">
          {specialties.map((item) => {
            const isOpen = openId === item.id;

            return (
              <div key={item.id} className="pb-3 pt-3">
                
                {/* Botón */}
                <button
                  onClick={() => toggle(item.id)}
                  className="flex items-center gap-2 text-left w-full text-[#4b5563] text-sm md:text-base font-medium bg-transparent hover:border-[#1b2a57]"
                >
                  <ChevronRight
                    className={`transition-transform duration-300 ${
                      isOpen ? "rotate-90" : ""
                    }`}
                  />
                  {item.name}
                </button>

                {isOpen && (
                  <div className="mt-3 md:mt-4 ml-2 md:ml-6 space-y-4 md:space-y-6">

                    {item.sections.map((section, index) => (
                    <div key={index} className="space-y-3">

                      {/* Título */}
                      <h4 className="font-semibold text-sm md:text-base pt-4 md:pt-6">
                        {section.title}
                      </h4>

                      {/* Descripción */}
                      <p className="text-xs md:text-sm text-gray-600 leading-relaxed pt-2 md:pt-3">
                       {section.description}
                      </p>

                      {/* Lista */}
        <ul className="space-y-2 pt-2 md:pt-3">
          {section.studies.map((study, i) => (
            <li key={i} className="flex gap-2 text-xs md:text-sm">
              <Check className="w-4 h-4 mt-1 shrink-0"/> {study}
            </li>
          ))}
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

export default Specialties;