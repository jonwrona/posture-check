const { Sequelize } = require('sequelize');

const db = new Sequelize(process.env.DATABASE_URL || 'sqlite::memory:');
(async () => {
  try {
    await db.authenticate();
    console.log('Database connection established');
  } catch (error) { 
    console.error('Unable to connect to the database:', error);
  }
})();


module.exports = db;