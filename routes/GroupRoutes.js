const express = require('express');
const router = express()

// controller
const validate = require('../middlewares/HandleValidation');
const { adminAuthGuard, studentAuthGuard } = require('../middlewares/AuthGuard');
const { groupCreateValidation } = require('../middlewares/GroupValidations');
const { createGroup, addStudentToGroup, editGroup, getAllGroups } = require('../controllers/GroupController');

// rotas
router.get('/', getAllGroups);
router.post('/create', groupCreateValidation(), validate, createGroup);
router.put('/update/:id', adminAuthGuard, groupCreateValidation(), validate, editGroup);
router.put('/addstudent/:id', addStudentToGroup);


module.exports = router;