const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Recipe = require('./Recipe');

const Instruction = sequelize.define('Instruction', {
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

Instruction.belongsTo(Recipe, {
    foreignKey: 'recipe_id',
    onDelete: 'CASCADE'
});
Recipe.hasMany(Instruction, {
    foreignKey: 'recipe_id'
})

module.exports = Instruction;