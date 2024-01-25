<<<<<<< HEAD
const { Router } = require('express');
const usersRouter = require('./usersRouter');
const instructorRouter = require('./instructorsRouter');
const feedBackRouter = require('./feedBackRouter');
const categoriesRoute = require('./categoryRoute.js')
const router = Router();

// Definir rutas aquí:

router.use("/users", usersRouter)
=======
const express = require('express');
const usersRouter = require('./usersRouter');
const instructorRouter = require('./instructorsRouter');
const feedBackRouter = require('./feedBackRouter');
const router = express.Router();

// Definir rutas aquí:

router.use("/users", usersRouter);
>>>>>>> e2726b55d6615857fb3ab047a2a4912bd9208f2f

router.use("/instructors", instructorRouter);

router.use("/feedbacks", feedBackRouter);

<<<<<<< HEAD
router.use('/categorias', categoriesRoute); 
=======

>>>>>>> e2726b55d6615857fb3ab047a2a4912bd9208f2f

module.exports = router;
