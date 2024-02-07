const { Op } = require("sequelize");

const filterProducts = (category_id, name, brand) => {
    const conditions = {};

    if (category_id) {
        conditions.category_id = {
            [Op.eq]: category_id
        };
    }

    if (name) {
        conditions.name = {
            [Op.iLike]: `%${name}%`,
        };
    }

    if (brand) {
        conditions.brand = {
            [Op.iLike]: `%${brand}%`,
        };
    }

    return conditions;
};
const getPagination = (page, size) => {
    // Verifica si 'size' existe y es mayor que 0, de lo contrario, establece 'limit' en 3
    const limit = size && +size>0 ? +size : 3;
    // Calcula el 'offset' (desplazamiento) en función del número de la página
    const offset = page ? (page - 1) * limit : 0;
    // Retorna un objeto con las propiedades 'limit' y 'offset'
    return { limit, offset };
  };
  const getPagingData = (data, page, limit) => {
    // Desestructura el objeto 'data' para obtener 'count' y 'rows'
    const { count: totalItems, rows: products } = data;
    // Asigna el valor de 'page' a 'currentPage', si 'page' existe; de lo contrario, asigna 0
    const currentPage = page ? +page : 0;
    // Calcula el número total de páginas necesarias para mostrar todos los elementos
    const totalPages = Math.ceil(totalItems / limit);
    //Retornamos en objeto con la info de paginacion
    return { totalItems, products, totalPages, currentPage };
  };
module.exports = {
    filterProducts,
    getPagination,
    getPagingData
};
