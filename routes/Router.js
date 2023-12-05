const express = require('express');
const router = express()

router.use('/admin', require('./AdminRoutes'));
router.use('/student', require('./StudentRoutes'));
router.use('/group', require('./GroupRoutes'));


module.exports = router;