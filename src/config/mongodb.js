const { MongoClient } = require('mongodb');

let db = null;
let client = null;

async function connectToDatabase() {
    try {
        if (db) return db;

        client = await MongoClient.connect(process.env.MONGODB_URI);
        db = client.db();

        console.log('Connected successfully to MongoDB');
        return db;
    } catch (error) {
        console.error('Could not connect to MongoDB:', error);
        throw error;
    }
}

async function getDb() {
    if (!db) {
        await connectToDatabase();
    }
    return db;
}

async function closeConnection() {
    if (client) {
        await client.close();
        db = null;
        client = null;
        console.log('MongoDB connection closed');
    }
}

process.on('SIGINT', async () => {
    await closeConnection();
    process.exit();
});

module.exports = {
    connectToDatabase,
    getDb,
    closeConnection
};