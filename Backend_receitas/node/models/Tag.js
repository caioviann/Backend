const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const Recipe = require('./Recipe');

const Tag = sequelize.define('Tag', {
    name: {
        type: DataTypes.STRING
    }
});

Tag.belongsTo(Recipe, {
    foreignKey: 'recipe_id',
    onDelete: 'CASCADE'
});
Recipe.hasMany(Tag, {
    foreignKey: 'recipe_id'
});

module.exports = Tag;