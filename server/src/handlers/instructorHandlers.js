const { validateCreateInstructor } = require("../../utils/validations/validateCreateInstructor");
const {createInstructorController, updateInstructorController, 
  getInstructors, deleteInstructors} = require("../controllers/instructorControllers");


const getInstructorHandler = async (req, res) => {
  try {
      const instructor = await getInstructors()
      return res.status(200).json(instructor)
  } catch (error) {
      return res.status(404).json({ error: 'Not Found.', message: error.message });
  }
}
// Handler que permite manejar la creación de un instructor en la base de datos.
const createInstructorHandler = async (req, res) => {
  const { fullname, photo, description } = req.body;

  try {
    validateCreateInstructor({ fullname, photo, description });
    const response = await createInstructorController(
      fullname,
      photo,
      description
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

const deleteInstructorsHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await deleteInstructors(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}; 

module.exports = {
  createInstructorHandler,
  updateInstructorHandler,
  getInstructorHandler,
  deleteInstructorsHandler
};