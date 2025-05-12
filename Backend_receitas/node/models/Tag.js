const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Recipe = require('./Recipe');

const Tag = sequelize.define('Tag', {
    name: {
        type: DataTypes.STRING
    }
});

Tag.belongsTo(Recipe, {
    foreignKey: 'recipeId',
    onDelete: 'CASCADE'
});
Recipe.hasMany(Tag, {
    foreignKey: 'recipeId'
});

module.exports = Tag;