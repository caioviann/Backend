import { authors } from "../models/Author.js";

class AuthorController {

  static authorList = async(req, res) => {
    try {
      const resultAuthor = await authors.find();

      res.status(200).json(resultAuthor);
      
    } catch (erro) {
      res.status(500).json({ message: "Erro interno no servidor" });
    }
  };

  static authorListById = async (req, res) => {
    
    try {
      const id = req.params.id;
  
      const resultAuthor = await authors.findById(id);
  
      res.status(200).send(resultAuthor);
    } catch (erro) {
      res.status(400).send({message: `${erro.message} - Id do Autor não localizado.`});
    }
  };
  
  
  static authorRegister = async (req, res) => {
    try {
      let autor = new authors(req.body);
  
      const resultAuthor = await autor.save();
  
      res.status(201).send(resultAuthor.toJSON());
    } catch (erro) {
      res.status(500).send({message: `${erro.message} - falha ao cadastrar Autor.`});
    }
  };
  

  static authorUpdate = async (req, res) => {
    try {
      const id = req.params.id;
  
      await authors.findByIdAndUpdate(id, {$set: req.body});
  
      res.status(200).send({message: "Autor atualizado com sucesso"});
    } catch (erro) {
      res.status(500).send({message: erro.message});
    }
  };
  
  static authorDelete = async (req, res) => {
    try {
      const id = req.params.id;
  
      await authors.findByIdAndDelete(id);
  
      res.status(200).send({message: "Autor removido com sucesso"});
    } catch (erro) {
      res.status(500).send({message: erro.message});
    }
  };
  

}

export default AuthorController;