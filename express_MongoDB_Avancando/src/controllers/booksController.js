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

      res.status(200).send(resultBook);
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

      await books.findByIdAndUpdate(id, {$set: req.body});

      res.status(200).send({message: "Livro atualizado com sucesso"});
    } catch (err) {
      next(err);
    }
  };

  static bookDelete = async (req, res, next) => {
    try {
      const id = req.params.id;

      await books.findByIdAndDelete(id);

      res.status(200).send({message: "Livro removido com sucesso"});
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