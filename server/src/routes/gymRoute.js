const { Router } = require('express');
const { getGymHandler,
    postGymHandler,
    putGymHandler,
 } = require('../handlers/gymHandler');
const gymRouter = Router();
const { authorization } = require("../../utils/auth");
gymRouter.get('/', getGymHandler);
gymRouter.post('/', authorization, postGymHandler);
gymRouter.put('/:id', authorization, putGymHandler);

module.exports = gymRouter;
