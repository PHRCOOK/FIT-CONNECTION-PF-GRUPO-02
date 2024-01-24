const express = require('express');
const usersRouter = require('./usersRouter');
const router = express.Router();

// Definir rutas aquí:

router.use("/users", usersRouter)

module.exports = router;
