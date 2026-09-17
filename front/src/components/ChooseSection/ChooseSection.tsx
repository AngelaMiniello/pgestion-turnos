import {
  HeartPulse,
  Monitor,
  ShieldCheck,
  Smartphone,
  FlaskConical,
  Users
} from "lucide-react";

const features = [
  {
    id: 1,
    title: "Atención personalizada",
    description:
      "Acompañamos a cada paciente de manera cercana, brindando contención y seguimiento en cada etapa.",
    icon: HeartPulse,
    image: "/assets/img/personalizada.png"
  },
  {
    id: 2,
    title: "Tecnología",
    description:
      "Contamos con equipamiento moderno que permite diagnósticos rápidos y precisos.",
    icon: Monitor,
    image: "/assets/img/Tecnología.png"
  },
  {
    id: 3,
    title: "Calidad",
    description:
      "Trabajamos con altos estándares para garantizar resultados confiables y seguros.",
    icon: ShieldCheck,
    image: "/assets/img/Calidad.png"
  },
  {
    id: 4,
    title: "Atención Digital",
    description:
      "Accedé a turnos, estudios y resultados desde nuestra plataforma online.",
    icon: Smartphone,
    image: "/assets/img/Digital.png"
  },
  {
    id: 5,
    title: "Laboratorios",
    description:
      "Análisis clínicos con tecnología avanzada para mayor precisión.",
    icon: FlaskConical,
    image: "/assets/img/Laboratorios.png"
  },
  {
    id: 6,
    title: "Equipo de Profesionales",
    description:
      "Equipo médico altamente capacitado en múltiples especialidades.",
    icon: Users,
    image: "/assets/img/Equipo.png"
  }
];

function ChooseSection() {
  return (
    <section className="bg-[#f7faff] py-20 px-5 sm:px-6 lg:px-8 lg:py-24 w-full">
      <div className="mx-auto w-full max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-14 flex flex-col items-center">
          <span className="mb-3 rounded-full bg-[#e8f2ff] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#004aad]"> 
            Nuestra propuesta 
          </span>

          <h2 className="m-0 text-4xl font-bold leading-tight tracking-tight text-[#073b7a] sm:text-5xl">
            ¿Por qué elegirnos?
          </h2>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#68758a] sm:text-lg">
            Queremos verte bien
          </p>

          <div className="mt-5 h-1 w-14 rounded-full bg-[#a80b29]" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.id}
                className="
                  group 
                  overflow-hidden 
                  rounded-2xl border border-[#e7edf5] 
                  bg-white shadow-[0_8px_25px_rgba(0,55,120,0.06)] 
                  transition-all duration-300 hover:-translate-y-2 
                  hover:border-[#d7e5f8] hover:shadow-[0_18px_40px_rgba(0,55,120,0.13)]"
              >
                {/* Image */}
                <div className="relative h-52 w-full overflow-hidden bg-[#eaf2fb]">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Icono */} 
                  <div className="
                    absolute 
                    bottom-0 left-5 flex h-12 w-12 
                    items-center justify-center 
                    rounded-t-xl 
                    bg-white 
                    text-[#004aad] 
                    shadow-[0_-4px_15px_rgba(0,40,100,0.08)] " 
                  > 
                    <Icon size={22} strokeWidth={2} /> 
                  </div>
                </div>


                {/* Content */} 
                <div className="px-6 pb-7 pt-6"> 
                  <h3 className="text-xl font-bold leading-snug text-[#1f3557]"> 
                    {feature.title} 
                  </h3> 
                  <p className="mt-3 text-[15px] leading-7 text-[#68758a]"> 
                    {feature.description} 
                  </p> 
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ChooseSection;