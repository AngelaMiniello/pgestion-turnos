import { useState } from "react";
import axios from "axios";
import validateRegister from "../../helpers/validateRegister";
import styles from "../Register/Register.module.css";

function Register() {
  const initialState = {
    name: "",
    nDni: "",
    birthdate: "",
    email: "",
    username: "",
    password: "",
    confirmedPassword: "",
  };

  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = ({ target }) => {
    const updatedForm = {
      ...form,
      [target.name]: target.value,
    };

    setForm(updatedForm);
    setErrors(validateRegister(updatedForm));
  };

  const handleSubmit = async (event) => {
  event.preventDefault();

  const errorsList = validateRegister(form);
  if (Object.keys(errorsList).length > 0) {
    setErrors(errorsList);
    return alert("Hay errores en el formulario");
  }

  try {
    const credResponse = await axios.post("http://localhost:3000/credentials", {
      username: form.username,
      password: form.password,
    });

    const credentialId = credResponse.data.credentialId;

    const userResponse = await axios.post(
      "http://localhost:3000/users/register",
      {
        name: form.name,
        email: form.email,
        birthdate: form.birthdate,
        nDni: form.nDni,
        active: true,
        credentialsId: credentialId,
      }
    );

    console.log("USUARIO REGISTRADO:", userResponse.data);
    console.log("CREDENCIALES CREADAS:", credResponse.data);

    alert("¡Usuario registrado con éxito!");

    setForm(initialState);
    setErrors({});

  } catch (error) {
    console.error("ERROR REGISTRO:", error);
    alert("Error al registrar usuario");
  }
};

  const isFormValid = Object.keys(errors).length === 0 &&
                      Object.values(form).every((f) => f.trim() !== "");

  return (
    <main className={styles.registerContainer}>
      <h2 className="text-center text-xl font-bold text-[#1b2a57] md:text-4xl">Registrate</h2>

      <form onSubmit={handleSubmit} className={styles.registerForm}>
        
        <div className={styles.registerDiv}>
          <label className={styles.registerLabel}>Nombre:</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className={styles.registerInput}
          />
          {errors.name && <p>{errors.name}</p>}
        </div>

        <div className={styles.registerDiv}>
          <label className={styles.registerLabel}>DNI:</label>
          <input
            type="number"
            name="nDni"
            value={form.nDni}
            onChange={handleChange}
            className={styles.registerInput}
          />
          {errors.nDni && <p>{errors.nDni}</p>}
        </div>

        <div className={styles.registerDiv}>
          <label className={styles.registerLabel}>Fecha de nacimiento:</label>
          <input
            type="date"
            name="birthdate"
            value={form.birthdate}
            onChange={handleChange}
            className={styles.registerInput}
          />
          {errors.birthdate && <p>{errors.birthdate}</p>}
        </div>

        <div className={styles.registerDiv}>
          <label className={styles.registerLabel}>Email:</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className={styles.registerInput}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>

        <div className={styles.registerDiv}>
          <label className={styles.registerLabel}>Nombre de usuario:</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            className={styles.registerInput}
          />
          {errors.username && <p>{errors.username}</p>}
        </div>

        <div className={styles.registerDiv}>
          <label className={styles.registerLabel}>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className={styles.registerInput}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>

        <div className={styles.registerDiv}>
          <label className={styles.registerLabel}>Confirmar contraseña:</label>
          <input
            type="password"
            name="confirmedPassword"
            value={form.confirmedPassword}
            onChange={handleChange}
            className={styles.registerInput}
          />
          {errors.confirmedPassword && <p>{errors.confirmedPassword}</p>}
        </div>

        <button
          type="submit"
          className={styles.registerButton}
          disabled={!isFormValid}
        >
          Registrarme
        </button>
      </form>
    </main>
  );
}

export default Register;
