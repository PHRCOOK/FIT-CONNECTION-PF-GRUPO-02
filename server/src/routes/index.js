const express = require('express');
const usersRouter = require('./usersRouter');
const instructorRouter = require('./instructorsRouter');
const router = express.Router();

// Definir rutas aquí:

router.use("/users", usersRouter);

router.use("/instructor", instructorRouter);



module.exports = router;
