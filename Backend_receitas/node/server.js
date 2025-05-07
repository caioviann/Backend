const express = require('express');
const sequelize = require('./config/db.js');
const Ingrediets = require('./models/Ingredient.js');


const app = express();
app.use(express.json());

sequelize.sync().catch(() => {
    console.log("banco sincronizado");
});
app.listen(3000, () => {
    console.log('Servidor Ouvindo na porta 3000');
});





//app.post('/ingredientes', async (req, res) => {
//    const { name } = req.body;
//    const ingredient = await Ingrediets.create({ name });
//    res.json({ id: ingredient.id , name: ingredient.name});
//});

//app.get('/ingredientes/:id', async (req, res) => {
//    const id = req.params.id;
//    res.send(`Ingrediente Requisitado: ${id}`);
//});

//app.get('/ingredientes/nome/:name', async (req, res) => {
//    const ingredient = await Ingrediets.findOne({ where: { name: req.params.name } });
//    if (ingredient) res.json(ingredient);
//    else res.status(404).send('Ingrediente não encontrado');
//  });