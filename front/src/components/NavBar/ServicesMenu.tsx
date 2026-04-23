import { useState } from "react";
import { ChevronDown } from "lucide-react";

function ServicesMenu() {
  const [open, setOpen] = useState(false);

  return (
    <li
      className="relative flex flex-col md:flex-row md:items-center items-start"
      onMouseEnter={() => window.innerWidth >= 768 && setOpen(true)}
      onMouseLeave={() => window.innerWidth >= 768 && setOpen(false)}
    >
      <div   
        onClick={() => setOpen(!open)}
 className="flex items-center gap-1 w-full md:w-auto
  text-[17px] lg:text-[0.9rem] xl:text-[17px]
  text-gray-50 hover:text-[#f891cb]"
      >
        Servicios
        <ChevronDown className="w-[18px] h-[18px] lg:w-4 lg:h-4 xl:w-[18px] xl:h-[18px]" />
      </div>

      {/* Dropdown */}
      {open && (
        <div
  className={`
    ${open ? "block" : "hidden"}

   relative w-full ml-2 mt-2

    md:absolute md:left-0 md:top-full md:mt-3 md:w-52

    bg-[#004aad] py-2 md:py-3
  `}
>
          <a href="/specialties" className="block py-2 text-gray-50 text-sm md:px-4 md:py-3 md:text-base">
            Especialidades
          </a>
           <a href="/studies" className="block py-2 text-gray-50 text-sm md:px-4 md:py-3 md:text-base">
            Estudios y Prácticas
          </a>
           <a href="/coberturas" className="block py-2 text-gray-50 text-sm md:px-4 md:py-3 md:text-base">
            Coberturas Médicas
          </a>
        </div>
      )}
    </li>
  );
}

export default ServicesMenu;