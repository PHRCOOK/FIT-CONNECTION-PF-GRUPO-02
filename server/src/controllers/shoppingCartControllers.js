const { ShoppingCart } = require("../db");

const createShoppingCart = async (quantity, user_id, product_id) => {
  try {
    await ShoppingCart.create({ quantity, user_id, product_id });

    return { message: "Carrito creado exitosamente." };
  } catch (error) {
    throw new Error(`error al crear carrito: ${error.message}`);
  }
};

module.exports = {
  createShoppingCart,
};
