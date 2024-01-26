const { getAllCategoriesController, postCategoriesController, deleteCategoriesController, putCategoriesController,  } = require('../controllers/CategoriesController');

const getAllCategoriesHandler = async (req, res) => {
    try {
        //Buscamos todas las categorias y asignamos a categoria
        const categoria = await getAllCategoriesController();
        return res.status(200).json(categoria);
    } catch (error) {
        return res.status(404).json({ error: 'Not Found.', message: error.message});
    }
}
const postCategoriesHandler = async (req, res) => {
    const { name, status, is_service } = req.body;
    try {
        if (!name || typeof name !== 'string' || name.trim() === '') {
            return res.status(400).json({ error: 'Bad Request', message: 'El nombre es obligatorio y debe ser una cadena no vacía.' });
        }
        const response = await postCategoriesController(name, status, is_service);
        return res.status(201).json({ response, message: 'Created' });
    } catch (error) {
        return res.status(409).json({ message: error.message });
    }
}
const putCategoriesHandler = async (req, res) =>{
    const { id } = req.params;
    const { name, status, is_service } = req.body;
    try {
        const response = await putCategoriesController(id, {name, status, is_service});
        return res.status(200).json({response});
    } catch (error) {
        return res.status(409).json({ message: error.message });
    }
}
const deleteCategoriesHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const delCategory = await deleteCategoriesController(id);
        if (delCategory === 0) {
            return res.status(404).json({ error: 'Not Found' });
        }
        return res.status(201).json({ message: 'La categoria fue eliminada' });
    } catch (error) {
        return res.status(404).json({ error: error.message});
    }
}
module.exports = {
    getAllCategoriesHandler,
    postCategoriesHandler,
    deleteCategoriesHandler,
    putCategoriesHandler,
}