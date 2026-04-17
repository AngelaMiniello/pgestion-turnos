import { useState } from "react";
import { ChevronDown } from "lucide-react";

function ServicesMenu() {
  const [open, setOpen] = useState(false);

  return (
    <li
      className="relative flex items-center"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Trigger */}
      <div className="flex cursor-pointer items-center gap-1 text-[17px] text-gray-50 hover:text-[#f891cb] font-sans font-normal">
        Servicios
        <ChevronDown size={18} />
      </div>

       {/* Dropdown */}
      {open && (
        <div className="absolute left-0 top-full z-50 mt-3 w-50 bg-[#004aad] py-3 shadow-xl border border-slate-200">
          <a href="/specialties" className="block px-4 py-3  text-gray-50">
            Especialidades
          </a>
           <a href="/studies" className="block px-4 py-3  text-gray-50">
            Estudios y Prácticas
          </a>
           <a href="/coberturas" className="block px-4 py-3  text-gray-50">
            Coberturas Médicas
          </a>
        </div>
      )}
    </li>
  );
}

export default ServicesMenu;