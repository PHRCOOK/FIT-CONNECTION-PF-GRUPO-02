const express = require('express');
const usersRouter = require('./usersRouter');
const instructorRouter = require('./instructorsRouter');
const feedBackRouter = require('./feedBackRouter');
const productsRouter = require('./productsRouter');
const categoryRouter = require('./categoryRoute');
const router = express.Router();

// Definir rutas aquí:

router.use("/users", usersRouter);

router.use("/instructors", instructorRouter);

router.use("/feedbacks", feedBackRouter);

router.use("/products", productsRouter);

router.use("/categories", categoryRouter);



module.exports = router;