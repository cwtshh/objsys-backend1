const express = require('express');
const router = express.Router();

// controller
const { registerAdmin, registerStudent, loginAdmin, getCurrentAdmin, updateAdmin, updateAnotherAdmin } = require('../controllers/AdminController');

// middleware
const validate = require('../middlewares/HandleValidation');
const { adminCreateValidation, adminLoginValidation, adminUpdateValidation } = require('../middlewares/AdminValidations');
const { studentCreateValidation } = require('../middlewares/StudentsValidations');

// authguard
const { adminAuthGuard } = require('../middlewares/AuthGuard');

// rotas
router.post('/register/admin', adminCreateValidation(), validate, registerAdmin);
router.post('/register/student', studentCreateValidation(), validate, registerStudent);
router.post('/login', adminLoginValidation(), validate, loginAdmin);
router.get("/profile", adminAuthGuard, getCurrentAdmin)
// atualizar o proprio admin
router.put('/', adminAuthGuard, adminUpdateValidation(), validate, updateAdmin);

// atualizar outro admin
router.put('/:id', adminAuthGuard, adminUpdateValidation(), validate, updateAnotherAdmin);

module.exports = router;
