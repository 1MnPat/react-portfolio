const express = require('express');
const { body } = require('express-validator');
const auth = require('../middleware/auth');
const userCtrl = require('../controllers/userController');

const router = express.Router();

// Collection routes
router.get('/', auth, userCtrl.getAll);
router.post(
    '/',
    [body('name').notEmpty(), body('email').isEmail(), body('password').isLength({ min: 6 })],
    userCtrl.register
);
router.delete('/', auth, userCtrl.deleteAll);

// Item routes
router.get('/:id', auth, userCtrl.getById);
router.put('/:id', auth, userCtrl.update);
router.delete('/:id', auth, userCtrl.delete);

// Auth
router.post('/login', [body('email').isEmail(), body('password').notEmpty()], userCtrl.login);

module.exports = router;


