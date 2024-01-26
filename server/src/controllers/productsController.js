const { ProductServices, Categories } = require('../db')
const { Op } = require("sequelize");

const getProductServices = async () => {
    try {
        const allProducts = await ProductServices.findAll();
        return allProducts
    } catch (error) {
        throw new Error({error: error.message})
    }
}

const getProductServicesById = async (id) => {
    try {
        const product = await ProductServices.findByPk(id);
        return product
    } catch (error) {
        throw new Error({error: error.message})
    }
}

const getProductServicesByName = async (name) => {
    try {
        const product = await ProductServices.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            },
        });
        console.log(product);
        if (!product) {
            return null
        };
        return product
    } catch (error) {
        console.log(error);
        throw new Error(error.message)
    }
}

const createProductServices = async (name, price, description, status, code, image_url, stock, categories) => {
    try {
        const product = await ProductServices.create({
            name,
            price,
            description,
            status,
            code,
            image_url,
            stock,
            categories
        });
        return product
    } catch (error) {
        throw new Error({error: error.message})
    }
}  


const updateProductServices = async (id, newData) => {
    try {
        const product = await ProductServices.findByPk(id);
        await product.update(newData);
        return product
    } catch (error) {
        throw new Error({error: error.message})
    }
}

const deleteProductServices = async (id) => {
    try {
        const product = await ProductServices.findByPk(id);
        await product.destroy();
        return {message: "Product deleted successfully"}
    } catch (error) {
        throw new Error({error: error.message})
    }
}

module.exports = {
    getProductServices,
    getProductServicesById,
    getProductServicesByName,
    createProductServices,
    updateProductServices,
    deleteProductServices,

}