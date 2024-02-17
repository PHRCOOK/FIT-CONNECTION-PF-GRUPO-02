const { ShoppingCart, ProductServices, Membership } = require("../db");

//? Controlador para crear un carrito de compra
const createShoppingCart = async (quantity, user_id, product_id, membership_id) => {
  try {
    const shoppingCart = await ShoppingCart.create({
      quantity,
      user_id,
      product_id,
      membership_id,
    });
    return shoppingCart;
  } catch (error) {
    console.log(`Error creando el carrito de compras: ${error.message}`);
    throw new Error(`Error creando el carrito de compras: ${error.message}`);
  }
}

//? controlador para buscar todos los carritos por un id de usuario

const getShoppingCarts = async (user_id) => {
  const items = [];
  try {
    const carts = await ShoppingCart.findAll({ where: { user_id } });
    if (!carts.length) {
      throw new Error(`No hay carritos asociados al id de usuario ${user_id}`);
    }
    await Promise.all(
      carts.map(async (cart) => {
        let item;
        if (cart.product_id) {
          item = await ProductServices.findOne({
            where: { id: cart.product_id },
          });
        } else if (cart.membership_id) {
          item = await Membership.findOne({
            where: { id: cart.membership_id },
          });
        }

        console.log(`Fetched item: ${JSON.stringify(item)}`);

        if (item) {
          const itemWithQuantity = {
            ...item.get(),
            quantity: cart.quantity,
          };

          //? verificar si el item ya esta en el array
          for (let i = 0; i < items.length; i++) {
            if (itemWithQuantity.id === items[i].id) {
              items[i].quantity =
                items[i].quantity + itemWithQuantity.quantity;
              return;
            }
          }

          items.push(itemWithQuantity);
        }
      })
    );
    return items;
  } catch (error) {
    console.log(`Error buscando los carritos: ${error.message}`);
    throw new Error(`Error buscando los carritos: ${error.message}`);
  }
};

const deleteShoppingCarts = async (user_id, product_id, membership_id) => {
  const shoppingCarts = await getShoppingCarts(user_id);

  if (!shoppingCarts.length > 0) {
    throw new Error("No hay carrito de compras para ese usuario");
  }
  try {
    let whereClause = {
      user_id,
    };

    if (product_id) {
      whereClause.product_id = product_id;
    } else if (membership_id) {
      whereClause.membership_id = membership_id;
    }

    await ShoppingCart.destroy({
      where: whereClause,
    });
    return "Shopping cart eliminado correctamente.";
  } catch (error) {
    throw new Error("Error al eliminar shopping cart:", error);
  }
};


const deleteAllCarts = async (user_id) => {
  const shoppingCarts = await getShoppingCarts(user_id);

  if (!shoppingCarts.length > 0) {
    throw new Error("No hay carritos de compras para ese usuario");
  }

  try {
    await ShoppingCart.destroy({
      where: {
        user_id,
      },
    });
    return "Shopping cart eliminado correctamente.";
  } catch (error) {
    throw new Error("Error al eliminar shopping cart:", error);
  }
};
module.exports = {
  createShoppingCart,
  getShoppingCarts,
  deleteShoppingCarts,
  deleteAllCarts,
};
