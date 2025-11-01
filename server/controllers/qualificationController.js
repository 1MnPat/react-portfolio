const { validationResult } = require('express-validator');
const Qualification = require('../models/Qualification');

exports.createQualification = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
        const qualification = await Qualification.create(req.body);
        res.status(201).json(qualification);
    } catch (err) {
        res.status(500).json({ message: 'Failed to create qualification', error: err.message });
    }
};

exports.getQualifications = async (_req, res) => {
    try {
        const qualifications = await Qualification.find().sort({ createdAt: -1 });
        res.json(qualifications);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch qualifications', error: err.message });
    }
};

exports.getQualificationById = async (req, res) => {
    try {
        const qualification = await Qualification.findById(req.params.id);
        if (!qualification) return res.status(404).json({ message: 'Qualification not found' });
        res.json(qualification);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch qualification', error: err.message });
    }
};

exports.updateQualification = async (req, res) => {
    try {
        const qualification = await Qualification.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!qualification) return res.status(404).json({ message: 'Qualification not found' });
        res.json(qualification);
    } catch (err) {
        res.status(500).json({ message: 'Failed to update qualification', error: err.message });
    }
};

exports.deleteQualification = async (req, res) => {
    try {
        const qualification = await Qualification.findByIdAndDelete(req.params.id);
        if (!qualification) return res.status(404).json({ message: 'Qualification not found' });
        res.json({ message: 'Qualification deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete qualification', error: err.message });
    }
};

exports.deleteAll = async (_req, res) => {
    try {
        const result = await Qualification.deleteMany({});
        res.json({ message: 'All qualifications deleted', deletedCount: result.deletedCount });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete all qualifications', error: err.message });
    }
};

// Aliases matching requested generic names
exports.getAll = exports.getQualifications;
exports.getById = exports.getQualificationById;
exports.create = exports.createQualification;
exports.update = exports.updateQualification;
exports.delete = exports.deleteQualification;


