import {
  HeartPulse,
  Stethoscope,
  ScanLine,
  Activity,
  Baby,
  Brain,
  ChevronRight,
} from "lucide-react";

const services = [
  {
    id: 1,
    title: "Consultorios Externos",
    description:
      "Ofrecemos atención en múltiples consultorios con tecnología moderna y equipos interdisciplinarios.",
    icon: HeartPulse,
    featured: false,
  },
  {
    id: 2,
    title: "Servicio de Guardia",
    description:
      "Disponible las 24 horas, todo el año, con atención médica en distintas especialidades.",
    icon: Stethoscope,
    featured: false,
  },
  {
    id: 3,
    title: "Diagnóstico por Imágenes",
    description:
      "Estudios con tecnología avanzada e informes confiables para una atención precisa.",
    icon: ScanLine,
    featured: false,
  },
  {
    id: 4,
    title: "Servicio de Internación",
    description:
      "Cuidamos y acompañamos a quienes necesitan seguimiento cercano por enfermedad o cirugía.",
    icon: Activity,
    featured: false,
  },
  {
    id: 5,
    title: "Unidad Materno Infantil",
    description:
      "Acompañamos a las familias con un enfoque humano y un equipo multidisciplinario.",
    icon: Baby,
    featured: false,
  },
  {
    id: 6,
    title: "Medicina Nuclear",
    description:
      "Realizamos diagnósticos y tratamientos especializados con foco en el bienestar del paciente.",
    icon: Brain,
    featured: false,
  },
];

function ServicesSection() {
  return (
    <section className="bg-[#f5f6f8] px-4 py-16 md:px-8 lg:px-12 flex justify-center">
      <div className="w-full max-w-7xl flex flex-col gap-4">
        <div className="text-center flex flex-col items-center gap-3">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#1f4fbf]">
            Clínica Inmaculado
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight text-[#1b2a57] md:text-5xl">
            Nuestros Servicios
          </h2>
        </div>
        <div className="h-1 w-24 rounded-full bg-[#7db3ff]" />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article
        
                key={service.id}
                className={`rounded-md border p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg ${
                  service.featured
                    ? "border-[#dce6f8] bg-[#eef5fb]"
                    : "border-[#dce6f8] bg-white"
                }`}
              >
                
                <div className="mb-6">
                  <Icon className="h-10 w-10 text-[#2d43a2] pb-4" strokeWidth={1.8} />
                </div>

                <h3 className="text-2xl font-bold leading-tight text-[#1f2430] pb-4">
                  {service.title}
                </h3>

                <div className="my-5 h-px w-full bg-[#e5e7eb] " />

                <p className="text-lg leading-8 text-[#5b6472] pt-2 pb-4 ">
                  {service.description}
                </p>

                <a
                  href="#"
                  className="mt-10 inline-flex items-center gap-2 text-lg font-semibold text-[#163f9f] transition hover:gap-3"
                >
                  Ver más
                  <ChevronRight className="h-5 w-5" />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;