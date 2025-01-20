//Actually all routes can be executed here
//I separate all the routes because in large project there are many routes 
// and must be separated between sector data

const express = require('express');
const router = express.Router();
const authRoutes = require('../routes/authRoutes');
const dataRoutes = require('../routes/dataRoutes');

router.use('/auth', authRoutes);
router.use('/data', dataRoutes);

module.exports = router;