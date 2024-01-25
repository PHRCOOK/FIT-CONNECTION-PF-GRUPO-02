const { getCategoriesController, postCategoryController } = require('../controllers/CategoriesController')
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
const postCategoryHandler = async (req, res) =>{
    const { name, status, is_service } = req.body
    try {
        if(!name) return res.status(400).json(`Bad Request`)
        const response = await postCategoryController(name, status, is_service)
        return res.status(201).json({response, message: 'Created' })
    } catch (error) {
       return res.status(409).json({message: error.message})
    }
}
module.exports = {
    getCategoriesHandler,
    postCategoryHandler
}