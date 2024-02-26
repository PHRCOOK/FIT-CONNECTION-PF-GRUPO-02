const {
  validateMembership,
} = require("../../utils/validations/validateMembership");
const {
  getAllMemberships,
  getMembershipById,
  createMembership,
  updateMembership,
  deleteMembership,
} = require("../controllers/membershipController");

const getAllMembershipsHandler = async (req, res) => {
  try {
    const response = await getAllMemberships();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMembershipByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await getMembershipById(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createMembershipHandler = async (req, res) => {
  const { name, price, duration, description, status } = req.body;
  const image_url = req.file;
  console.log(
    "name",
    name,
    "price",
    price,
    "duration",
    duration,
    "description",
    description,
    "status",
    status
  );
  try {
    validateMembership({ name, price, duration, description });
    const response = await createMembership(
      name,
      price,
      duration,
      description,
      status,
      image_url
    );
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateMembershipHandler = async (req, res) => {
  const { id } = req.params;
  const { name, price, duration, description, status } = req.body;
  const image_url = req.file;
  console.log(id);
  console.log(req.body);
  console.log(req.file);
  try {
    const response = await updateMembership(id, {
      name,
      price,
      duration,
      image_url,
      description,
      status,
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteMembershipHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await deleteMembership(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllMembershipsHandler,
  getMembershipByIdHandler,
  createMembershipHandler,
  updateMembershipHandler,
  deleteMembershipHandler,
};
