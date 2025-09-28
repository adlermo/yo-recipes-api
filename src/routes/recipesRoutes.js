const express = require('express');
const router = express.Router();
const recipesController = require('../controllers/recipesController');
const validateRecipe = require('../middleware/validateRecipe');

// GET all recipes
router.get('/', (req, res, next) => {
    /* 
        #swagger.tags = ['Recipes']
        #swagger.summary = 'Get all recipes'
        #swagger.description = 'Endpoint to retrieve all recipes'
        #swagger.path = '/v1/recipes'
        #swagger.method = 'get'
        #swagger.responses[200] = {
            description: 'Successfully retrieved all recipes',
            schema: { $ref: '#/definitions/Recipe' }
        }
    */
    return recipesController.getAllRecipes(req, res, next);
});

// POST new recipe
router.post('/', validateRecipe, (req, res, next) => {
    /* 
        #swagger.tags = ['Recipes']
        #swagger.summary = 'Create a new recipe'
        #swagger.description = 'Endpoint to create a new recipe'
        #swagger.path = '/v1/recipes'
        #swagger.method = 'post'
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Recipe information',
            required: true,
            schema: { $ref: '#/definitions/RecipeInput' }
        }
    */
    return recipesController.createRecipe(req, res, next);
});

// GET single recipe by ID
router.get('/:id', (req, res, next) => {
    /* 
        #swagger.tags = ['Recipes']
        #swagger.summary = 'Get a recipe by ID'
        #swagger.description = 'Endpoint to retrieve a specific recipe by its ID'
        #swagger.parameters['id'] = { description: 'Recipe ID' }
        #swagger.responses[200] = {
            description: 'Successfully retrieved the recipe',
            schema: { $ref: '#/definitions/Recipe' }
        }
    */
    return recipesController.getRecipeById(req, res, next);
});

// PUT update recipe
router.put('/:id', validateRecipe, (req, res, next) => {
    /* 
        #swagger.tags = ['Recipes']
        #swagger.summary = 'Update a recipe'
        #swagger.description = 'Endpoint to update an existing recipe'
        #swagger.parameters['id'] = { description: 'Recipe ID' }
        #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Recipe information',
            required: true,
            schema: { $ref: '#/definitions/RecipeInput' }
        }
    */
    return recipesController.updateRecipe(req, res, next);
});

// DELETE recipe
router.delete('/:id', (req, res, next) => {
    /* 
        #swagger.tags = ['Recipes']
        #swagger.summary = 'Delete a recipe'
        #swagger.description = 'Endpoint to delete a recipe'
        #swagger.parameters['id'] = { description: 'Recipe ID' }
    */
    return recipesController.deleteRecipe(req, res, next);
});

module.exports = router;