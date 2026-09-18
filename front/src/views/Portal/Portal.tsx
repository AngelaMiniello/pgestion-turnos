import { Link } from "react-router-dom";
import { LogIn, UserPlus, ArrowRight, Stethoscope } from "lucide-react";

function Portal() {
  return (
    <main className="flex min-h-[calc(100vh-80px)] w-full items-center justify-center bg-[#f5f6f8] px-5 py-16 sm:px-6 lg:px-8">
      <section className="mx-auto flex w-full max-w-5xl flex-col items-center rounded-3xl border border-[#e3e9f1] bg-white px-6 py-12 shadow-[0_20px_60px_rgba(0,55,120,0.10)] sm:px-10 sm:py-16 md:px-14 gap-10">
    
      {/* Encabezado Principal */}
      <div className="flex flex-col items-center text-center gap-4">
      
        {/* Logo / Icono superior decorativo */}
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e8f2ff] text-[#004aad] shadow-sm">
          <Stethoscope size={31} strokeWidth={1.8} />
        </div>

        <span className="rounded-full bg-[#e8f2ff] px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-[#004aad]">
          Clínica Inmaculado
        </span>

        <h1 className="text-3xl font-bold tracking-tight text-[#073b7a] sm:text-4xl">
          Portal de Turnos
        </h1>

        <p className="max-w-xl text-sm leading-6 text-[#68758a] sm:text-base">
          Gestioná tus turnos de manera simple, rápida y organizada.
        </p>
      </div>

      {/* Tarjetas de Acceso */}
      <div className="grid w-full max-w-3xl gap-6 md:grid-cols-2">
      
        {/* Opción Iniciar Sesión */}
          <Link
            to="/login"
            className="group gap-4 flex flex-col justify-between rounded-2xl border border-[#dce3ec] bg-[#f9fbfd] p-8 transition-all duration-200 hover:-translate-y-1 hover:border-[#004aad] hover:bg-white hover:shadow-[0_12px_28px_rgba(0,74,173,0.12)]"
          >
            {/* Contenido superior con mayor espacio interno (gap-6) */}
            <div className="flex flex-col gap-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#e8f2ff] text-[#004aad] transition-colors group-hover:bg-[#004aad] group-hover:text-white">
                <LogIn size={24} strokeWidth={1.9} />
              </div>

              {/* Contenedor de texto con separación interna (gap-2.5) */}
              <div className="flex flex-col gap-2.5">
                <h2 className="text-xl font-bold text-[#073b7a]">
                  Iniciar sesión
                </h2>

                <p className="text-sm leading-6 text-[#68758a]">
                  Accedé con tu usuario para ver y gestionar tus turnos asignados.
                </p>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-2 text-sm font-bold text-[#004aad] group-hover:underline">
              <span>Acceder al portal</span>
              <ArrowRight size={16} strokeWidth={2.2} className="transition-transform duration-200 group-hover:translate-x-1" />
            </div>
          </Link>

        {/* Opción Registrarse */}
        <Link
          to="/register"
          className="group gap-4 flex flex-col justify-between rounded-2xl border border-[#dce3ec] bg-[#f9fbfd] p-8 transition-all duration-200 hover:-translate-y-1 hover:border-[#004aad] hover:bg-white hover:shadow-[0_12px_28px_rgba(0,74,173,0.12)]"
        >
          <div className="flex flex-col gap-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#e8f2ff] text-[#004aad] transition-colors group-hover:bg-[#004aad] group-hover:text-white">
              <UserPlus size={24} strokeWidth={1.9} />
            </div>

            <div className="flex flex-col gap-2.5">
              <h2 className="text-xl font-bold text-[#073b7a]">
                Registrarse
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#68758a]">
                Creá tu cuenta nueva para poder reservar y administrar tus turnos médicos.
              </p>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-2 text-sm font-bold text-[#004aad] group-hover:underline">
            <span>Crear cuenta</span>
            <ArrowRight size={16} strokeWidth={2.2} className="transition-transform duration-200 group-hover:translate-x-1" />
          </div>
        </Link>

      </div>
      </section>
    </main>
  );
}

export default Portal;