const express = require('express');
const usersRouter = require('./usersRouter');
const instructorRouter = require('./instructorsRouter');
const feedBackRouter = require('./feedBackRouter');
const productsRouter = require('./productsRouter');
const categoryRouter = require('./categoryRoute');
const router = express.Router();

// Definir rutas aquí:

router.use("/api/users", usersRouter);

router.use("/api/instructors", instructorRouter);

router.use("/api/feedbacks", feedBackRouter);

router.use("/api/products", productsRouter);

router.use("/api/categories", categoryRouter);



module.exports = router;