require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const { connectToDatabase } = require('./src/config/mongodb');
const app = express();

// Google OAuth
const oauth = require('./src/config/oauth');

// Routes
const routes = require('./src/routes');

// Middleware
const authMiddleware = require('./src/middleware/auth');

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});

app.get('/', (req, res) => {
    res.send(`
        <div style="text-align: center; font-family: Arial, sans-serif; margin: 50px auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px; width: 50%; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
            <h1>Welcome to the YO-Recipes-API 👨🏻‍🍳👩🏻‍🍳</h1>
            <p>Use <a href="/api-docs">/api-docs</a> to explore the API documentation. 📝</p>
            <p>To authenticate with Google, go to <a href="/login">/login</a> 🔐</p>
        </div>
    `);
});

app.use(oauth);

app.use('/api', authMiddleware, routes);
app.use('/api-docs', authMiddleware, swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/profile', authMiddleware, (req, res) => {
    const { givenName } = req.user.name;

    res.send(
        `
        <div style="text-align: center; font-family: Arial, sans-serif; margin: 50px auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px; width: 50%; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
            <h1>${givenName}, welcome to the YO-Recipes-API 👨🏻‍🍳👩🏻‍🍳</h1>
            <p>Use <a href="/api-docs">/api-docs</a> to explore the API documentation. 📝</p>
            <p>To logout with Google, go to <a href="/logout">/logout</a> 🔓</p>
        </div>
    `
    );
});

app.use((req, res) => {
    res.status(404).send('Page not found');
});

connectToDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error('Failed to start server:', err);
    process.exit(1);
});
