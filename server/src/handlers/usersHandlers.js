const {
  validateCreateUser,
} = require("../../utils/validations/validateCreateUser");
const { extractSubAfterPipe } = require("../../utils/subAfterPipe");
const {
  createUserController,
  getActiveUsersController,
  getUserByNameController,
  getInactiveUsersController,
  updateUserController,
  getUserByIdController,
  getUserByEmailController,
} = require("../controllers/usersControllers");
// Handler para manejar la cración de un usuario.
const createUserHandler = async (req, res) => {
  const { name, email, sub } = req.body;
  try {
    validateCreateUser({ name, email, sub });
    const subAfterPipe = extractSubAfterPipe(sub);
    const response = await createUserController(name, email, subAfterPipe);
    //console.log(response);
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Este handler maneja la actualización de la información de un usuario dependiendo de lo que llegue por body.
const updateUserHandler = async (req, res) => {
  const { id } = req.params;
  const { name, email, sub, status, is_admin } = req.body;

  try {
    const response = await updateUserController(id, {
      name,
      email,
      sub,
      status,
      is_admin,
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Manejamos mostrar los usuarios que estan activos o si llega una busqueda por un nombre en específico.
const getActiveUsersHandler = async (req, res) => {
  const { name } = req.query;
  try {
    const response = name
      ? await getUserByNameController(name)
      : await getActiveUsersController();
    res.status(200).send(response);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Handler para mostrar los usuarios que estan inactivos.
const getInactiveUsersHandler = async (req, res) => {
  try {
    const response = await getInactiveUsersController();
    res.status(200).send(response);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Con este hanlder mostramos en detalle un usuario identificandolo por su id.
const getDetailHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await getUserByIdController(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Este Handler maneja la busqueda de un usuario por su email.
const getUserByEmailHandler = async (req, res) => {
  const { email } = req.params;
  try {
    const response = await getUserByEmailController(email)
    res.status(200).json(response)
  } catch (error) {
    res.status(404).json({error: error.message})
  }
};

module.exports = {
  createUserHandler,
  getActiveUsersHandler,
  updateUserHandler,
  getInactiveUsersHandler,
  getDetailHandler,
  getUserByEmailHandler,

};
