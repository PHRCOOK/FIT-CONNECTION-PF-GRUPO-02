export const validate = (input) => {
  const errors = {};
  if (!input.name) {
    errors.name = "Debe haber un nombre";
  }
  if (!input.status) {
    errors.status = "Debe elegir un estado";
  }
  if (!input.is_service) {
    errors.is_service = "Debe elegir una opcion";
  }
  return errors;
};
export default validate;
