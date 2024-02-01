const { Op } = require("sequelize");


const filterProducts = (category_id, name, code) => {
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

    if (code) {
        conditions.code = {
            [Op.iLike]: `%${code}%`,
        };
    }

    return conditions;
};

module.exports = filterProducts;
