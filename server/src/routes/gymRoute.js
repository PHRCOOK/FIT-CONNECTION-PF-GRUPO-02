const { Router } = require('express');
const { getGymHandler,
    postGymHandler,
    putGymHandler,
 } = require('../handlers/gymHandler');
const router = Router();

router.get('/', getGymHandler);
router.post('/', postGymHandler);
router.put('/:id', putGymHandler);

module.exports = router;