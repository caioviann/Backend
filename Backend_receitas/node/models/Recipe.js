const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Recipe = sequelize.define('Recipe', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    prep_time_minutes: DataTypes.INTEGER,
    cook_time_minutes: DataTypes.INTEGER,
    servings: DataTypes.INTEGER,
    difficulty: DataTypes.STRING,
    calories_per_serviving: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    image: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    review_count: DataTypes.INTEGER,
    meal_types: DataTypes.INTEGER
})

module.exports = Recipe;