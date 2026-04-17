import { Link } from "react-router-dom";

function Portal() {
  return (
    <main className="min-h-fit max- px-4 py-10 flex justify-center">
      <section className="mx-auto flex min-h-[60vh] w-full max-w-5xl flex-col items-center bg-gray-50 px-6 py-10 shadow-2xl md:px-12 md:py-14 gap-8">
        <div className="flex flex-col items-center gap-3">
          <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full shadow-lg">
            <img
              src="/assets/img/circlelogo.svg"
              alt="Logo"
            />
          </div>

          <h1 className=" text-center text-2xl font-bold text-[#1b2a57] md:text-4xl">
            Portal de Turnos
          </h1>

          <p className="mt-3 max-w-2xl text-center text-sm text-slate-600 md:text-base">
            Gestioná tus turnos de manera simple, rápida y organizada.
          </p>
        </div>

        <div className="mt-40 grid w-full max-w-3xl gap-6 md:grid-cols-2">
          <Link
            to="/login"
            className="group rounded-2xl border border-[#1b2a57] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-2xl">
              🔐
            </div>

            <h2 className="text-xl font-semibold text-[#1b2a57]">
              Iniciar sesión
            </h2>

            <p className="mt-2 text-sm text-slate-600">
              Accedé con tu usuario para ver y gestionar tus turnos.
            </p>

            <span className="mt-5 inline-block text-sm font-medium text-[#b30d2f] group-hover:underline">
              Acceder al portal
            </span>
          </Link>
          <Link
            to="/register"
            className="group rounded-2xl border border-[#1b2a57] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-2xl">
              👤
            </div>

            <h2 className="text-xl font-semibold text-[#1b2a57]">
              Registrarse
            </h2>

            <p className="mt-2 text-sm text-slate-600">
              Creá tu cuenta para poder reservar y administrar tus turnos.
            </p>

            <span className="mt-5 inline-block text-sm font-medium text-[#b30d2f] group-hover:underline">
              Crear cuenta
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Portal;