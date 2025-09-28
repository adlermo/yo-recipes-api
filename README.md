# Yo-Recipes API

A RESTful API for managing recipes built with Node.js, Express, and MongoDB. This API allows users to create, read, update, and delete recipes with detailed information including ingredients, instructions, cooking time, difficulty level, and servings.

## Features

- Complete CRUD operations for recipes
- Input validation for all endpoints
- API versioning (v1)
- Swagger documentation
- Error handling
- MongoDB integration

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v20 or higher)
- pnpm (or npm)
- MongoDB (or MongoDB Atlas account)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/adlermo/yo-recipes-api.git
cd yo-recipes-api
```

2. Install dependencies:
```bash
pnpm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
```

## Running the Application

- Development mode (with hot reload):
```bash
pnpm run dev
```

- Production mode:
```bash
pnpm start
```

## API Documentation

The API documentation is available through Swagger UI. After starting the server, visit:
```
http://localhost:3000/api-docs
```

### API Endpoints

Base URL: `/api`

#### Recipes V1

- **GET** `/v1/recipes` - Get all recipes
- **GET** `/v1/recipes/{id}` - Get a specific recipe
- **POST** `/v1/recipes` - Create a new recipe
- **PUT** `/v1/recipes/{id}` - Update an existing recipe
- **DELETE** `/v1/recipes/{id}` - Delete a recipe

### Recipe Object Structure

```json
{
  "title": "String (required)",
  "ingredients": [
    {
      "item": "String (required)",
      "amount": "String (required)"
    }
  ],
  "instructions": ["String (required)"],
  "cookingTime": "Number (required)",
  "difficulty": "String (enum: easy, medium, hard) (required)",
  "servings": "Number (required)"
}
```

## Validation Rules

- Title: Minimum 3 characters
- Ingredients: At least one ingredient with item and amount
- Instructions: At least one instruction step
- Cooking Time: Positive number
- Difficulty: Must be either 'easy', 'medium', or 'hard'
- Servings: Positive integer

## Error Handling

The API includes comprehensive error handling:
- 400: Bad Request (validation errors)
- 404: Not Found
- 500: Internal Server Error

## Project Structure

```
yo-recipes-api/
├── src/
│   ├── config/
│   │   └── mongodb.js
│   ├── controllers/
│   │   └── recipesController.js
│   ├── middleware/
│   │   └── validateRecipe.js
│   ├── routes/
│   │   ├── index.js
│   │   └── recipesRoutes.js
├── server.js
├── swagger.js
└── package.json
```

## Development

To regenerate the Swagger documentation after making changes to the routes:
```bash
pnpm run swagger
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Contact

Adler Mesquita Orteney - [GitHub Profile](https://github.com/adlermo)

Project Link: [https://github.com/adlermo/yo-recipes-api](https://github.com/adlermo/yo-recipes-api)