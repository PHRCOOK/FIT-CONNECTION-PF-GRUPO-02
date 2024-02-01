const { ShoppingCart, ProductServices } = require("../db");

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
  const products = [];
  try {
    const carts = await ShoppingCart.findAll({ where: { user_id } });
    if (!carts.length) {
      throw new Error(`No hay carritos asociados al id de usuario ${user_id}`);
    }
    await Promise.all(
      carts.map(async (cart) => {
        let product = await ProductServices.findAll({
          where: { id: cart.product_id },
        });

        // Verificar si product es un array antes de asignar quantity
        if (Array.isArray(product) && product.length > 0) {
          const productWithQuantity = {
            ...product[0].dataValues,
            quantity: cart.quantity,
          };

          //! verificar si el producto ya esta en el array
          for (let i = 0; i < products.length; i++) {
            if (productWithQuantity.id === products[i].id) {
              products[i].quantity =
                products[i].quantity + productWithQuantity.quantity;
              return;
            }
          }

          products.push(productWithQuantity);
        }
      })
    );
    return products;
  } catch (error) {
    throw new Error(`Error buscando los carritos: ${error.message}`);
  }
};

module.exports = {
  createShoppingCart,
  getShoppingCarts,
};
