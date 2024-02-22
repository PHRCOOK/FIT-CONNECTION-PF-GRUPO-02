const validateCreateFeedBack = ({ comment, raiting, post_at }) => {
  if (!comment) {
    throw new Error("Por favor ingrese un comentario.");
  }

  if (!raiting || raiting > 5) {
    throw new Error("Por favor seleccione una calificación valida.");
  }

  if (!post_at) {
    throw new Error("Por favor ingrese una fecha.");
  }

  if (!isNaN(comment)) {
    throw new Error("El comentario no puede ser un número.");
  }

  if (typeof raiting === "string") {
    throw new Error("La calificación debe ser un número.");
  }

  // if (typeof post_at === 'string') {
  //     throw new Error('Please enter a date.')
  // }
};

module.exports = { validateCreateFeedBack };
