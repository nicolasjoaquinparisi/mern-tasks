// Rutas para crear usuarios
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Crea un usuario
// api/users
router.post('/', userController.createUser);

module.exports = router;