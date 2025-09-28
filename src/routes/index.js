const express = require('express');
const router = express.Router();
const recipesRoutes = require('./recipesRoutes');

// API Routes
router.use('/v1/recipes', recipesRoutes);

module.exports = router;