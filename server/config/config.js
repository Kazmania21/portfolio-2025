require('dotenv').config(); // Load environment variables from .env file

module.exports = {
          SECRET_KEY: process.env.SECRET_KEY || 'your-default-secret-key', // Fallback for dev
          MONGO_URI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio',
          IS_DEV: process.env.IS_DEV === 'true'
};

