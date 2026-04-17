import axios from "axios";
import { ErrorMessage, Formik } from "formik";
import validateAppointment from "../../helpers/validateAppintment";
import { Form, Field } from "formik";
import styles from "./AppointmentForm.module.css";

function AppointmentForm({onAddAppointment}) {
    const initialState = {
        date: "",
        time: ""
    }

   const handleSubmit = async (values) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("Tenés que iniciar sesión para solicitar un turno");
    return;
  }

  try {
    const response = await axios.post("http://localhost:3000/appointments", {
      ...values,
      userId: user.id
    });

    alert("Turno solicitado con éxito");

    onAddAppointment(response.data);

  } catch (error) {
    console.log(error);
  }
};

const hours = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
];


    return <Formik initialValues={initialState} validate={validateAppointment} onSubmit={handleSubmit}>
              <Form className={styles.formContainer}>
                <h2 className={styles.title}>Solicitar turno</h2>
                <div className={styles.selectionContainer}>

                  <label className={styles.label}>Fecha:</label>
                  <Field type="date" name="date" className={styles.field}/>
                  <p style={{ color: "red" }}><ErrorMessage name="date"/></p>

                  <label className={styles.label}>Hora:</label>
                  <Field as="select" name="time" className={styles.field}>
                  <option value="">Seleccioná una hora</option>
                  {hours.map((hour) => (
                  <option value={hour} key={hour} className={styles.option}>
                  {hour}
                  </option>
                  ))}
                  </Field>
                  <p style={{ color: "red" }}><ErrorMessage name="time"/></p>
                  
                </div>
                <button type="submit" className={styles.button}>Solicitar turno</button>
              </Form>
           </Formik>
}

export default AppointmentForm;