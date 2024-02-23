const {
  createMembershipPurchase,
  getMembershipPurchases,
  getMembershipPurchaseById,
  getMembershipPurchasesByUserId,
  updateMembershipPurchase,
  deleteMembershipPurchase,
} = require("../controllers/membershipPurchaseController");

const createMembershipPurchaseHandler = async (req, res) => {
  const { membership_id, user_id, payment_method } = req.body;

  try {
    const purchase = await createMembershipPurchase(
      Number(user_id),
      membership_id,
      payment_method
    );
    res.status(201).json(purchase);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getMembershipPurchasesHandler = async (req, res) => {
  try {
    const purchases = await getMembershipPurchases();
    res.status(200).json(purchases);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getMembershipPurchaseByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const purchase = await getMembershipPurchaseById(id);
    res.status(200).json(purchase);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getMembershipPurchasesByUserIdHandler = async (req, res) => {
  const { user_id } = req.params;
  try {
    const purchases = await getMembershipPurchasesByUserId(user_id);
    res.status(200).json(purchases);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateMembershipPurchaseHandler = async (req, res) => {
  const { id } = req.params;
  const newData = req.body;
  try {
    const purchase = await updateMembershipPurchase(id, newData);
    res.status(200).json(purchase);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteMembershipPurchaseHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await deleteMembershipPurchase(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createMembershipPurchaseHandler,
  getMembershipPurchasesHandler,
  getMembershipPurchaseByIdHandler,
  getMembershipPurchasesByUserIdHandler,
  updateMembershipPurchaseHandler,
  deleteMembershipPurchaseHandler,
};
