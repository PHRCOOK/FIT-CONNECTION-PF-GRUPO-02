const { Router } = require('express');
const { getAllCategoriesHandler,
    postCategoriesHandler,
    deleteCategoriesHandler,
    putCategoriesHandler } = require('../handlers/CategoryHandler');
const router = Router();

router.get('/', getAllCategoriesHandler);
router.put('/:id', putCategoriesHandler);
router.delete('/:id', deleteCategoriesHandler);
router.post('/', postCategoriesHandler);

module.exports = router;