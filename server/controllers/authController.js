const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.authenticateUser = async (req, res) => {

    // Revisar si hay errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // Revisar si es un usuario registrado
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({msg: 'The email entered is invalid'});
        }

        // Revisar password
        const isValidPassword = await bcryptjs.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({msg: 'The password entered is invalid'})
        }

        // Si todo es correcto se crea el JWT
        // Crear y firmar el JWT
        const payload = {
            user: user.id
        };

        // Firmar el JWT
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: "1h"
        }, (error, token) => {
            if (error) throw error;

            // Mensaje de confirmación
            res.json({token});
        });

    }
    catch (error) {

    }
}