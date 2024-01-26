const {getProductServices, getProductServicesById, getProductServicesByName, createProductServices, updateProductServices, deleteProductServices} = require('../controllers/productsController');
const { get } = require('../routes');

const getProductServicesHandler = async (req, res) => {
    try {
        const response = await getProductServices();
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error: error})
    };
}

const getProductServicesByIdHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await getProductServicesById(id);
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error: error})
    };
}

const getProductServicesByNameHandler = async (req, res) => {
    const { name } = req.params;
    try {
        const response = await getProductServicesByName(name);
        if (!response) {
            res.status(200).json({ message: "No se encontró un producto con ese nombre." }) // Devuelve un error 200 con un mensaje si no se encuentra un producto
        } else {
            res.status(200).json(response)
        }
    } catch (error) {
        res.status(400).json({error: error.message}) // Envía el mensaje de error en lugar del objeto de error
    };
}

const createProductServicesHandler = async (req, res) => {
    const { name, price, description, status, code, image_url, stock, categories } = req.body;
    try {
        const response = await createProductServices(name, price, description, status, code, image_url, stock, categories);
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error: error})
    };
}

const updateProductServicesHandler = async (req, res) => {
    const { id } = req.params;
    const { name, price, description, status, code, image_url, stock, categories } = req.body;
    try {
        const response = await updateProductServices(id, { name, price, description, status, code, image_url, stock, categories });
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error: error})
    };
}

const deleteProductServicesHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await deleteProductServices(id);
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error: error})
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