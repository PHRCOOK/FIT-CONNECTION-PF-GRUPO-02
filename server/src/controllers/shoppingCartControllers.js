const { ShoppingCart, ProductServices } = require("../db");

//? Controlador para crear un carrito de compra
const createShoppingCart = async (quantity, user_id, product_id) => {
  try {
    await ShoppingCart.create({ quantity, user_id, product_id });

    return { message: "Carro de compra creado exitosamente." };
  } catch (error) {
    throw new Error(`Error al crear el carro de compra : ${error.message}`);
  }
};

//? controlador para buscar todos los carritos por un id de usuario

const getShoppingCarts = async (user_id) => {
  const products = [];
  try {
    const carts = await ShoppingCart.findAll({ where: { user_id } });
    if (!carts.length) {
      throw new Error(`No existe un carro de compra asociado al id de usuario ${user_id}`);
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

          //? verificar si el producto ya esta en el array
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
    throw new Error(`Error buscando el carro de compra : ${error.message}`);
  }
};

const deleteShoppingCarts = async (user_id, product_id) => {
  const shoppingCarts = await getShoppingCarts(user_id);

  if (!shoppingCarts.length > 0) {
    throw new Error("No hay carro de compra para ese usuario");
  }
  try {
    await ShoppingCart.destroy({
      where: {
        user_id,
        product_id,
      },
    });
    return "Carro de compra eliminado correctamente.";
  } catch (error) {
    throw new Error("Error al eliminar el carro de compra :", error);
  }
};

const deleteAllCarts = async (user_id) => {
  const shoppingCarts = await getShoppingCarts(user_id);

  if (!shoppingCarts.length > 0) {
    throw new Error("No hay carro de compra para ese usuario");
  }

  try {
    await ShoppingCart.destroy({
      where: {
        user_id,
      },
    });
    return "Carro de compra eliminado correctamente.";
  } catch (error) {
    throw new Error("Error al eliminar el carro de compra:", error);
  }
};
module.exports = {
  createShoppingCart,
  getShoppingCarts,
  deleteShoppingCarts,
  deleteAllCarts,
};