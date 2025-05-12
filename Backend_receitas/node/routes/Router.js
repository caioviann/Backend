const Router = require('express');
const Recipe = require('../models/Recipe.js');
const Ingredient = require('../models/Ingredient.js');
const Instruction = require('../models/Instruction.js');
const Tag = require('../models/Tag.js');

const routes = Router();
const recipeController = require('../controllers/RecipeController.js');
routes.get('/receitas', recipeController.getAll);
routes.get('/receitas/:id', recipeController.getById);
routes.put('/receitas/:id', recipeController.put);
routes.post('/receitas/adicionar', recipeController.post);

module.exports = routes;