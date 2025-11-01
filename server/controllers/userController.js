const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');

function signToken(userId) {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { name, email, password } = req.body;
        const existing = await User.findOne({ email });
        if (existing) return res.status(409).json({ message: 'Email already in use' });

        const user = await User.create({ name, email, password });
        const token = signToken(user.id);
        res.status(201).json({ user: { id: user.id, name: user.name, email: user.email }, token });
    } catch (err) {
        res.status(500).json({ message: 'Registration failed', error: err.message });
    }
};

exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });
        const matches = await user.comparePassword(password);
        if (!matches) return res.status(401).json({ message: 'Invalid credentials' });
        const token = signToken(user.id);
        res.json({ user: { id: user.id, name: user.name, email: user.email }, token });
    } catch (err) {
        res.status(500).json({ message: 'Login failed', error: err.message });
    }
};

exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch profile', error: err.message });
    }
};

exports.listUsers = async (_req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Failed to list users', error: err.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch user', error: err.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const updates = { ...req.body };
        if (updates.password) delete updates.password; // prevent raw password set via this route
        const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Failed to update user', error: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete user', error: err.message });
    }
};

exports.deleteAll = async (_req, res) => {
    try {
        const result = await User.deleteMany({});
        res.json({ message: 'All users deleted', deletedCount: result.deletedCount });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete all users', error: err.message });
    }
};

// Generic CRUD aliases
exports.getAll = exports.listUsers;
exports.getById = exports.getUserById;
exports.update = exports.updateUser;
exports.delete = exports.deleteUser;

exports.create = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({ id: user.id, name: user.name, email: user.email });
    } catch (err) {
        res.status(500).json({ message: 'Failed to create user', error: err.message });
    }
};


