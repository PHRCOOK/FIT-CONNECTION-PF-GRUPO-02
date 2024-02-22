const { getPurchasesController } = require('../controllers/purchasesController');

const getPurchasesHandler = async (req, res) => {
    try {
        const response = await getPurchasesController();
        res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({ error: 'No encontrado', message: error.message});
    }
}

module.exports={
    getPurchasesHandler,
}