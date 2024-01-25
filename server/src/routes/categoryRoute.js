const { Router } = require('express');
const {getCategoriesHandler, postCategoryHandler} = require('../handlers/CategoryHandler')
const { putCategory, deleteCategory } = require('../controllers/CategoriesController')
const router = Router();
router.get('/', getCategoriesHandler)
router.put('/:id', putCategory);
router.delete('/:id', deleteCategory);
router.post('/', postCategoryHandler);
module.exports = router;