//This function is for directing to different authentication methods (register, login)

const express = require('express');
const { register, login} = require('../controller/authDataLogin');

const router= express.Router();

router.post('/login', login);
router.post('/register', register);

module.exports = router;