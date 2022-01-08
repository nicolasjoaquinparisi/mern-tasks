const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

// Crea un proyecto
// api/projects
// El middleware auth lo que hace es verificar todo lo que está en auth, y, si pasa, sigue al siguiente middleware que es el de crear el proyecto
router.post('/',
    auth,
    [
        check('name', 'The name of the project is required').not().isEmpty(),
    ],
    projectController.createProject);

// Obtener todos los proyectos
router.get('/',
    auth,
    projectController.getProjects);

// Actualizar proyecto vía ID
router.put('/:id', 
    auth,
    [
        check('name', 'The name of the project is required').not().isEmpty(),
    ],
    projectController.updateProject);

// Eliminar proyecto
router.delete('/:id',
    auth,
    projectController.deleteProject); 

module.exports = router;