const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Yo-Recipes API',
        description: 'A REST API for managing recipes',
        version: '1.0.0'
    },
    host: 'yo-recipes-api.onrender.com',
    basePath: '/api',
    schemes: ['https'],
    tags: [
        {
            name: 'Recipes',
            description: 'Endpoints for managing recipes'
        }
    ],
    definitions: {
        Recipe: {
            id: '64a7b2f5e4b0c8a1d2f3e4b5',
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
            difficulty: 'easy' || 'medium' || 'hard',
            servings: 4,
            updatedAt: '2024-06-25T12:00:00Z',
            createdAt: '2024-06-20T12:00:00Z'
        },
        RecipeInput: {
            $userId: '64a7b2f5e4b0c8a1d2f3e4b5',
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
            $difficulty: 'easy' || 'medium' || 'hard',
            $servings: 4
        },
        RecipeList: [
            {
                id: '64a7b2f5e4b0c8a1d2f3e4b5',
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
                difficulty: 'easy' || 'medium' || 'hard',
                servings: 4,
                updatedAt: '2024-06-25T12:00:00Z',
                createdAt: '2024-06-20T12:00:00Z'
            }
        ],
        User: {
            id: '64a7b2f5e4b0c8a1d2f3e4b5',
            name: 'John',
            surname: 'Doe',
            email: 'jdoe@byupathway.edu',
            level: 'amateur' || 'baker' || 'chef',
            age: 25
        },
        UserInput: {
            $name: 'John',
            $surname: 'Doe',
            $email: 'jdoe@byupathway.edu',
            $level: 'amateur' || 'baker' || 'chef',
            $age: 25
        },
        UserList: [
            {
                id: '64a7b2f5e4b0c8a1d2f3e4b5',
                name: 'John',
                surname: 'Doe',
                email: 'jdoe@byupathway.edu',
                level: 'amateur' || 'baker' || 'chef',
                age: 25
            }
        ]
    }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./src/routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);