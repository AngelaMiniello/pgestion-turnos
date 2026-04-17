function QuoteSection() {
  return (
    <section className="bg-gray-100 py-20 px-4 flex justify-center">
      <div className="mx-auto max-w-4xl text-center">
        
        {/* Frase */}
        <h2 className="font-normal text-3xl md:text-4xl italic text-gray-700 pb-6">
          “En cada acto médico debe estar presente el respeto por el paciente y los conceptos éticos y morales; entonces la ciencia y la conciencia estarán siempre del mismo lado, del lado de la humanidad”
        </h2>

        {/* Autor */}
        <div className="mt-6 text-gray-700">
          <p className="italic">– René Favaloro</p>
          <p className="text-sm mt-1 text-[#64748b]">Médico, inventor, educador y cardiocirujano.</p>
        </div>
      </div>
    </section>
  );
}

export default QuoteSection;