function validate(inputs) {
  let errors = {};
  const regexPassword =
    /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])[a-zA-Z0-9!@#$%^&*()_+]+$/;
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
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
      "The password must have an uppercase letter, a number, and a special character";
  }
  if (!inputs.password) {
    errors.password = "REQUIRED FIELD";
  }
  if (!inputs.isAdmin || inputs.isAdmin === "DEFAULT") {
    errors.isAdmin = "Please select a valid option";
  }
  return errors;
}

export default validate;
