const {
  createShoppingCart,
  getShoppingCarts,
  deleteShoppingCarts,
  deleteAllCarts,
} = require("../controllers/shoppingCartControllers");

//? handler para crear un carrito
const createShoppingCartHandler = async (req, res) => {
  const { quantity, user_id, item_type, item_id } = req.body;

  if (!quantity || !user_id || !item_type || !item_id) {
    res.status(400).json({ error: "Faltan datos para crear un carrito" });
    return;
  }
  try {
    const response = await createShoppingCart(quantity, user_id, item_type, item_id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//* handler para obtener carritos con un user_id

const getShoppingCartsHandler = async (req, res) => {
  const { user_id } = req.params;
  if (!user_id) {
    res.status(400).json({ error: "no se ha proporcionado un id de usuario" });
    return;
  }
  if (isNaN(Number(user_id))) {
    res.status(400).json({ error: "El id de usuario debe ser númerico" });
    return;
  }

  try {
    const carts = await getShoppingCarts(Number(user_id));

    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//* handler para eliminar un carrito

const deleteShoppingCartsHandler = async (req, res) => {
  const {user_id, item_type, item_id} = req.params;
  if (!user_id || !item_type || !item_id) {
    res.status(400).json({ error: "Faltan datos para eliminar el carrito" });
  }

  try {
    const response = await deleteShoppingCarts(user_id, item_type, item_id);
    console.log(response);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteAllCartsHandler = async (req, res) => {
  const { user_id } = req.params;
  if (!user_id) {
    res.status(400).json({ error: "Faltan datos para eliminar los carritos" });
  }

  try {
    const response = await deleteAllCarts(user_id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createShoppingCartHandler,
  getShoppingCartsHandler,
  deleteShoppingCartsHandler,
  deleteAllCartsHandler,
};
