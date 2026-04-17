import axios from "axios";
import styles from "./Login.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validateLogin } from "../../helpers/validateLogin";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    password: ""
  };

  const handleOnSubmit = async (values) => {
    try {
  
      const response = await axios.post(
        "http://localhost:3000/users/login",
        values
      );

      console.log("RESPUESTA LOGIN DESDE FRONT:", response.data);

      localStorage.setItem(
        "user",
        JSON.stringify({
          id: response.data.user.id
        })
      );

      alert("Inicio de sesión exitoso");

    window.dispatchEvent(new Event("userChange")); 
    navigate("/");

    } catch (error) {
        console.error(error);
    }
  };

  return (
    <main className={styles.loginMain}>
      <div className={styles.loginContainer}>
        <Formik
          initialValues={initialValues}
          validate={validateLogin}
          onSubmit={handleOnSubmit}
        >
          {({ isValid, dirty }) => (
            <Form className={styles.loginBox}>
              <h2 className={styles.loginTitle}>Bienvenido</h2>

              <label className={styles.loginLabel}>Nombre de usuario:</label>
              <Field type="text" name="username" className={styles.loginInput} />
              <ErrorMessage name="username">
                {(msg) => <p style={{ color: "red" }}>{msg}</p>}
              </ErrorMessage>

              <label className={styles.loginLabel}>Contraseña:</label>
              <Field
                type="password"
                name="password"
                className={styles.loginInput}
              />
              <ErrorMessage name="password">
                {(msg) => <p style={{ color: "red" }}>{msg}</p>}
              </ErrorMessage>

              <button
                type="submit"
                className={styles.loginButton}
                disabled={!isValid || !dirty}
              >
                Iniciar Sesión
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </main>
  );
}

export default Login;
