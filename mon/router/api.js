const express = require('express');
const router = express.Router();
const company = require('./company')
const employee = require('./employee');

router.use("/company",company);
router.use("/employee", employee);



module.exports = router;