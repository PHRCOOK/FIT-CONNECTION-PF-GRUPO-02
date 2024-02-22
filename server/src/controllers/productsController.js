const { ProductServices, Categories } = require("../db");
const {
  filterProducts,
  getPagination,
  getPagingData,
} = require("../../utils/filterProducts");
const { Op } = require("sequelize");

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
  brand,
  image_url,
  stock,
  category_id
) => {
  try {
    //   const productCode = await ProductServices.findOne({
    //     where: {
    //       code: code,
    //     },
    //   });
    //   if (productCode) {
    //     throw new Error("There is already a product with that code");
    //   }
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
      brand,
      image_url: image_url.path,
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
    const updatedProducts = await ProductServices.findAll();
    return {
      message: "Producto actualizado exitosamente.",
      products: updatedProducts,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

// ESTE ES EL CONROLLER DE  FILTROS Y ORDENAMIENTOS COMBINADOS

const filterAndOrder = async (
  sortOrder,
  minPrice,
  maxPrice,
  category_id,
  name,
  brand,
  page,
  size
) => {
  try {
    const { limit, offset } = getPagination(page, size);
    const validate = sortOrder && sortOrder.toUpperCase();
    let whereClause = {};
    let filterConditions = {};

    // Si se proporcionan minPrice y maxPrice, aplicar filtro por rango
    if (minPrice !== undefined && maxPrice !== undefined) {
      const minPriceNum = parseFloat(minPrice);
      const maxPriceNum = parseFloat(maxPrice);

      if (!isNaN(minPriceNum) && !isNaN(maxPriceNum)) {
        const priceFilter = {
          price: {
            [Op.between]: [minPriceNum, maxPriceNum],
          },
        };
        filterConditions = { ...filterConditions, ...priceFilter };
      } else {
        throw new Error(
          "Los valores de minPrice y maxPrice deben ser números válidos."
        );
      }
    } else if (minPrice !== undefined) {
      const minPriceNum = parseFloat(minPrice);

      if (!isNaN(minPriceNum)) {
        const priceFilter = {
          price: {
            [Op.gte]: minPriceNum,
          },
        };
        filterConditions = { ...filterConditions, ...priceFilter };
      } else {
        throw new Error("El valor de minPrice debe ser un número válido.");
      }
    } else if (maxPrice !== undefined) {
      const maxPriceNum = parseFloat(maxPrice);

      if (!isNaN(maxPriceNum)) {
        const priceFilter = {
          price: {
            [Op.lte]: maxPriceNum,
          },
        };
        filterConditions = { ...filterConditions, ...priceFilter };
      } else {
        throw new Error("El valor de maxPrice debe ser un número válido.");
      }
    }
    // aqui combina por nombre , id y marca

    if (category_id || name || brand) {
      filterConditions = {
        ...filterConditions,
        ...filterProducts(category_id, name, brand),
      };
    }

    whereClause = { ...whereClause, ...filterConditions };

    const orderClause = validate ? [["price", validate]] : undefined;

    const productosFilteredandOrdered = await ProductServices.findAndCountAll({
      limit,
      offset,
      where: whereClause,
      order: orderClause,
    });
    const response = getPagingData(productosFilteredandOrdered, page, limit);
    return response;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

module.exports = {
  getProductServicesById,
  createProductServices,
  updateProductServices,
  filterAndOrder,
};
