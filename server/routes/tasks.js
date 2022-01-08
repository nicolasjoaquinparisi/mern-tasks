const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

// Crear tarea
// api/tasks
router.post('/',
    auth,
    [
        check('name', 'The name of the task is required').not().isEmpty(),
        check('project', 'The project is required').not().isEmpty(),
    ],
    taskController.createTask
);

// Obtener tareas por proyecto
router.get('/',
    auth,
    taskController.getTasks
);

// Actualizar tarea
router.put('/:id',
    auth,
    taskController.updateTask
);

router.delete('/:id',
    auth,
    taskController.deleteTask
);

module.exports = router;