const { Categories } = require('../db')
const getCategoriesController = async () => {
    const categories = await Categories.findAll()
    if (!categories) throw new Error('No existen categorias')
    return categories
}
const postCategoryController = async (name, status, is_service) => {
    try {
        const [existOrNot, create] = await Categories.findOrCreate(
            {
                where: { name }, defaults: { name, status, is_service }
            }
        )
        if (!create) {
            throw new Error("Ya existe esta categoria.")
        };
        return existOrNot
    } catch (error) {
        throw new Error(`Error al crear la categoria: ${error.message}`);
    }
}

const putCategory = async (req, res) => {
    const { id } = req.params
    const { name, status, is_service } = req.body
    try {
        const [putRowCount, putCategorie] = await Categories.update({ name: name, status: status, is_service: is_service }, {
            where: {
                id: `${id}`,
            }
        })
        if (putRowCount === 0) {
            return res.status(404).json({ error: 'Nave no encontrado' });
        }
        return res.status(200).json({ message: 'Categoria actualizado correctamente', putCategorie });
    } catch {
        console.error(error);

        if (error.name === 'SequelizeConnectionError') {
            return res.status(500).json({ error: 'Error de conexión con la base de datos.', message: error.message });
        }

        return res.status(500).json({ error: 'Error interno del servidor.', message: error.message });
    }
}

const deleteCategoryController = async (id) => {
    try {
        const delCategory = await Categories.destroy(
            {
                where: {
                    id: `${id}`,
                }
            }
        )
        if(!delCategory) throw new Error("Esta categoria no existe, Por ende no puede ser eliminada.")
        return delCategory
    } catch (error) {
        throw new Error(`Error al eliminar la categoria: ${error.message}`)
    }
}

module.exports = {
    getCategoriesController,
    putCategory,
    postCategoryController,
    deleteCategoryController
}