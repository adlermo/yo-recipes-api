const express = require('express');
const router = express.Router();
const recipesRoutes = require('./recipesRoutes');
const usersRoutes = require('./usersRoutes');

// API Routes
router.use('/v1/recipes', recipesRoutes);
router.use('/v1/users', usersRoutes);

module.exports = router;