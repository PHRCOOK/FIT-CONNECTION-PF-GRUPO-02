const { Router } = require('express');
const { getCategories, putCategory, postCategory, deleteCategory } = require('../../controllers/ProductsController/CategoriesController')
const router = Router();
router.get('/', getCategories)
router.put('/updatecategorias/:id', putCategory);
router.post('/addcategoria', postCategory);
router.delete('/delCategory/:id', deleteCategory);
module.exports = router;