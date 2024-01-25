const { Router } = require('express');
const {getCategoriesHandler, postCategoryHandler, deleteCategoryHandler} = require('../handlers/CategoryHandler')
const { putCategory } = require('../controllers/CategoriesController')
const router = Router();
router.get('/', getCategoriesHandler)
router.put('/:id', putCategory);
router.delete('/:id', deleteCategoryHandler);
router.post('/', postCategoryHandler);
module.exports = router;