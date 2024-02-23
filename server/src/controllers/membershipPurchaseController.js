const { Membership, MembershipPurchase } = require("../db");

const createMembershipPurchase = async (user_id, membership_id, payment_method, status) => {
  try {
    // Obtén la membresía de la base de datos
    const membership = await Membership.findByPk(membership_id);

    if (!membership) {
      throw new Error("No se encontró la membresía correspondiente");
    }
    // La fecha de inicio es la fecha actual
    const start_date = new Date();

    // La fecha de expiración es la fecha de inicio más la duración de la membresía
    const expiration_date = new Date(start_date);
    expiration_date.setDate(expiration_date.getDate() + membership.duration);

    // La fecha de compra es la misma que la fecha de inicio
    const payment_date = start_date;

    const purchase = await MembershipPurchase.create({
      user_id,
      membership_id,
      start_date,
      expiration_date,
      payment_method,
      payment_date,
      status
    });

    return purchase;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getMembershipPurchases = async () => {
    try {
        const membershipPurchases = await MembershipPurchase.findAll()
        return membershipPurchases
    } catch (error) {
        throw new Error(error.message)
    }
}

const getMembershipPurchaseById = async (id) => {
    try {
        const membershipPurchase = await MembershipPurchase.findByPk(id)
        return membershipPurchase
    } catch (error) {
        throw new Error(error.message)
    }
}

const getMembershipPurchasesByUserId = async (user_id) => {
    try {
        const membershipPurchases = await MembershipPurchase.findAll({
            where: {
                user_id
            }
        })
        return membershipPurchases
    } catch (error) {
        throw new Error(error.message)
    }
}

const updateMembershipPurchase = async (id, newData) => {
    try {
        const membershipPurchase = await MembershipPurchase.findByPk(id)
        await membershipPurchase.update(newData)
        return membershipPurchase
    } catch (error) {
        throw new Error(error.message)
    }
}

const deleteMembershipPurchase = async (id) => {
    try {
        const membershipPurchase = await MembershipPurchase.findByPk(id)
        await membershipPurchase.destroy()
        return { message: "Compra de membresía eliminada exitosamente." }
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = {
    createMembershipPurchase,
    getMembershipPurchases,
    getMembershipPurchaseById,
    getMembershipPurchasesByUserId,
    updateMembershipPurchase,
    deleteMembershipPurchase
}