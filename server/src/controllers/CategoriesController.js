const { Categories } = require("../db");

const getAllCategoriesController = async () => {
  try {
    //Asignamos a categories todas las categorias
    const categories = await Categories.findAll();
    //verificamos que no este vacia
    if (categories.length === 0) {
      throw new Error("No existen categorias");
    }
    //retornamos las categorias de no entrar en el if anterior

    return { Items: categories };
  } catch (error) {
    throw new Error(error.message);
  }
};
const postCategoriesController = async (name, status, is_service) => {
  try {
    //Buscamos en la entidad si esta creada, y si no lo esta procedemos a crear la categoria
    //si la categoria ya existe la constante "create sera False"
    //si la categoria no existe pasaremos a crear la categoria y la constante create sera True
    const [existOrNot, create] = await Categories.findOrCreate({
      where: { name },
      defaults: { name, status, is_service },
    });
    //verificamos si create es falso.. de serlo ya existe la categoria
    if (!create) throw new Error("Ya existe esta categoria.");
    return existOrNot;
  } catch (error) {
    throw new Error(`Error al crear la categoria: ${error.message}`);
  }
};

const putCategoriesController = async (id, updateData) => {
  try {
    const [putRowCount, putCategorie] = await Categories.update(updateData, {
      where: {
        id: `${id}`,
      },
    });
    if (putRowCount === 0) {
      throw new Error("Categoria no encontrada");
    }
    const updatedCategories = await Categories.findAll();
    return {
      message: "Categoría actualizada",
      categories: updatedCategories,
    };
  } catch (error) {
    throw new Error(`Error al actualizar la categoria: ${error.message}`);
  }
};

module.exports = {
  getAllCategoriesController,
  putCategoriesController,
  postCategoriesController,
};
