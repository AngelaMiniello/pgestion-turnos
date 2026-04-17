function validateRegister(formData) {
  const errors = {};

  // Nombre
  if (!formData.name) {
    errors.name = "El nombre es requerido";
  } else if (formData.name.length < 3) {
    errors.name = "El nombre debe tener mínimo 3 caracteres";
  }

  // DNI
  if (!formData.nDni) {
    errors.nDni = "El DNI es requerido";
  } else if (formData.nDni.length < 7 || formData.nDni.length > 8) {
    errors.nDni = "El DNI debe tener entre 7 y 8 caracteres";
  }

  // Username
  if (!formData.username) {
    errors.username = "El nombre de usuario es requerido";
  } else if (formData.username.length < 4) {
    errors.username = "El nombre de usuario debe tener mínimo 4 caracteres";
  }

  // Password
  if (!formData.password) {
    errors.password = "La contraseña es requerida";
  } else if (formData.password.length < 8) {
    errors.password = "La contraseña debe tener mínimo 8 caracteres";
  }

  // Confirmar password
  if (formData.password !== formData.confirmedPassword) {
    errors.confirmedPassword = "Las contraseñas no coinciden";
  }

  // Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!formData.email) {
    errors.email = "El email es requerido";
  } else if (!emailRegex.test(formData.email)) {
    errors.email = "El email no es válido";
  }

  // Fecha de nacimiento
  if (!formData.birthdate) {
    errors.birthdate = "La fecha de nacimiento es requerida";
  } else {
    const birthdate = new Date(formData.birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthdate.getFullYear();

    const m = today.getMonth() - birthdate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
      age--;
    }

    if (age < 18) {
      errors.birthdate = "Debes ser mayor de 18 años";
    }
  }

  return errors;
}

export default validateRegister;
