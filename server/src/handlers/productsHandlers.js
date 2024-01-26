const {getProductServices, getProductServicesById, getProductServicesByName, createProductServices, updateProductServices, deleteProductServices} = require('../controllers/productsController');

const getProductServicesHandler = async (req, res) => {
    try {
        const response = await getProductServices();
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error: error.message})
    };
}

const getProductServicesByIdHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await getProductServicesById(id);
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error: error.message})
    };
}

const getProductServicesByNameHandler = async (req, res) => {
    const { name } = req.query;
    try {
        const response = await getProductServicesByName(name);
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error: error.message})
    };
}

const createProductServicesHandler = async (req, res) => {
    const { name, price, description, status, code, image_url, stock, categories } = req.body;
    try {
        const response = await createProductServices(name, price, description, status, code, image_url, stock, categories);
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error: error.message})
    };
}

const updateProductServicesHandler = async (req, res) => {
    const { id } = req.params;
    const { name, price, description, status, code, image_url, stock, categories } = req.body;
    try {
        const response = await updateProductServices(id, { name, price, description, status, code, image_url, stock, categories });
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error: error.message})
    };
}

const deleteProductServicesHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await deleteProductServices(id);
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error: error.message})
    };
}



module.exports = {
    getProductServicesHandler,
    getProductServicesByIdHandler,
    getProductServicesByNameHandler,
    createProductServicesHandler,
    updateProductServicesHandler,
    deleteProductServicesHandler
};