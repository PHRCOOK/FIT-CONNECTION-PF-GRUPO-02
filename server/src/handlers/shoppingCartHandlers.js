const {
  createShoppingCart,
} = require("../controllers/shoppingCartControllers");

const createShoppingCartHandler = async (req, res) => {
  const { quantity, user_id, product_id } = req.body;

  if (!quantity || !user_id || !product_id) {
    res.status(400).json({ error: "Falta información para crear el carrito" });
  }
  try {
    const response = await createShoppingCart(quantity, user_id, product_id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createShoppingCartHandler,
};
