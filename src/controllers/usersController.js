const { getDb } = require('../config/mongodb');
const { ObjectId } = require('mongodb');

const COLLECTION = 'users';

exports.getAllUsers = async (req, res) => {
    try {
        const db = await getDb();
        const users = await db.collection(COLLECTION).find({}).toArray();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const db = await getDb();
        const user = await db.collection(COLLECTION).findOne({ _id: new ObjectId(req.params.id) });
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
};

exports.createUser = async (req, res) => {
    try {
        const db = await getDb();
        const result = await db.collection(COLLECTION).insertOne({
            ...req.body,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        
        res.status(201).json({
            message: 'User created successfully',
            userId: result.insertedId
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};

exports.updateUser = async (req, res) => {
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
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const db = await getDb();
        const result = await db.collection(COLLECTION).deleteOne({
            _id: new ObjectId(req.params.id)
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
};