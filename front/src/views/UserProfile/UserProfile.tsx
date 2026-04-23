import { useEffect, useState } from "react";
import axios from "axios";

type User = {
  id: number;
  name: string;
  nDni: string;
  username: string;
  email: string;
  birthdate: string;
};

function UserProfile() {
  const [user, setUser] = useState<User | null>(null);;

  useEffect(() => {
   const fetchUser = async () => {
  try {
    const stored = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!stored || !token) return;

    const parsed: { id: number } = JSON.parse(stored);

    const response = await axios.get(
      `http://localhost:3000/users/${parsed.id}`,
      {
          headers: {
            Authorization: `Bearer ${token}`
          }
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
    return <p className="text-center mt-10">Cargando perfil...</p>;
  }

  return (
    <section className="min-h-fit bg-[#f5f6f8] flex justify-center py-16 px-4">
      <div className="w-full max-w-xl bg-white shadow-md rounded-xl p-8">

        {/* Título */}
        <h2 className="text-2xl font-bold text-[#1b2a57] text-center pb-4">
          Mi Perfil
        </h2>

        <div className="mt-8 space-y-5">
          <div>
            <p className="text-sm text-gray-500 pb-2">Nombre</p>
            <p className="font-medium text-lg pb-2">{user.name}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 pb-2">DNI</p>
            <p className="font-medium text-lg pb-2">{user.nDni}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 pb-2">Usuario</p>
            <p className="font-medium text-lg pb-2">{user.username}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 pb-2">Email</p>
            <p className="font-medium text-lg pb-2">{user.email}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 pb-2">Fecha de nacimiento</p>
            <p className="font-medium text-lg pb-2">
              {new Date(user.birthdate).toLocaleDateString()}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default UserProfile;