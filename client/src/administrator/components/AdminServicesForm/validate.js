const validate = (input) => {
  const errors = {};
  if (!input.name) {
    errors.name = "El campo no puede estar vacio.";
  }
  if (input.price < 0) {
    errors.price = "El precio no puede ser un numero negativo.";
  }
  if (!input.price) {
    errors.price = "El campo no puede estar vacio.";
  }
  if (input.description.length > 200) {
    errors.description = "La descripcion no debe superar los 200 caracteres.";
  }
  if (!input.description) {
    errors.description = "El campo no puede estar vacio.";
  }
  if (!input.status) {
    errors.status = "Seleccione un estado.";
  }
  if (input.duration.length > 200) {
    errors.duration = "La duracion debe ser un numero.";
  }
  if (!input.duration) {
    errors.duration = "El campo no puede estar vacio.";
  }

  return errors;
};

export default validate;
