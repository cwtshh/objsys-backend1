const express = require('express');
const router = express.Router();

// controller
const { loginStudent, getCurrentStudent } = require('../controllers/StudentController');

// middleware
const validate = require('../middlewares/HandleValidation');
const { studentLoginValidation } = require('../middlewares/StudentsValidations');

// authguard
const { studentAuthGuard } = require('../middlewares/AuthGuard');

// rotas
router.post('/login', studentLoginValidation(), validate, loginStudent);
router.get('/profile', studentAuthGuard, getCurrentStudent);

module.exports = router;