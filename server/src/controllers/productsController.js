const { ProductServices, Categories } = require('../db')

const getProductServices = async () => {
    try {
        const allProducts = await ProductServices.findAll({include: Categories});
        return allProducts
    } catch (error) {
        throw new Error(error)
    }
}

const getProductServicesById = async (id) => {
    try {
        const product = await ProductServices.findByPk(id, {include: Categories});
        return product
    } catch (error) {
        throw new Error(error)
    }
}

const getProductServicesByName = async (name) => {
    try {
        const product = await ProductServices.findOne({where: {name}, include: Categories});
        return product
    } catch (error) {
        throw new Error(error)
    }
}

const createProductServices = async (name, price, description, status, code, image_url, stock, categories) => {
  try {
    const newProduct = await ProductServices.create({
        name,
        price,
        description,
        status,
        code,
        image_url,
        stock,
        });
    await newProduct.addCategories(categories);
    return {message: "Product created successfully"}
  } catch (error) {
    throw new Error(error)
  }
}



const updateProductServices = async (id, newData) => {
    try {
        const product = await ProductServices.findByPk(id);
        await product.update(newData);
        return product
    } catch (error) {
        throw new Error(error)
    }
}

const deleteProductServices = async (id) => {
    try {
        const product = await ProductServices.findByPk(id);
        await product.destroy();
        return {message: "Product deleted successfully"}
    } catch (error) {
        throw new Error(error)
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