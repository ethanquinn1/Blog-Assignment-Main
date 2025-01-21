const { Sequelize } = require('sequelize');
const path = require('path');
const fs = require('fs');

// Initialize Sequelize with SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../database.sqlite'),
  logging: false
});

// Import models
const models = {};

// Import User model
const User = require('./user')(sequelize);
models.User = User;

// Try to import Blog model if it exists
try {
  const Blog = require('./blog')(sequelize);
  models.Blog = Blog;
} catch (err) {
  console.log('Blog model not loaded:', err.message);
}

// Export models and sequelize instance
module.exports = {
  sequelize,
  ...models
};

