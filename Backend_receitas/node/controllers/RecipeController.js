const Recipe = require('../models/Recipe.js');
const Ingredient = require('../models/Ingredient.js');
const Instruction = require('../models/Instruction.js');
const Tag = require('../models/Tag.js');

const getAll = async (req, res) => {
    try {
      const recipe = await Recipe.findAll({
        include: [Ingredient, Instruction, Tag]
      });
      res.json(recipe);
    } catch (error) { 
      console.error(error);
      res.status(500).send('Erro ao buscar receitas');
    }
};

const getById = async (req, res) => {
    try {
      const recipe = await Recipe.findByPk(req.params.id, {
        include: [Ingredient, Instruction, Tag]
      });
      if (!recipe) return res.status(404).send('Receita não encontrada');
      res.json(recipe);
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao buscar receita');
    }
  };

const put = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      name,
      prepTimeMinutes,
      cookTimeMinutes,
      servings,
      difficulty,
      cuisine,
      caloriesPerServing,
      userId,
      image,
      rating,
      reviewCount,
      mealType,
      ingredients,
      instructions,
      tags
    } = req.body;

    const recipe = await Recipe.findByPk(id);
    if (!recipe) return res.status(404).send('Receita não encontrada');

    await recipe.update({
      name,
      prepTimeMinutes,
      cookTimeMinutes,
      servings,
      difficulty,
      cuisine,
      caloriesPerServing,
      userId,
      image,
      rating,
      reviewCount,
      mealType
    });

    await Ingredient.destroy({ where: { recipeId: id } });
    await Instruction.destroy({ where: { recipeId: id } });
    await Tag.destroy({ where: { recipeId: id } });

    if (ingredients?.length) {
      const ingredientsData = ingredients.map(name => ({ name, recipeId: id }));
      await Ingredient.bulkCreate(ingredientsData);
    }

    if (instructions?.length) {
      const instructionsData = instructions.map(description => ({ description, recipeId: id }));
      await Instruction.bulkCreate(instructionsData);
    }

    if (tags?.length) {
      const tagsData = tags.map(name => ({ name, recipeId: id }));
      await Tag.bulkCreate(tagsData);
    }

    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao atualizar receita');
  }
};

const post =  async (req, res) => {
    try {
        console.log('copooo:', req.body);
      const {
        name,
        prepTimeMinutes,
        cookTimeMinutes,
        servings,
        difficulty,
        cuisine,
        caloriesPerServing,
        userId,
        image,
        rating,
        reviewCount,
        mealType,
        ingredients,
        instructions,
        tags
      } = req.body;
  
      const recipe = await Recipe.create({
        name,
        prepTimeMinutes,
        cookTimeMinutes,
        servings,
        difficulty,
        cuisine,
        caloriesPerServing,
        userId,
        image,
        rating,
        reviewCount,
        mealType
      });
  // não ta adicionando ingreentes
      if (ingredients?.length) {
        const ingredientData = ingredients.map(name => ({ name, recipeId: recipe.id }));
        console.log('Dados de ingredientes:', ingredientData);
        await Ingredient.bulkCreate(ingredientData);
      }
  
      if (instructions?.length) {
        const instructionData = instructions.map(description => ({ description, recipeId: recipe.id }));
        console.log('Dados de instruções:', instructionData);
        await Instruction.bulkCreate(instructionData);
      }
  
      if (tags?.length) {
        const tagData = tags.map(name => ({ name, recipeId: recipe.id }));
        console.log('Dados de tags:', tagData);
        await Tag.bulkCreate(tagData);
      }
  
      res.status(200).send();
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao adicionar receita');
    }
  };

module.exports = {
    getAll,
    getById,
    put,
    post
};