const { ShoppingCart, ProductServices, Membership } = require("../db");

//? Controlador para crear un carrito de compra
const createShoppingCart = async (quantity, user_id, item_type, item_id) => {
  try {
    // Verificar si el item_type es válido
    if (item_type !== 'product' && item_type !== 'membership') {
      throw new Error(`Invalid item_type: ${item_type}`);
    }

    await ShoppingCart.create({ quantity, user_id, item_type, item_id });

    return { message: "Carrito creado exitosamente." };
  } catch (error) {
    throw new Error(`Error al crear carrito: ${error.message}`);
  }
};

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
        if (cart.item_type === 'product') {
          item = await ProductServices.findAll({
            where: { id: cart.item_id },
          });
        } else if (cart.item_type === 'membership') {
          item = await Membership.findAll({
            where: { id: cart.item_id },
          });
        }

        console.log(`Fetched item: ${JSON.stringify(item)}`);

        // Verificar si item es un array antes de asignar quantity
        if (Array.isArray(item) && item.length > 0) {
          const itemWithQuantity = {
            ...item[0].dataValues,
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
    throw new Error(`Error buscando los carritos: ${error.message}`);
  }
};

const deleteShoppingCarts = async (user_id, item_type, item_id) => {
  const shoppingCarts = await getShoppingCarts(user_id);

  if (!shoppingCarts.length > 0) {
    throw new Error("No hay carrito de compras para ese usuario");
  }
  try {
    await ShoppingCart.destroy({
      where: {
        user_id,
        item_type,
        item_id,
      },
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
