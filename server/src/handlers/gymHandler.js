const {
  getGymController,
  postGymController,
  putGymController,
} = require("../controllers/gymController");

const getGymHandler = async (req, res) => {
  try {
    const gym = await getGymController();
    return res.status(200).json(gym[0]);
  } catch (error) {
    return res
      .status(404)
      .json({ error: "No encontrado.", message: error.message });
  }
};

const postGymHandler = async (req, res) => {
  console.log(req.body);
  try {
    const { name, address, phone, status, nit, map } = req.body;
    const response = await postGymController(
      name,
      address,
      phone,
      status,
      nit,
      map
    );
    return res.status(200).json({ response, message: "Creado" });
  } catch (error) {
    console.log(error);
    if (error.message === "Solo puede haber un solo gym registrado") {
      return res.status(409).json({ message: error.message });
    } else if (error.message === "No puede haber campos vacíos") {
      return res.status(400).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  }
};
const putGymHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, phone, status, nit, map } = req.body;
    const response = await putGymController(id, {
      name,
      address,
      phone,
      status,
      nit,
      map,
    });
    res.status(200).json({ response });
  } catch (error) {
    if (error.message === "Gym no encontrado")
      return res.status(404).json({ message: error.message });
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getGymHandler,
  postGymHandler,
  putGymHandler,
};
