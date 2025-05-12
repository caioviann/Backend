const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Recipe = require('./Recipe');

const Ingredient = sequelize.define('Ingredient', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

Ingredient.belongsTo(Recipe, {
    foreignKey: 'recipeId',
    onDelete: 'CASCADE'
});
Recipe.hasMany(Ingredient, {
    foreignKey: 'recipeId'
})

module.exports = Ingredient;