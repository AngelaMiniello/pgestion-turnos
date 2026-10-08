import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { services } from "../../data/services";

function ServiceDetail() {
  const { slug } = useParams();

  const service = services.find(
    (item) => item.slug === slug
  );

  if (!service) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold">
          Servicio no encontrado
        </h2>

        <Link to="/" className="text-[#004aad]">
          Volver al inicio
        </Link>
      </div>
    );
  }

  const Icon = service.icon;

  return (
    <main className="min-h-screen bg-[#f5f6f8] px-4 py-12">
      <div className="mx-auto max-w-5xl">

        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#004aad]"
        >
          <ArrowLeft size={18} />
          Volver al inicio
        </Link>

        <div className="rounded-3xl border border-[#dce6f8] bg-white p-8 shadow-sm md:p-12">

          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e8f2ff] text-[#004aad]">
            <Icon size={32} strokeWidth={1.8} />
          </div>

          <h1 className="mb-6 text-3xl font-bold text-[#1b2a57] md:text-4xl">
            {service.title}
          </h1>

          <div className="mb-8 h-1 w-20 rounded-full bg-[#7db3ff]" />

          <p className="mb-8 text-lg leading-8 text-[#5b6472]">
            {service.longDescription}
          </p>

          <div className="mb-10">
            <h2 className="mb-5 text-2xl font-bold text-[#1b2a57]"> ¿Qué ofrece este servicio? </h2>

  <ul className="space-y-4">
    {service.features.map((feature, index) => (
      <li
        key={index}
        className="flex items-start gap-3 text-[#5b6472]"
      >
        <CheckCircle2
          size={21}
          className="mt-1 shrink-0 text-[#004aad]"
        />

        <span className="text-base leading-7">
          {feature}
        </span>
      </li>
    ))}
  </ul>
</div>

<div className="mb-10 rounded-xl bg-[#f0f6ff] p-5">
  <h3 className="mb-2 font-bold text-[#1b2a57]">
    Horarios de atención
  </h3>

  <p className="text-[#5b6472]">
    {service.schedule}
  </p>
</div>

          {service.appointmentAvailable && (
  <Link
    to="/appointments/schedule"
    className="inline-flex items-center gap-2 rounded-xl bg-[#004aad] px-6 py-3 font-semibold text-white transition hover:bg-[#073b7a]"
  >
    Solicitar turno
    <ChevronRight size={18} />
  </Link>
)}

        </div>
      </div>
    </main>
  );
}

export default ServiceDetail;