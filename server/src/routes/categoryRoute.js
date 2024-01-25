const { Router } = require('express');
const {getCategoriesHandler, postCategoriesHandler, deleteCategoriesHandler, putCategoriesHandler} = require('../handlers/CategoryHandler')
const router = Router();
router.get('/', getCategoriesHandler)
router.put('/:id', putCategoriesHandler);
router.delete('/:id', deleteCategoriesHandler);
router.post('/', postCategoriesHandler);
module.exports = router;