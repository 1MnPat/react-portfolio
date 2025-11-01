const express = require('express');
const { body } = require('express-validator');
const ctrl = require('../controllers/contactController');

const router = express.Router();

// Collection routes
router.get('/', ctrl.getAll);
router.post(
    '/',
    [body('firstname').notEmpty(), body('lastname').notEmpty(), body('email').isEmail()],
    ctrl.create
);
router.delete('/', ctrl.deleteAll);

// Item routes
router.get('/:id', ctrl.getById);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.delete);

module.exports = router;


