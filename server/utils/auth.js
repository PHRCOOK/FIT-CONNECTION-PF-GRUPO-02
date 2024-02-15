const { User } = require("../src/db");
const authorization = async (req, res, next) => {
  const { user_id } = req.body;
  try {
    if(user_id) {
      const { is_admin } = await User.findByPk(user_id);
      if (is_admin === true) {
        // Si el usuario es administrador, permite el acceso a la siguiente ruta
        next()
      } else {
        // Si el usuario no es administrador, envía un mensaje de error
        res.status(403).send('Acceso denegado. Debes ser administrador para acceder a esta ruta.');
      }
    }else{
      res.status(400).send("no hay informacion")
    }
  } catch (error) {
    console.error('Error al buscar el usuario en la base de datos:', error);
    res.status(500).send('Error interno del servidor.');
  }
};
  module.exports = {
    authorization
  }