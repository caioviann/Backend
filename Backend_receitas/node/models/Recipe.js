const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Recipe = sequelize.define('Recipe', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    prepTimeMinutes: DataTypes.INTEGER,
    cookTimeMinutes: DataTypes.INTEGER,
    servings: DataTypes.INTEGER,
    difficulty: DataTypes.STRING,
    caloriesPerServing: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    image: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    reviewCount: DataTypes.INTEGER,
    mealType: DataTypes.JSON
})

module.exports = Recipe;