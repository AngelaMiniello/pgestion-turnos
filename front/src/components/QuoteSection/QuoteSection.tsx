function QuoteSection() {
  return (
    <section className="relative overflow-hidden bg-[#f7faff] px-5 py-24 sm:px-8 lg:py-28">
      {/* Decoración */}
      <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[#e8f2ff] opacity-70" />
      <div className="absolute -bottom-32 -right-20 h-72 w-72 rounded-full bg-[#e8f2ff] opacity-60" />

      <div className="relative mx-auto max-w-4xl text-center">

      {/* Comilla */}
      <div className="mb-6 text-7xl font-serif leading-none text-[#004aad]/20">
        “
      </div>

      {/* Cita */}
      <blockquote className="mx-auto max-w-3xl">
        <p className="text-2xl font-light italic leading-relaxed text-[#1f3557] sm:text-3xl lg:text-[2.15rem]">
          “En cada acto médico debe estar presente el respeto por el
          paciente y los conceptos éticos y morales; entonces la ciencia
          y la conciencia estarán siempre del mismo lado, del lado de la
          humanidad”
        </p>
      </blockquote>

      {/* Separador */}
      <div className="mx-auto mt-8 h-1 w-14 rounded-full bg-[#a80b29]" />

      {/* Autor */}
      <div className="mt-7">
        <p className="text-lg font-bold text-[#073b7a]">
          René Favaloro
        </p>

        <p className="mt-1 text-sm text-[#68758a]">
          Médico, inventor, educador y cardiocirujano
        </p>
      </div>
    </div>
  </section>
  );
}

export default QuoteSection;