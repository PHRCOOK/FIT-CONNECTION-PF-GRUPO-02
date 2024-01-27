const { Op } = require("sequelize");

const filterProducts = (category_id, minPrice, maxPrice) => {
    let products = {};

    if (category_id) {
        products.category_id = {
            [Op.eq]: category_id
        };
    }

    if (minPrice && maxPrice) {
        products.price = {
            [Op.between]: [minPrice, maxPrice],
        };
    };

    return products;
};

module.exports = filterProducts;
