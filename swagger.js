const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Yo-Recipes API',
        description: 'A REST API for managing recipes',
        version: '1.0.0'
    },
    host: 'localhost:3000',
    basePath: '/api',
    schemes: ['http', 'https'],
    tags: [
        {
            name: 'Recipes',
            description: 'Endpoints for managing recipes'
        }
    ],
    definitions: {
        Recipe: {
            title: 'Spaghetti Carbonara',
            ingredients: [
                {
                    item: 'spaghetti',
                    amount: '400g'
                }
            ],
            instructions: [
                'Boil the spaghetti in salted water'
            ],
            cookingTime: 30,
            difficulty: 'medium',
            servings: 4
        },
        RecipeInput: {
            $title: 'Spaghetti Carbonara',
            $ingredients: [
                {
                    $item: 'spaghetti',
                    $amount: '400g'
                }
            ],
            $instructions: [
                'Boil the spaghetti in salted water'
            ],
            $cookingTime: 30,
            $difficulty: 'medium',
            $servings: 4
        }
    }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./src/routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);