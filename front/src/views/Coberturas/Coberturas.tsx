import { useState } from "react";

const coberturas = [
  { name: "OSDE", validity: "60 días" },
  { name: "Galeno", validity: "60 días" },
  { name: "Swiss Medical", validity: "60 días" },
  { name: "IOMA", validity: "30 días" },
  { name: "Medife", validity: "60 días" },
  { name: "Avalian", validity: "60 días" },
];

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function groupByLetter(data) {
  return data.reduce((acc, item) => {
    const letter = item.name[0].toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(item);
    return acc;
  }, {});
}

export default function Coberturas() {
  const [search, setSearch] = useState("");
  const [activeLetter, setActiveLetter] = useState("");

  const filtered = coberturas.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchesLetter = activeLetter
      ? c.name.startsWith(activeLetter)
      : true;

    return matchesSearch && matchesLetter;
  });

  const grouped = groupByLetter(filtered);

  return (
    <section className="bg-[#f5f6f8] py-16 flex justify-center">
      <div className="w-full max-w-5xl px-4">
        
        {/* TITULO */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-[#1b2a57] pb-4">
            Coberturas Médicas
          </h2>

          <div className="mx-auto mt-4 h-1 w-20 bg-[#7db3ff] rounded-full" />
        </div>

        {/* BUSCADOR */}
        <div className="mt-8 flex justify-center pb-4">
          <input
            type="text"
            placeholder="Buscar cobertura..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7db3ff]"
          />
        </div>

        {/* BOTONES A-Z */}
        <div className="mt-6 flex flex-wrap justify-center gap-2 pb-4">
          <button
            onClick={() => setActiveLetter("")}
            className={`px-3 py-1 rounded-md text-sm border ${
              activeLetter === ""
                ? "bg-[#1f4fbf] text-white"
                : "bg-white text-gray-700"
            }`}
          >
            Todas
          </button>

          {alphabet.map((letter) => (
            <button
              key={letter}
              onClick={() => setActiveLetter(letter)}
              className={`px-3 py-1 rounded-md text-sm border transition ${
                activeLetter === letter
                  ? "bg-[#1f4fbf] text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {letter}
            </button>
          ))}
        </div>

        {/* LISTADO */}
        <div className="mt-12 space-y-10">
          {Object.keys(grouped).length === 0 && (
            <p className="text-center text-gray-500">
              No se encontraron resultados
            </p>
          )}

          {Object.keys(grouped)
            .sort()
            .map((letter) => (
              <div key={letter} className="">
                
                {/* LETRA */}
                <h3 className="text-xl font-semibold text-[#1f4fbf] pb-2 pt-2">
                  {letter}
                </h3>

                <div className="grid gap-10 sm:grid-cols-2 ">
                  {grouped[letter].map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center bg-white border rounded-md px-4 py-3 shadow-sm hover:shadow-md transition"
                    >
                      <span className="font-medium text-[#1f2430]">
                        {item.name}
                      </span>

                      <span className="text-sm text-gray-500">
                        {item.validity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}