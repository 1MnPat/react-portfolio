const { validationResult } = require('express-validator');
const Project = require('../models/Project');

exports.createProject = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
        const project = await Project.create(req.body);
        res.status(201).json(project);
    } catch (err) {
        res.status(500).json({ message: 'Failed to create project', error: err.message });
    }
};

exports.getProjects = async (_req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch projects', error: err.message });
    }
};

exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.json(project);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch project', error: err.message });
    }
};

exports.updateProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.json(project);
    } catch (err) {
        res.status(500).json({ message: 'Failed to update project', error: err.message });
    }
};

exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.json({ message: 'Project deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete project', error: err.message });
    }
};

exports.deleteAll = async (_req, res) => {
    try {
        const result = await Project.deleteMany({});
        res.json({ message: 'All projects deleted', deletedCount: result.deletedCount });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete all projects', error: err.message });
    }
};

// Aliases matching requested generic names
exports.getAll = exports.getProjects;
exports.getById = exports.getProjectById;
exports.create = exports.createProject;
exports.update = exports.updateProject;
exports.delete = exports.deleteProject;


