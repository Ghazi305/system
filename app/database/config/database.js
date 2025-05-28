const { Sequelize } = require('sequelize');

const env = process.env.NODE_ENV || 'development'; 
const config = require('../../database/config/config.js');

const sequelize = new Sequelize(config[env]);

/*sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });*/

module.exports = sequelize;