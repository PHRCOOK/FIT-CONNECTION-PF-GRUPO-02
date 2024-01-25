const { Categories } = require('../db')

const getCategoriesController = async () => {
    const categories = await Categories.findAll()
    if (!categories) throw new Error('No existen categorias')
    return categories
}

const getByIdCategoriesController = async (id) => {
    const category = await Categories.findAll(
        {
            where: {
                id: `${id}`
            }
        }
    )
    if (!category) throw new Error('No existe esta categoria')
    return category
}
const postCategoriesController = async (name, status, is_service) => {
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

const putCategoriesController = async (id, updateData) => {
    console.log({ updateData })
    try {
        const [putRowCount, putCategorie] = await Categories.update(updateData, {
            where: {
                id: `${id}`,
            }
        })
        if (putRowCount === 0) {
            throw new Error('Categoria no encontrada');
        }
        return ({ message: "categoria Actualizada" })
    } catch (error) {
        throw new Error(`Error al actualizar la categoria: ${error.message}`);
    }
}

const deleteCategoriesController = async (id) => {
    try {
        const delCategory = await Categories.destroy(
            {
                where: {
                    id: `${id}`,
                }
            }
        )
        if (!delCategory) throw new Error("Esta categoria no existe, Por ende no puede ser eliminada.")
        return delCategory
    } catch (error) {
        throw new Error(`Error al eliminar la categoria: ${error.message}`)
    }
}

module.exports = {
    getCategoriesController,
    putCategoriesController,
    postCategoriesController,
    deleteCategoriesController,
    getByIdCategoriesController
}