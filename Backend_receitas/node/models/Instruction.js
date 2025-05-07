const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const Recipe = require('./Recipe');

const Instruction = sequelize.define('Instruction', {
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

Instruction.belongsTo(Recipe, {
    foreignKey: 'recipe_id',
    onDelete: 'CASDADE'
});
Recipe.hasMany(Instruction, {
    foreignKey: 'recipe_id'
})

module.exports = Instruction;