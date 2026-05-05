const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('MONGODB_URI is not defined in .env file');
    process.exit(1);
}

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`🔗 Health check available at http://localhost:${PORT}/health`);
});

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('✅ Connected to MongoDB Atlas');
    })
    .catch((error) => {
        console.error('❌ MongoDB connection error:');
        console.error(error.message);
        
        if (error.message.includes('ETIMEDOUT') || error.message.includes('ECONNREFUSED') || error.name === 'MongoNetworkError') {
            console.error('\n⚠️  TIP: This is likely a network or firewall issue.');
            console.error('If you are using MongoDB Atlas, please ensure your IP address is whitelisted:');
            console.error('https://www.mongodb.com/docs/atlas/security-whitelist/\n');
        }
        
        if (error.reason) console.error('Reason:', error.reason);
    });

