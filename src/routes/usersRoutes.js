const express = require('express');
const validateUser = require('../middleware/validateUser');
const usersController = require('../controllers/usersController');

const router = express.Router();

// GET all users
router.get('/', (req, res, next) => {
    /* 
        #swagger.tags = ['Users']
        #swagger.summary = 'Get all users'
        #swagger.description = 'Endpoint to retrieve all users'
        #swagger.path = '/v1/users'
        #swagger.method = 'get'
        #swagger.responses[200] = {
            description: 'Successfully retrieved all users',
            schema: { $ref: '#/definitions/UserList' }
        }
    */
    return usersController.getAllUsers(req, res, next);
});

// POST new user
router.post('/', validateUser, (req, res, next) => {
    /* 
        #swagger.tags = ['Users']
        #swagger.summary = 'Create user'
        #swagger.description = 'Endpoint to create a new user'
        #swagger.path = '/v1/users'
        #swagger.method = 'post'
        #swagger.parameters['UserModel'] = {
            in: 'body',
            description: 'User information',
            required: true,
            schema: { $ref: '#/definitions/UserInput' }
        }
    */
    return usersController.createUser(req, res, next);
});

// GET single user by ID
router.get('/:id', (req, res, next) => {
    /* 
        #swagger.tags = ['Users']
        #swagger.summary = 'Get a user by ID'
        #swagger.description = 'Endpoint to retrieve user data by its ID'
        #swagger.parameters['id'] = { description: 'User ID' }
        #swagger.responses[200] = {
            description: 'Successfully retrieved user data',
            schema: { $ref: '#/definitions/User' }
        }
    */
    return usersController.getUserById(req, res, next);
});

// PUT update user data
router.put('/:id', validateUser, (req, res, next) => {
    /* 
        #swagger.tags = ['Users']
        #swagger.summary = 'Update a user'
        #swagger.description = 'Endpoint to update an existing user'
        #swagger.parameters['id'] = { description: 'User ID' }
        #swagger.parameters['UserModel'] = {
            in: 'body',
            description: 'User information',
            required: true,
            schema: { $ref: '#/definitions/UserInput' }
        }
    */
    return usersController.updateUser(req, res, next);
});

// DELETE user
router.delete('/:id', (req, res, next) => {
    /* 
        #swagger.tags = ['Users']
        #swagger.summary = 'Delete a user'
        #swagger.description = 'Endpoint to delete a user'
        #swagger.parameters['id'] = { description: 'User ID' }
    */
    return usersController.deleteUser(req, res, next);
});

module.exports = router;