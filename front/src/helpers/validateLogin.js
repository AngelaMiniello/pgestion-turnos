export function validateLogin(formData) {
    const errors = {};

    if(!formData.username) {
        errors.username = "El nombre de usuario es requerido";
    } else if (formData.username.length < 4){
        errors.username = "El nombre de usuario debe tener como mínimo 4 caracteres";
    }

    if(!formData.password) {
        errors.password = "La contraseña es requerida";
    } else if (formData.password.length < 8){
        errors.password = "La contraseña debe tener como mínimo 8 caracteres";
    }

    return errors;
}