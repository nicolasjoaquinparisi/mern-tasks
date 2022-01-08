const { validationResult } = require('express-validator');
const Project = require('../models/Project');

exports.createProject = async (req, res) => {
    
    // Revisar si hay errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        // Crear un nuevo proyecto
        const project = new Project(req.body);

        // Guardar el creador del proyecto vía JWT
        project.creator = req.user;

        project.save();
        res.json(project);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('There was an error');
    }
}

exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find({ creator: req.user }); // Para cambiar el orden a ascend .sort({ created: -1 })
        res.json({projects});
    }
    catch (error) {
        console.log(error);
        res.status(500).send('There was an error');
    }
}

exports.updateProject = async (req, res) => {

    // Revisar si hay errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;
    const newProject = {};
    
    if (name) {
        newProject.name  = name;
    }

    try {
        // Revisar el id
        let project = await Project.findById(req.params.id);

        // Si el proyecto existe o no
        if (!project) {
            return res.status(404).json({msg: 'Project not found'});
        }

        // Verificar el creador del proyecto
        if (project.creator.toString() !== req.user) {
            return res.status(401).son({msg: 'Forbidden access'});
        }

        // Actualizar
        project = await Project.findByIdAndUpdate({_id: req.params.id}, {$set: newProject}, { new: true });

        res.json({project});

    }
    catch (error) {
        console.log(error);
        res.status(500).send('There was an error');
    }
}

// Eliminar un proyecto por id
exports.deleteProject = async (req, res) => {
    try {
        // Revisar el id
        let project = await Project.findById(req.params.id);

        // Si el proyecto existe o no
        if (!project) {
            return res.status(404).json({msg: 'Project not found'});
        }

        // Verificar el creador del proyecto
        if (project.creator.toString() !== req.user) {
            return res.status(401).son({msg: 'Forbidden access'});
        }

        // Eliminar el proyecto
        await Project.findOneAndRemove({ _id: req.params.id });
        res.json({msg: "Project deleted"});
    }
    catch (error) {
        console.log(error);
        res.status(500).send('There was an error');
    }
}