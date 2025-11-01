const { validationResult } = require('express-validator');
const Contact = require('../models/Contact');

exports.createContact = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
        const contact = await Contact.create(req.body);
        res.status(201).json(contact);
    } catch (err) {
        res.status(500).json({ message: 'Failed to create contact', error: err.message });
    }
};

exports.getContacts = async (_req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch contacts', error: err.message });
    }
};

exports.getContactById = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).json({ message: 'Contact not found' });
        res.json(contact);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch contact', error: err.message });
    }
};

exports.updateContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!contact) return res.status(404).json({ message: 'Contact not found' });
        res.json(contact);
    } catch (err) {
        res.status(500).json({ message: 'Failed to update contact', error: err.message });
    }
};

exports.deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) return res.status(404).json({ message: 'Contact not found' });
        res.json({ message: 'Contact deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete contact', error: err.message });
    }
};

exports.deleteAll = async (_req, res) => {
    try {
        const result = await Contact.deleteMany({});
        res.json({ message: 'All contacts deleted', deletedCount: result.deletedCount });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete all contacts', error: err.message });
    }
};

// Aliases matching requested generic names
exports.getAll = exports.getContacts;
exports.getById = exports.getContactById;
exports.create = exports.createContact;
exports.update = exports.updateContact;
exports.delete = exports.deleteContact;


