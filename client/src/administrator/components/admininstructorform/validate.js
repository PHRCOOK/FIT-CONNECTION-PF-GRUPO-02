export const validate = (input, initial) => {
  const errors = {};
  if (
    initial.fullname !== input.fullname &&
    (input.fullname.length < 3 || input.fullname.length > 50)
  ) {
    errors.fullname = "El nombre debe tener entre 3 y 50 caracteres.";
  }
  if (initial.fullname !== input.fullname && !input.fullname) {
    errors.fullname = "Debe haber un nombre";
  }
  if (initial.photo !== input.photo && !input.photo) {
    errors.photo = "Debe subir una foto";
  }
  if (initial.description !== input.description && !input.description) {
    errors.description = "Debe tener una descripcion";
  }
  if (initial.status !== input.status && input.status === "") {
    errors.status = "Debe elegir un estado";
  }
  return errors;
};
export default validate;
