const { Membership } = require("../db");

const getAllMemberships = async () => {
  try {
    const memberships = await Membership.findAll();
    return memberships;
  } catch (error) {
    throw new Error({ error: error.message });
  }
};

const getMembershipById = async (id) => {
  try {
    const membership = await Membership.findByPk(id);
    return membership;
  } catch (error) {
    throw new Error({ error: error.message });
  }
};

const createMembership = async (
  name,
  price,
  duration,
  description,
  status,
  image_url
) => {
  try {
    const membership = await Membership.create({
      name,
      price,
      duration,
      description,
      status,
      image_url: image_url.path,
    });
    return membership;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateMembership = async (id, newData) => {
  try {
    const membership = await Membership.findByPk(id);
    await membership.update(newData);
    return membership;
  } catch (error) {
    throw new Error({ error: error.message });
  }
};

const deleteMembership = async (id) => {
  try {
    const membership = await Membership.findByPk(id);
    await membership.destroy();
    return { message: "Membresía eliminada exitosamente." };
  } catch (error) {
    throw new Error({ error: error.message });
  }
};

module.exports = {
  getAllMemberships,
  getMembershipById,
  createMembership,
  updateMembership,
  deleteMembership,
};
