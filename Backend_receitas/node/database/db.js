const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'banco.sqlite' // ou use um banco real, como PostegreSQL/mySQL
});

module.exports = sequelize;