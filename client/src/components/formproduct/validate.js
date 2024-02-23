export const validate = (input) => {
  const errors = {};
  if (!input.name) {
    errors.name = "No puede estar vacio.";
  }

  if (input.price < 0) {
    errors.price = "El precio no puede ser un numero negativo.";
  }
  if (!input.price) {
    errors.price = "No puede estar vacio.";
  }
  if (input.description.length > 200) {
    errors.description = "La descripcion no puede exceder los 200 caracteres.";
  }
  if (!input.description) {
    errors.description = "No puede estar vacio.";
  }
  if (!input.brand) {
    errors.brand = "No puede estar vacio.";
  }
  // if (!input.image_url) {
  //   errors.image_url = "Upload an image.";
  // }
  if (input.stock < 0) {
    errors.stock = "El stock no puede ser un numero negativo.";
  }
  if (isNaN(input.stock)) {
    errors.stock = "El stock debe ser un numero valido.";
  }
  if (!input.stock) {
    errors.stock = "No puede estar vacio.";
  }
  if (!input.category_id) {
    errors.category_id = "Selecciona una categoria.";
  }
  if (!input.status) {
    errors.status = "Selecciona un estatus.";
  }
  return errors;
};
export default validate;
