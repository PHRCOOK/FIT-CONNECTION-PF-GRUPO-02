const { validateCategory } = require("../../utils/validations/validateCategory");
const {
  getAllCategoriesController,
  postCategoriesController,
  putCategoriesController,
} = require("../controllers/CategoriesController");

const getAllCategoriesHandler = async (req, res) => {
  try {
    //Buscamos todas las categorias y asignamos a categoria
    const categoria = await getAllCategoriesController();
    return res.status(200).json(categoria);
    // return res.status(200).json({items: categories}) ejemplo
  } catch (error) {
    return res
      .status(404)
      .json({ error: "No encontrada.", message: error.message });
  }
};
const postCategoriesHandler = async (req, res) => {
  const { name, status, is_service } = req.body;
  try {
    validateCategory(name)
    if (!name || typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({
        error: "Solicitud incorrecta",
        message: "El nombre es obligatorio y debe ser una cadena no vacía.",
      });
    }
    const response = await postCategoriesController(name, status, is_service);
    return res.status(201).json({ response, message: "Creado" });
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};
const putCategoriesHandler = async (req, res) => {
  const { id } = req.params;
  const { name, status, is_service } = req.body;
  try {
    const response = await putCategoriesController(id, {
      name,
      status,
      is_service,
    });
    return res.status(200).json({ response });
  } catch (error) {
    console.error(error.message)
    return res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getAllCategoriesHandler,
  postCategoriesHandler,
  putCategoriesHandler,
};
