function validate(inputs) {
  let errors = {};
  const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d]{8,}$/;
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const regexNoNumeros = /^[^\d]*$/;
  const regexLetrasYEspacios = /^[A-Za-z\s]*$/;

  if (!regexLetrasYEspacios.test(inputs.fullname)) {
    errors.fullname = "El nombre no puede contener caracteres especiales";
  }
  if (!regexNoNumeros.test(inputs.fullname)) {
    errors.fullname = "El nombre no puede contener numeros";
  }
  if (!inputs.fullname) {
    errors.fullname = "REQUIRED FIELD";
  }

  if (!regexEmail.test(inputs.email)) {
    errors.email = "Must be a valid email";
  }

  if (!inputs.email) {
    errors.email = "REQUIRED FIELD";
  }

  if (!regexPassword.test(inputs.password)) {
    errors.password =
      "The password must contain at least 8 characters, at least one number, one lowercase letter and one uppercase letter.";
  }
  if (!inputs.password) {
    errors.password = "REQUIRED FIELD";
  }

  return errors;
}

export default validate;
