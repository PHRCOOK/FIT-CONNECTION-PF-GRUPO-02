<<<<<<< HEAD
const express = require("express");
const usersRouter = require("./usersRouter");
const instructorRouter = require("./instructorsRouter");
const feedBackRouter = require("./feedBackRouter");
const productsRouter = require("./productsRouter");
const categoryRouter = require("./categoryRoute");
const shoppingCartRouter = require("./shoppingCartRouter");
=======
const express = require('express');
const usersRouter = require('./usersRouter');
const instructorRouter = require('./instructorsRouter');
const feedBackRouter = require('./feedBackRouter');
const productsRouter = require('./productsRouter');
const categoryRouter = require('./categoryRoute');
>>>>>>> 91c8ccb09a678645c4a12d97b61033a934e76361
const router = express.Router();

// Definir rutas aquí:

<<<<<<< HEAD
router.use("/users", usersRouter);

router.use("/instructors", instructorRouter);

router.use("/feedbacks", feedBackRouter);

router.use("/products", productsRouter);

router.use("/categories", categoryRouter);

router.use("/shoppingCart", shoppingCartRouter);

module.exports = router;
=======
router.use("/api/users", usersRouter);

router.use("/api/instructors", instructorRouter);

router.use("/api/feedbacks", feedBackRouter);

router.use("/api/products", productsRouter);

router.use("/api/categories", categoryRouter);



module.exports = router;
>>>>>>> 91c8ccb09a678645c4a12d97b61033a934e76361
