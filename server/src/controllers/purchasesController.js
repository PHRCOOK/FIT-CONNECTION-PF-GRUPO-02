const { Purchases, PurchaseDetail } = require('../db');
const { sequelize } = require('../db');

const postPurchasesController = async (req, res) => {
    const { payment_method, payment_date, status, user_id, details } = req.body;
    console.log(req.body)
    try {
        if (!payment_method || !payment_date || !status || !user_id || !details) {
            return res.status(400).json({ error: "Faltan datos" });
        }
        await sequelize.transaction(async (t) => {
            const purchase = await Purchases.create(
                { payment_method, payment_date, status, user_id },
                { transaction: t }
            );
            const purchase_id = purchase.id;
            await Promise.all(
                details.map(async (detail) => {
                    await PurchaseDetail.create(
                        {
                            product_id: detail.product_id,
                            quantity: detail.quantity,
                            purchase_id: purchase_id,
                        },
                        { transaction: t }
                    );
                })
            );
        });
        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const getPurchasesController = async () => {
    try {
        const purchases = await Purchases.findAll({
            include: [{
                model: PurchaseDetail,
                as: 'PurchaseDetail',
                foreignKey: 'purchase_id'
            }]
        })
        if (purchases.length === 0) throw new Error("No existen Compras");
        const purchasesWithDetails = purchases.reduce((result, purchase) => {
            const purchaseId = purchase.id;
            if (!result[purchaseId]) {
                result[purchaseId] = {
                    ...purchase.toJSON(),
                    PurchaseDetails: purchase.PurchaseDetails
                };
            } else {
                result[purchaseId].PurchaseDetails = (result[purchaseId].PurchaseDetails).concat(purchase.PurchaseDetails);
            }

            return result;
        }, {});

        // Devolver un array de objetos en lugar de un objeto
        const result = Object.values(purchasesWithDetails);
        return result
    } catch (error) {
        throw new Error(`Error al cargar las compras  ${error.message}`);
    }
}

module.exports = {
    postPurchasesController,
    getPurchasesController
};