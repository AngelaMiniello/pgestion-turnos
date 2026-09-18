import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validateLogin } from "../../helpers/validateLogin";
import { useNavigate } from "react-router-dom";
import { Stethoscope, CircleUserRound, KeyRound, ArrowRight, ShieldCheck, } from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    password: ""
  };

  const handleOnSubmit = async (values) => {
    try {
  
      const response = await axios.post(
         `${import.meta.env.VITE_API_URL}/users/login`,
        values
      );

      console.log("RESPUESTA LOGIN DESDE FRONT:", response.data);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: response.data.user.id
        })
      );

      if (!response.data?.token || !response.data?.user) {
        throw new Error("Respuesta inválida del servidor");
      }

      alert("Inicio de sesión exitoso");

    window.dispatchEvent(new Event("userChange")); 
    navigate("/");

    } catch (error) {
        console.error(error);
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-80px)] w-full items-center justify-center bg-[#f5f6f8] px-5 py-16 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl"> 
        <div className="grid space-y-5 overflow-hidden rounded-3xl border border-[#e3e9f1] bg-white shadow-[0_20px_60px_rgba(0,55,120,0.10)] lg:grid-cols-[0.9fr_1.1fr]">
          
          {/* Panel izquierdo */} 
          <div className="relative hidden overflow-hidden bg-[#073b7a] px-10 py-14 lg:flex lg:flex-col">

            {/* Decoración */} 
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#004aad] opacity-40" /> 
            <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-[#004aad] opacity-30" />

            {/* Contenido principal superior con separación real */}
            <div className="relative z-10 flex flex-col gap-6"> 
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur-sm"> 
                <Stethoscope size={31} strokeWidth={1.8} /> 
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8fc0ff]"> 
                  Clínica Inmaculado 
                </p>

                <h2 className="max-w-sm text-4xl font-bold leading-tight text-white"> 
                  Tu salud, 
                  <br /> 
                  siempre cerca. 
                </h2>
              </div>
 
              <p className="max-w-sm text-sm leading-7 text-blue-100/80"> 
                Accedé a tu cuenta para gestionar tus turnos y consultar tus servicios de manera simple y segura. 
              </p> 
            </div>
  
            {/* Bloque inferior separado con mt-auto para que baje */}
            <div className="relative z-10 mt-auto flex items-center gap-3 border-t border-white/10 pt-8"> 
              <ShieldCheck size={20} strokeWidth={1.8} className="text-[#8fc0ff]" /> 
              <p className="text-xs leading-5 text-blue-100/70"> 
                Acceso seguro y privado para nuestros pacientes. 
              </p> 
            </div> 

          </div>

          {/* Formulario */} 
          <div className="px-6 py-12 sm:px-10 sm:py-14 lg:px-14 lg:py-16"> 
            <div className="mx-auto w-full max-w-md flex flex-col min-h-full">

            {/* Contenido principal superior */}
            <div className="flex flex-col">

              {/* Encabezado mobile */} 
              <div className="flex flex-col items-center text-center lg:items-start lg:text-left gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e8f2ff] text-[#004aad] lg:hidden"> 
                  <Stethoscope size={27} strokeWidth={1.9} /> 
                </div>

                <span className="w-fit rounded-full bg-[#e8f2ff] px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-[#004aad]"> 
                  Acceso de pacientes 
                </span> 
        
                <h1 className="text-3xl font-bold tracking-tight text-[#073b7a] sm:text-4xl">
                  Bienvenido
                </h1>

                <p className="max-w-md text-sm leading-6 text-[#68758a]">
                  Ingresá con tus datos para acceder a tu cuenta. 
                </p> 
              </div>
        
            <Formik initialValues={initialValues} validate={validateLogin} onSubmit={handleOnSubmit} >
              {({ isValid, dirty }) => ( 
                <Form className="flex flex-col gap-6">

                {/* Usuario */} 
                <div className="flex flex-col gap-2.5"> 
                  <label htmlFor="username" className="text-sm font-semibold text-[#1f3557]">
                    Nombre de usuario 
                  </label>

                  <div className="group relative"> 
                    <CircleUserRound size={19} strokeWidth={1.8} 
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8a98aa] transition-colors duration-200 group-focus-within:text-[#004aad]" />
                      
                      <Field id="username" type="text" name="username" placeholder="Ingresá tu usuario" autoComplete="username" 
                        className="box-border w-full rounded-xl border border-[#dce3ec] bg-[#f9fbfd] py-3.5 pl-11 pr-4 text-sm text-[#1f3557] outline-none transition-all duration-200 placeholder:text-[#a5afbd] hover:border-[#c8d5e5] focus:border-[#004aad] focus:bg-white focus:ring-4 focus:ring-[#004aad]/10"
                      /> 
                  </div>
        
                  <ErrorMessage name="username"> {(msg) => ( 
                    <p className="mt-2 text-xs font-medium text-[#a80b29]"> {msg} </p> )} 
                  </ErrorMessage> 
                </div>
       
                {/* Contraseña */} 
                <div className="flex flex-col gap-2.5">
                  <label htmlFor="password" className="text-sm font-semibold text-[#1f3557]">
                    Contraseña 
                  </label>

                  <div className="group relative"> 
                    <KeyRound size={19} strokeWidth={1.8} 
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8a98aa] transition-colors duration-200 group-focus-within:text-[#004aad]" />

                    <Field 
                      id="password" 
                      type="password" 
                      name="password" 
                      placeholder="Ingresá tu contraseña" 
                      autoComplete="current-password" 
                      className=" box-border w-full rounded-xl border border-[#dce3ec] bg-[#f9fbfd] py-3.5 pl-11 pr-4 text-sm text-[#1f3557] outline-none 
                        transition-all duration-200 placeholder:text-[#a5afbd] hover:border-[#c8d5e5] focus:border-[#004aad] focus:bg-white focus:ring-4
                       focus:ring-[#004aad]/10 " 
                    /> 
                  </div>

                  <ErrorMessage name="password"> {(msg) => ( 
                    <p className="mt-2 text-xs font-medium text-[#a80b29]"> {msg} </p> )} 
                  </ErrorMessage> 
                </div>

                {/* Botón */} 
                <button
                  type="submit" 
                  disabled={!isValid || !dirty} 
                  className="mt-3 flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#004aad] px-5 py-3.5 text-sm font-bold text-white 
                    shadow-[0_8px_20px_rgba(0,74,173,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#073b7a] 
                    hover:shadow-[0_12px_28px_rgba(0,74,173,0.22)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#004aad]/30 
                    disabled:cursor-not-allowed disabled:bg-[#cbd3de] disabled:text-[#7b8797] disabled:shadow-none disabled:hover:translate-y-0 " 
                > 
                  Iniciar sesión 
                  <ArrowRight size={18} strokeWidth={2.2} /> 
                </button>

              </Form> 
            )} 
          </Formik> 
          
          {/* Seguridad */} 
          <div className="mt-auto pt-10 flex items-center justify-center gap-2 border-t border-[#edf1f5]"> 
            <ShieldCheck size={16} strokeWidth={1.8} className="text-[#004aad]" /> 
            <p className="text-xs text-[#8a98aa]"> 
              Tus datos están protegidos y son de uso personal. 
            </p> 
          </div> 
        </div> 
        </div>
      </div> 
    </div> 
  </div> 
</main> 
); 
} 

export default Login;