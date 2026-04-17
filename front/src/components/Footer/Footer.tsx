function Footer() {
  return (
    <footer className="bg-[#1f4fbf] text-white px-6 py-16 flex justify-center">
      <div className="mx-auto max-w-7xl">
        
        {/* Top */}
        <div className="grid gap-12 md:grid-cols-3 pb-4">
          
          {/* Logo */}
          <div className="flex items-start justify-center md:justify-start">
            <img
              src="/public/assets/img/circlelogo.svg"
              alt="logo"
              className="w-24 opacity-90"
            />
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-lg font-normal mb-4 pb-2">CONTACTO</h3>

            <p className="pb-2">
              <span className="font-semibold">Mail:</span><br />
              atencion@clinicainmaculado.org.ar
            </p>

            <p>
              <span className="font-semibold">Central de Atención Telefónica:</span><br />
              011-4469-9500 / 0810-122-4753
            </p>

            <p className="mt-2 text-sm opacity-80">
              (lunes a viernes de 7 a 22hs. y sábados de 7 a 16hs.)
            </p>
          </div>

          {/* Horarios */}
          <div>
            <h3 className="text-lg font-normal pb-2">HORARIOS</h3>

            <p className="pb-2">
              <span className="font-semibold">Atención ambulatoria:</span><br />
              Lunes a viernes 8 a 20hs. y sábado 8 a 17hs.
            </p>

            <p>
              <span className="font-semibold">Diagnóstico por Imágenes:</span><br />
              Lunes a viernes 7 a 22hs. y sábado 7 a 16hs.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-white/30" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          
          <p className="text-sm opacity-80 text-center md:text-left">
            © Copyright 2026 . All Rights Reserved.
          </p>

          {/* Redes */}
          <div className="flex">
            <a className="text-[#1f4fbf] pt-2 rounded-full">
              <img src="public/assets/img/ig.png"/>
            </a>
            <a className="text-[#1f4fbf] pt-2 rounded-full">
              <img src="public/assets/img/ig.png"/>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;