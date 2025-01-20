const express = require('express');
const { findData } = require('../controller/fetchDataController');

const router = express.Router();

router.post('/searchData', findData);

module.exports = router;