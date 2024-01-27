const { ShoppingCart } = require("../db");

//? Controlador para crear un carrito de compra
const createShoppingCart = async (quantity, user_id, product_id) => {
  try {
    await ShoppingCart.create({ quantity, user_id, product_id });

    return { message: "Carrito creado exitosamente." };
  } catch (error) {
    throw new Error(`Error al crear carrito: ${error.message}`);
  }
};

//? controlador para buscar todos los carritos por un id de usuario

const getShoppingCarts = async (user_id) => {
  try {
    const carts = await ShoppingCart.findAll({ where: { user_id } });
    if (!carts.length)
      throw new Error(`No hay carritos asociados al id de usuario ${user_id}`);
    return carts;
  } catch (error) {
    throw new Error(`Error buscando los carritos: ${error.message}`);
  }
};

module.exports = {
  createShoppingCart,
  getShoppingCarts,
};
