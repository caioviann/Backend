const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const Recipe = require('./Recipe');

const Ingredient = sequelize.define('Ingredient', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

Ingredient.belongsTo(Recipe, {
    foreignKey: 'recipe_id',
    onDelete: 'CASCADE'
});
Recipe.hasMany(Ingredient, {
    foreignKey: 'recipe_id'
})

module.exports = Ingredient;