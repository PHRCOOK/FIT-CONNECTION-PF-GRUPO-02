const { Categories } = require('../db')

const getCategoriesController = async () => {
    //Asignamos a categories todas las categorias
    const categories = await Categories.findAll();
    //verificamos que no este vacia
    if (categories.length === 0){ throw new Error('No existen categorias')}
    //retornamos las categorias de no entrar en el if anterior
    return categories
}
const postCategoriesController = async (name, status, is_service) => {
    try {
        //Buscamos en la entidad si esta creada, y si no lo esta procedemos a crear la categoria
        //si la categoria ya existe la constante "create sera False"
        //si la categoria no existe pasaremos a crear la categoria y la constante create sera True
        const [existOrNot, create] = await Categories.findOrCreate(
            {
                where: { name }, defaults: { name, status, is_service }
            }
        )
        //verificamos si create es falso.. de serlo ya existe la categoria
        if (!create) throw new Error("Ya existe esta categoria.")
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
}