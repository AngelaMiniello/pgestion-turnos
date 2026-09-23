import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CalendarIcon , PlusIcon, Text } from "lucide-react"; 

type User = {
  id: number;
  name: string;
  nDni: string;
  username?: string;
  credential?: {
    username: string;
  };
  email: string;
  birthdate: string;
};

function UserProfile() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const stored = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (!stored || !token) return;

        const parsed: { id: number } = JSON.parse(stored);

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/${parsed.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(response.data);
      } catch (error) {
        console.error("Error al traer el usuario:", error);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[#f5f6f8]">
        <p className="text-center text-lg font-medium text-[#1b2a57] animate-pulse">
          Cargando panel de perfil...
        </p>
      </div>
    );
  }

  // Obtengo el username
  const displayUsername = user.username || user.credential?.username || "Sin usuario";
  
  // Generar iniciales para el avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#f5f6f8] py-10 px-4 sm:px-6 lg:px-8 box-border flex w-full justify-center">
      <div className="max-w-4xl w-full mx-auto flex flex-col gap-6">

    {/* --- BLOQUE SUPERIOR: PERFIL Y BOTONES JUNTOS EN UNA SOLA TARJETA O BIEN ALINEADOS --- */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      {/* Tarjeta de Identificación (ocupa 2 columnas) */}
      <div className="md:col-span-2 bg-white shadow-md rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 border border-gray-100">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#1b2a57] text-white flex items-center justify-center text-2xl sm:text-3xl font-bold shadow-inner shrink-0">
          {user.name ? getInitials(user.name) : "U"}
        </div>
        <div className="text-center sm:text-left space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1b2a57]">
            {user.name}
          </h1>
          <p className="text-sm font-medium text-gray-500">
            @{displayUsername}
          </p>
          <span className="inline-block bg-blue-50 text-[#1b2a57] text-xs font-semibold px-3 py-1 rounded-full mt-2">
            Cuenta Activa
          </span>
        </div>
      </div>

      {/* Tarjeta de Acciones Rápidas (ocupa 1 columna, alineada a la altura) */}
      <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col justify-center gap-3 border border-gray-100">
        <Link
          to="/appointments"
          className="px-4 py-2.5 bg-[#1b2a57] text-white text-sm font-semibold rounded-xl text-center hover:bg-[#152144] transition shadow-sm flex items-center justify-center gap-2"
        >
          <CalendarIcon size={17} className="text-white" /> 
          Mis Turnos
        </Link>
        
        <Link
          to="/appointments/schedule"
          className="px-4 py-2.5 bg-[#1b2a57] text-white text-sm font-semibold rounded-xl text-center hover:bg-[#152144] transition shadow-sm flex items-center justify-center gap-2"
        >
          <PlusIcon size={17} className="text-white" /> 
          Nuevo Turno
        </Link>
          {/*

            <Link

              to="/appointments/schedule"

              className="px-5 py-2.5 bg-white text-[#1b2a57] border border-[#1b2a57] text-sm font-semibold rounded-xl text-center hover:bg-gray-50 transition shadow-sm flex items-center justify-center gap-2"

            >

            <Text

              size={17}

              className="text-white"

            />

              Mis Órdenes

            </Link>

            */}
      </div>

    </div>

    {/* --- SECCIÓN DE DATOS PERSONALES (GRID) --- */}
    <div className="bg-white shadow-md rounded-2xl p-6 sm:p-8 border border-gray-100">
      <h2 className="text-xl font-bold text-[#1b2a57] mb-8 border-b pb-3">
        Información de la Cuenta
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        
        {/* Campo Nombre */}
        <div className="bg-[#f5f6f8] p-4 rounded-xl border border-gray-100">
          <p className="text-xs font-semibold tracking-wide text-gray-400 uppercase mb-2">
            Nombre Completo
          </p>
          <p className="font-semibold text-lg text-[#1b2a57]">
            {user.name}
          </p>
        </div>

        {/* Campo Usuario */}
        <div className="bg-[#f5f6f8] p-4 rounded-xl border border-gray-100">
          <p className="text-xs font-semibold tracking-wide text-gray-400 uppercase mb-2">
            Nombre de Usuario
          </p>
          <p className="font-semibold text-lg text-[#1b2a57]">
            @{displayUsername}
          </p>
        </div>

        {/* Campo DNI */}
        <div className="bg-[#f5f6f8] p-4 rounded-xl border border-gray-100">
          <p className="text-xs font-semibold tracking-wide text-gray-400 uppercase mb-2">
            DNI
          </p>
          <p className="font-semibold text-lg text-[#1b2a57]">
            {user.nDni || "No especificado"}
          </p>
        </div>

        {/* Campo Email */}
        <div className="bg-[#f5f6f8] p-4 rounded-xl border border-gray-100">
          <p className="text-xs font-semibold tracking-wide text-gray-400 uppercase mb-2">
            Correo Electrónico
          </p>
          <p className="font-semibold text-lg text-[#1b2a57] truncate">
            {user.email}
          </p>
        </div>

        {/* Campo Fecha de nacimiento */}
        <div className="bg-[#f5f6f8] p-4 rounded-xl border border-gray-100 sm:col-span-2">
          <p className="text-xs font-semibold tracking-wide text-gray-400 uppercase mb-2">
            Fecha de Nacimiento
          </p>
          <p className="font-semibold text-lg text-[#1b2a57]">
            {user.birthdate ? new Date(user.birthdate).toLocaleDateString() : "No especificada"}
          </p>
        </div>

      </div>
    </div>

  </div>
</main>
  );
}

export default UserProfile;