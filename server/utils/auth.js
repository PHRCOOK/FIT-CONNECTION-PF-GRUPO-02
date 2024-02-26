const authorization = async (req, res, next) => {
  try {
    const isAdmin = req.headers.is_admin === "true";
    if (isAdmin) {
      // Si el usuario es administrador, permite el acceso a la siguiente ruta
      next();
    } else {
      // Si el usuario no es administrador, envía un mensaje de error
      res
        .status(403)
        .send(
          "Acceso denegado. Debes ser administrador para acceder a esta ruta."
        );
    }
  } catch (error) {
    console.error("Error al buscar el usuario en la base de datos:", error);
    res.status(500).send("Error interno del servidor.");
  }
};
module.exports = {
  authorization,
};
