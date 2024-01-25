const { getCategoriesController, postCategoryController, deleteCategoryController } = require('../controllers/CategoriesController')
const getCategoriesHandler = async (req, res) => {
    try {
        //Buscamos todas las categorias y asignamos a categoria
        const categoria = await getCategoriesController();
        return res.status(200).json(categoria)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error interno del servidor.' });
    }
}
const postCategoryHandler = async (req, res) => {
    const { name, status, is_service } = req.body
    try {
        if (!name || typeof name !== 'string' || name.trim() === '') {
            return res.status(400).json({ error: 'Bad Request', message: 'El nombre es obligatorio y debe ser una cadena no vacía.' });
        }
        const response = await postCategoryController(name, status, is_service)
        return res.status(201).json({ response, message: 'Created' })
    } catch (error) {
        return res.status(409).json({ message: error.message })
    }
}
const deleteCategoryHandler = async (req, res) => {
    const { id } = req.params
    try {
        const delCategory = await deleteCategoryController(id)
        if (delCategory === 0) {
            return res.status(404).json({ error: 'Not Found' });
        }
        return res.status(201).json({ message: 'La categoria fue eliminada' })
    } catch (error) {
        return res.status(404).json({ error: error.message});
    }
}
module.exports = {
    getCategoriesHandler,
    postCategoryHandler,
    deleteCategoryHandler
}