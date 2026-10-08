import {  HeartPulse,  Stethoscope,  ScanLine,  Activity,  Baby,  Brain,  ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { services } from "../../data/services.js";

function ServicesSection() {
  return (
    <section className="bg-[#f5f6f8] px-4 py-16 md:px-8 lg:px-12 flex justify-center">
      <div className="w-full max-w-7xl flex flex-col gap-4">
        <div className="text-center flex flex-col items-center gap-3">
          <p className="mb-10 rounded-full bg-[#e8f2ff] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#004aad]">
            Clínica Inmaculado
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight text-[#1b2a57] md:text-5xl sm:text-5xl">
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
                className={`rounded-xl border p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg ${
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

                <Link
                  to={`/servicios/${service.slug}`}
                  className="mt-10 inline-flex items-center gap-2 text-lg font-semibold text-[#163f9f] transition hover:gap-3"
                >
                  Ver más
                  <ChevronRight className="h-5 w-5" />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;