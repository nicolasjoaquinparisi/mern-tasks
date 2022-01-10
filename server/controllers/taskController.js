const Project = require('../models/Project');
const Task = require('../models/Task');
const { validationResult } = require('express-validator');

// Crear nueva tarea
exports.createTask = async (req, res) => {

    // Revisar si hay errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        // Extraer proyecto y determinar si existe
        const { project } = req.body;

        // Se determina si el proyecto existe o no
        const reqProject = await Project.findById(project);
        if (!reqProject) {
            res.status(404).send('Project not found');
        }

        // Revisar si el proyecto actual pertenece al usuario autenticado
        if (reqProject.creator.toString() !== req.user) {
            return res.status(401).send('Forbidden access');
        }

        // Crear tarea
        const task = new Task(req.body);
        await task.save();
        res.json({ task });
    }
    catch (error) {
        console.log(error);
        res.status(500).send('There was an error');
    }
}

// Obtener las tareas por proyecto
exports.getTasks = async (req, res) => {
    try {
        // Extraer proyecto y determinar si existe
        const { project } = req.query;

        // Se determina si el proyecto existe o no
        const reqProject = await Project.findById(project);

        if (!reqProject) {
            res.status(404).send('Project not found');
        }

        // Revisar si el proyecto actual pertenece al usuario autenticado
        if (reqProject.creator.toString() !== req.user) {
            return res.status(401).send('Forbidden access');
        }
        
        // Obtener tareas por proyecto
        const tasks = await Task.find({ project }).sort({created: -1});
        res.json({ tasks });
    }
    catch (error) {
        console.log(error);
        res.status(500).send('There was an error');
    }
}

// Actualizar tarea
exports.updateTask = async (req, res) => {

    // Revisar si hay errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        // Extraer proyecto y determinar si existe
        const { project, name, state } = req.body;

        // Determina si la tarea existe o no
        let task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).send('Task not found');
        }

        // Revisar si el proyecto actual pertenece al usuario autenticado
        const reqProject = await Project.findById(project);

        if (reqProject.creator.toString() !== req.user) {
            return res.status(401).send('Forbidden access');
        }

        const newTask = {};

        newTask.name = name;
        newTask.state = state;

        // Guardar tarea
        task = await Task.findOneAndUpdate({_id: req.params.id}, newTask, {new: true});

        res.json({task});
    }
    catch (error) {
        console.log(error);
        res.status(500).send('There was an error');
    }
}

exports.deleteTask = async (req, res) => {
    try {
        // Extraer proyecto y determinar si existe
        const { project } = req.query;
        
        // Determina si la tarea existe o no
        let task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).send('Task not found');
        }

        // Revisar si el proyecto actual pertenece al usuario autenticado
        const reqProject = await Project.findById(project);

        if (reqProject.creator.toString() !== req.user) {
            return res.status(401).send('Forbidden access');
        }

        // Eliminar tarea
        await Task.findOneAndRemove({_id: req.params.id});
        res.json({msg: 'Task deleted'});
    }
    catch (error) {
        console.log(error);
        res.status(500).send('There was an error');
    }
}