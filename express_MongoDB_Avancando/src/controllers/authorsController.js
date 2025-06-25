import NotFound from "../errors/NotFound.js";
import { authors } from "../models/Author.js";

class AuthorController {

  static authorList = async(req, res, next) => {
    try {
      const resultAuthor = await authors.find();

      res.status(200).json(resultAuthor);
      
    } catch (err) {
      next(err);
    }
  };

  static authorListById = async (req, res, next) => {
    
    try {
      const id = req.params.id;
  
      const resultAuthor = await authors.findById(id);

      if(resultAuthor !== null){
        res.status(200).send(resultAuthor);
      }else{
        next(new NotFound("- Id do Autor não localizado."));
      }
  
    } catch (err) {
      next(err);
    }
  };
  
  
  static authorRegister = async (req, res, next) => {
    try {
      let autor = new authors(req.body);
  
      const resultAuthor = await autor.save();
  
      res.status(201).send(resultAuthor.toJSON());
    } catch (err) {
      next(err);
    }
  };
  

  static authorUpdate = async (req, res, next) => {
    try {
      const id = req.params.id;
  
      await authors.findByIdAndUpdate(id, {$set: req.body});
  
      res.status(200).send({message: "Autor atualizado com sucesso"});
    } catch (err) {
      next(err);
    }
  };
  
  static authorDelete = async (req, res, next) => {
    try {
      const id = req.params.id;
  
      await authors.findByIdAndDelete(id);
  
      res.status(200).send({message: "Autor removido com sucesso"});
    } catch (err) {
      next(err);
    }
  };
  

}

export default AuthorController;