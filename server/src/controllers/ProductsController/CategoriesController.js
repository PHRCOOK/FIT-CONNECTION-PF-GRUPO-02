const { Categories } = require('../../db')
//Query a todas las categorias
const getCategories = async (req, res) => {
    try {
        //Buscamos todas las categorias y asignamos a categoria
        const categoria = await Categories.findAll();
        //enviamos la respuesta con estatus 200 y la lista de categorias
        return res.status(200).json(categoria)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error interno del servidor.' });
    }
}
const postCategory = async (req, res) =>{
    const { name, status, is_services } = req.body
    try {
        if(!name) return res.status(400).json(`Bad Request`)
        const [existOrNot, create] = await Categories.findOrCreate(
            {
                where: { name }, defaults: { name, status, is_services }
            }
        )
        if (!create) {
            return res.status(409).json({ error: 'Conflict', message: 'no pueden haber duplicados' });
        }
        return res.status(201).json({ message: 'Created' })
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ error: 'Conflict', message: error.message });
        } else if (error.name === 'SequelizeConnectionError') {
            return res.status(500).json({ error: 'Internal Server Error', message: error.message });
        } else {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error', message: error.message });
        }
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

const deleteCategory = async(req, res) =>{
    const { id } = req.params
try {
    const delCategory = await Category.destroy(
        {
            where: {
                id: `${id}`,
            }
        }
    )
    if (delCategory === 0) {
        return res.status(404).json({ error: 'Not Found' });
    }
    return res.status(201).json({ message: 'La categoria fue eliminada' })
} catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error interno del servidor.' });
}
}

module.exports = {
    getCategories,
    putCategory,
    postCategory,
    deleteCategory
}