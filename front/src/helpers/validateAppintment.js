function validateAppointment(formData) {
    const errors = {};

    if(!formData.date) {
        errors.date = "La fecha del turno es requerido";
    } 

    if(!formData.time) {
        errors.time = "La hora del turno es requerida";
    }

    return errors;
}

export default validateAppointment;
