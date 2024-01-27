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
            [Op.eq]: name,
        };
    }

    if (code) {
        conditions.code = {
            [Op.eq]: code,
        };
    }

    return conditions;
};

module.exports = filterProducts;


module.exports = filterProducts;
