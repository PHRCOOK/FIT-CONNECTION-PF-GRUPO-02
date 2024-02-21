const {getAllMemberships ,getMembershipById, createMembership, updateMembership, deleteMembership} = require('../controllers/membershipController');

const getAllMembershipsHandler = async (req, res) => {
    try {
        const response = await getAllMemberships();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    }

const getMembershipByIdHandler = async (req, res) => {
    const {id} = req.params;
  try {
    const response = await getMembershipById(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const createMembershipHandler = async (req, res) => {
  const {name, price, start_date, expiration_date, duration, description, status} = req.body;
  const image_url = req.file;
  try {
    const response = await createMembership(name, price, start_date, expiration_date, duration, description, status, image_url);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const updateMembershipHandler = async (req, res) => {
    const {id} = req.params;
    const {name, price, start_date, expiration_date, duration, image_url, description, status} = req.body;
    try {
        const response = await updateMembership(id, {name, price, start_date, expiration_date, duration, image_url, description, status});
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteMembershipHandler = async (req, res) => {
    const {id} = req.params;
    try {
        const response = await deleteMembership(id);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getAllMembershipsHandler,
    getMembershipByIdHandler,
    createMembershipHandler,
    updateMembershipHandler,
    deleteMembershipHandler
}