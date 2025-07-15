import NotFound from "../errors/NotFound.js";
import books from "../models/Book.js";

class BookController {

  static bookList = async (req, res, next) => {
    try {
      const resultBook = await books.find();

      res.status(200).json(resultBook);
    } catch (err) {
      next(err);
    }
  };

  static bookListById = async (req, res, next) => {
    try {
      const id = req.params.id;

      const resultBook = await books.findById(id);
      if(resultBook !== null){
        res.status(200).send(resultBook);
      } else {
        next(new NotFound("- Id do livro não encontrado"));
      }

     
    } catch (err) {
      next(err);
    }
  };

  static booksRegister = async (req, res, next ) => {
    try {
      let livro = new books(req.body);

      const resultBook = await livro.save();

      res.status(201).send(resultBook.toJSON());
    } catch (err) {
      next(err);
    }
  };

  static bookUpdate = async (req, res, next) => {
    try {
      const id = req.params.id;

      const result = await books.findByIdAndUpdate(id, {$set: req.body});
      if(result !== null){
        res.status(200).send({message: "Livro atualizado com sucesso"});
      } else {
        next(new NotFound("- Id do livro não encontrado"));
      }

    } catch (err) {
      next(err);
    }
  };

  static bookDelete = async (req, res, next) => {
    try {
      const id = req.params.id;

      const result = await books.findByIdAndDelete(id);
      if(result !== null){
        res.status(200).send({message: "Livro removido com sucesso"});
      } else{
        next(new NotFound("- Id do livro não encontrado"));
      }

    } catch (err) {
      next(err);
    }
  };

  static bookListByPublisher = async (req, res, next) => {
    try {
      const publisher = req.query.publisher;

      const resultBook = await books.find({"publisher": publisher});

      res.status(200).send(resultBook);
    } catch (err) {
      next(err);
    }
  };



}

export default BookController;