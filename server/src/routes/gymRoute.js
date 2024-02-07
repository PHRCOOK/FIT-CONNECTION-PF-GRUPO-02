const { Router } = require('express');
const { getGymHandler,
    postGymHandler,
    putGymHandler,
 } = require('../handlers/gymHandler');
const gymRouter = Router();

gymRouter.get('/', getGymHandler);
gymRouter.post('/', postGymHandler);
gymRouter.put('/:id', putGymHandler);

module.exports = gymRouter;