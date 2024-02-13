export const validate = (input) => {
  const errors = {};
  if (input.fullname.length < 3 || input.fullname.length > 50) {
    errors.fullname = "El nombre debe tener entre 3 y 50 caracteres.";
  }
  if (!input.fullname) {
    errors.fullname = "Debe haber un nombre";
  }
  if (!input.photo) {
    errors.photo = "Debe subir una foto";
  }
  if (!input.description) {
    errors.description = "Debe tener una descripcion";
  }
  if (!input.status) {
    errors.status = "Debe elegir un estado";
  }
  return errors;
};
export default validate;
