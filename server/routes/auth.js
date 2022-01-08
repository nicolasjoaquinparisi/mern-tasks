// Rutas para autenticar usuarios
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');

// Autentica un usuario
// api/auth
router.post('/', 
    [
        check('email', 'Enter a valid email').isEmail(),
        check('password', 'The password must contains at least 6 characters').isLength({min: 6})
    ],
    authController.authenticateUser
);

module.exports = router;