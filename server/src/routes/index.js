const { Router } = require('express');
const usersRouter = require('./usersRouter');
const instructorRouter = require('./instructorsRouter');
const feedBackRouter = require('./feedBackRouter');
const categoriesRoute = require('./categoryRoute.js')
const router = Router();

// Definir rutas aquí:

router.use("/users", usersRouter)

router.use("/instructors", instructorRouter);

router.use("/feedbacks", feedBackRouter);

router.use('/categorias', categoriesRoute); 

module.exports = router;
