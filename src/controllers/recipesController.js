const { getDb } = require('../config/mongodb');
const { ObjectId } = require('mongodb');

const COLLECTION = 'recipes';

exports.getAllRecipes = async (req, res) => {
    try {
        const db = await getDb();
        const recipes = await db.collection(COLLECTION).find({}).toArray();
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching recipes', error: error.message });
    }
};

exports.getRecipeById = async (req, res) => {
    try {
        const db = await getDb();
        const recipe = await db.collection(COLLECTION).findOne({ _id: new ObjectId(req.params.id) });
        
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        
        res.json(recipe);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching recipe', error: error.message });
    }
};

exports.createRecipe = async (req, res) => {
    try {
        const db = await getDb();
        const result = await db.collection(COLLECTION).insertOne({
            ...req.body,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        
        res.status(201).json({
            message: 'Recipe created successfully',
            recipeId: result.insertedId
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating recipe', error: error.message });
    }
};

exports.updateRecipe = async (req, res) => {
    try {
        const db = await getDb();
        const result = await db.collection(COLLECTION).updateOne(
            { _id: new ObjectId(req.params.id) },
            { 
                $set: {
                    ...req.body,
                    updatedAt: new Date()
                }
            }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        res.json({ message: 'Recipe updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating recipe', error: error.message });
    }
};

exports.deleteRecipe = async (req, res) => {
    try {
        const db = await getDb();
        const result = await db.collection(COLLECTION).deleteOne({
            _id: new ObjectId(req.params.id)
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        res.json({ message: 'Recipe deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting recipe', error: error.message });
    }
};