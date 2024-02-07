const { ProductServices } = require('../src/db')
const checkStockAvailability = async (details, transaction) => {
    for (const detail of details) {
        const product = await ProductServices.findByPk(detail.product_id, { transaction });
        if (!product || product.stock < detail.quantity) {
            throw new Error(`Producto con ID ${detail.product_id} no tiene suficiente stock.`);
        }
    }
};
const updateStock = async (status, details, transaction) => {
    if (!details || !Array.isArray(details)) {
        // Manejar el caso en que details no sea un array
        console.error("Invalid details value:", details);
        return;
    }
    const stockOperation = status !== "cancelled" ? 'decrement' : 'increment';

    for (const detail of details) {
        await ProductServices[stockOperation]('stock', {
            by: detail.quantity,
            where: { id: detail.product_id },
            transaction,
        });
    }
};

module.exports ={
    checkStockAvailability,
    updateStock
}