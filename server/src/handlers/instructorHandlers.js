const {
  validateCreateInstructor,
} = require("../../utils/validations/validateCreateInstructor");
const {
  createInstructorController,
  updateInstructorController,
  getInstructors,
} = require("../controllers/instructorControllers");

const getInstructorHandler = async (req, res) => {
  try {
    const instructor = await getInstructors();
    console.log(instructor);
    return res.status(200).json(instructor);
  } catch (error) {
    return res
      .status(404)
      .json({ error: "No encontrado", message: error.message });
  }
};

const getInstructorByIDHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const instructor = await getInstructors();
    return res
      .status(200)
      .json(instructor.Items.find((i) => i.dataValues.id == id));
  } catch (error) {
    return res
      .status(404)
      .json({ error: "No encontrado", message: error.message });
  }
};
// Handler que permite manejar la creación de un instructor en la base de datos.
const createInstructorHandler = async (req, res) => {
  const { fullname, description, status } = req.body;
  const photo = req.file;

  try {
    validateCreateInstructor({ fullname, photo, description });
    const response = await createInstructorController(
      fullname,
      photo,
      description,
      status
    );
    res.status(201).json(response);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// Este handler nos permite actualizar la información de un instructor en la base de datos.
const updateInstructorHandler = async (req, res) => {
  const { id } = req.params;
  const { fullname, photo, description, status } = req.body;

  try {
    const response = await updateInstructorController(id, {
      fullname,
      photo,
      description,
      status,
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  createInstructorHandler,
  updateInstructorHandler,
  getInstructorHandler,
  getInstructorByIDHandler,
};
