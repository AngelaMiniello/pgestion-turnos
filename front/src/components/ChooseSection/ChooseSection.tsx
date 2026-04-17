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
    image: "public/assets/img/personalizada.png"
  },
  {
    id: 2,
    title: "Tecnología",
    description:
      "Contamos con equipamiento moderno que permite diagnósticos rápidos y precisos.",
    icon: Monitor,
    image: "public/assets/img/Tecnología.png"
  },
  {
    id: 3,
    title: "Calidad",
    description:
      "Trabajamos con altos estándares para garantizar resultados confiables y seguros.",
    icon: ShieldCheck,
    image: "public/assets/img/Calidad.png"
  },
  {
    id: 4,
    title: "Atención Digital",
    description:
      "Accedé a turnos, estudios y resultados desde nuestra plataforma online.",
    icon: Smartphone,
    image: "public/assets/img/Digital.png"
  },
  {
    id: 5,
    title: "Laboratorios",
    description:
      "Análisis clínicos con tecnología avanzada para mayor precisión.",
    icon: FlaskConical,
    image: "public/assets/img/Laboratorios.png"
  },
  {
    id: 6,
    title: "Equipo de Profesionales",
    description:
      "Equipo médico altamente capacitado en múltiples especialidades.",
    icon: Users,
    image: "public/assets/img/Equipo.png"
  }
];

function ChooseSection() {
  return (
    <section className="bg-white py-20 px-4 flex justify-center">
      <div className="w-full max-w-6xl flex flex-col gap-4">
        
        {/* Header */}
        <div className="text-center mb-14 flex flex-col gap-3">
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-[#1b2a57] md:text-5xl">
            ¿Por qué elegirnos?
          </h2>

          <p className="mt-3 text-[#6b7280] text-lg italic">
            Queremos verte bien
          </p>

          <div className="mx-auto mt-4 h-1 w-16 bg-[#e63946] rounded-full" />
        </div>

        {/* Grid */}
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 ">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.id}
                className="flex flex-col items-center text-center"
              >
                {/* Image */}
                <div className="mb-5 w-80 h-60 overflow-hidden rounded-md shadow-md pt-2">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-[#1f2430] pt-4">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-lg leading-8 text-[#5b6472] pt-4">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ChooseSection;