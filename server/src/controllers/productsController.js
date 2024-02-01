const { ProductServices, Categories } = require("../db");
const {
  filterProducts,
  getPagination,
  getPagingData,
} = require("../../utils/filterProducts");

const { Op } = require("sequelize");

const getProductServices = async () => {
  try {
    const allProducts = await ProductServices.findAll({
      order: [["name", "ASC"]],
    });
    return { Items: allProducts };
  } catch (error) {
    throw new Error({ error: error.message });
  }
};

const getProductServicesById = async (id) => {
  try {
    const product = await ProductServices.findByPk(id);
    return product;
  } catch (error) {
    throw new Error({ error: error.message });
  }
};

const createProductServices = async (
  name,
  price,
  description,
  status,
  code,
  image_url,
  stock,
  category_id
) => {
  try {
    const verifyCode = await ProductServices.findOne({
      where: {
        code: code,
      },
    });

    if (verifyCode) {
      throw new Error("A product already exists with that code.");
    }

    // Buscamos la categoria correspondiente con el id proporcionado.
    const category = await Categories.findByPk(category_id);

    if (!category) {
      throw new Error("Categoría no encontrada.");
    }

    const product = await ProductServices.create({
      name,
      price,
      description,
      status,
      code,
      image_url,
      stock,
    });

    // Agregamos la categoría correspondiente al producto.
    await category.addProductServices(product);

    // Establecemos que un producto solo puede pertenecer a una categoría.
    await product.setCategories(category);

    return { message: "Producto creado con exito." };
  } catch (error) {
    throw new Error(`Error al crear el producto: ${error.message}`);
  }
};

const updateProductServices = async (id, newData) => {
  try {
    const product = await ProductServices.findByPk(id);
    await product.update(newData);
    return { message: "Producto actualizado exitosamente." };
  } catch (error) {
    throw new Error({ error: error.message });
  }
};

const deleteProductServices = async (id) => {
  try {
    const product = await ProductServices.findByPk(id);
    await product.destroy();
    return { message: "Product deleted successfully" };
  } catch (error) {
    throw new Error({ error: error.message });
  }
};

// ESTE ES EL CONROLLER DE  FILTROS Y ORDENAMIENTOS COMBINADOS

const filterAndOrder = async (
  sortOrder,
  minPrice,
  maxPrice,
  category_id,
  name,
  code,
  page,
  size
) => {
  try {
    //Establecemos la pagina en la que nos situamos, y la cantidad de items a mostrar por cada pagina
    const { limit, offset } = getPagination(page, size);
    const validate = sortOrder && sortOrder.toUpperCase();
    let whereClause = {};
    // Si se proporcionan minPrice y maxPrice, aplicar filtro por rango
    if (minPrice !== undefined && maxPrice !== undefined) {
      // Convertir las cadenas a números usando parseFloat
      const minPriceNum = parseFloat(minPrice);
      const maxPriceNum = parseFloat(maxPrice);

      // Verificar si las conversiones fueron exitosas
      if (!isNaN(minPriceNum) && !isNaN(maxPriceNum)) {
        const priceFilter = {
          price: {
            [Op.between]: [minPriceNum, maxPriceNum],
          },
        };
        whereClause = { ...whereClause, ...priceFilter };
      } else {
        throw new Error(
          "Los valores de minPrice y maxPrice deben ser números válidos."
        );
      }
    }
    //Si se proporciona category_id, name o code, aplicar filtro
    if (category_id || name || code) {
      const filterConditions = filterProducts(category_id, name, code);
      whereClause = { ...whereClause, ...filterConditions };
    }

    const orderClause = validate ? [["price", validate]] : undefined;
    //añadimos el limite y el offset y cambio el modo de findALl a findAndCountAll para que me devuelva
    //El total de items y el offsert que indica el desplazamiento nescesario para la pag deseada
    const productosFilteredandOrdered = await ProductServices.findAndCountAll({
      limit,
      offset,
      where: whereClause,
      order: orderClause,
    });

    if (productosFilteredandOrdered.length === 0) {
      throw new Error(
        "No existen productos que cumplan con los criterios de búsqueda."
      );
    }
    //productosFilteredandOrdered representa a la data de la consulta anterior
    //page representa el numero de la pagina actual que se esta solicitando
    //limit representa a la cantidad de items a mostrar por cada pagina
    const response = getPagingData(productosFilteredandOrdered, page, limit);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getProductServices,
  getProductServicesById,
  createProductServices,
  updateProductServices,
  deleteProductServices,
  filterAndOrder,
};
