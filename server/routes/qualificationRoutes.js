const express = require('express');
const { body } = require('express-validator');
const ctrl = require('../controllers/qualificationController');

const router = express.Router();

// Collection routes
router.get('/', ctrl.getAll);
router.post(
    '/',
    [
        body('title').notEmpty(),
        body('firstname').notEmpty(),
        body('lastname').notEmpty(),
        body('email').isEmail(),
        body('completion').notEmpty(),
        body('description').notEmpty(),
    ],
    ctrl.create
);
router.delete('/', ctrl.deleteAll);

// Item routes
router.get('/:id', ctrl.getById);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.delete);

module.exports = router;


