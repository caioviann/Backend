import books from "../models/Book.js";

class BookController {

  static bookList = async (req, res) => {
    try {
      const resultBook = await books.find();

      res.status(200).json(resultBook);
    } catch (erro) {
      res.status(500).json({ message: "Erro interno no servidor" });
    }
  };

  static bookListById = async (req, res) => {
    try {
      const id = req.params.id;

      const resultBook = await books.findById(id);

      res.status(200).send(resultBook);
    } catch (erro) {
      res.status(400).send({message: `${erro.message} - Id do livro não localizado.`});
    }
  };

  static booksRegister = async (req, res) => {
    try {
      let livro = new books(req.body);

      const resultBook = await livro.save();

      res.status(201).send(resultBook.toJSON());
    } catch (erro) {
      res.status(500).send({message: `${erro.message} - falha ao cadastrar livro.`});
    }
  };

  static bookUpdate = async (req, res) => {
    try {
      const id = req.params.id;

      await books.findByIdAndUpdate(id, {$set: req.body});

      res.status(200).send({message: "Livro atualizado com sucesso"});
    } catch (erro) {
      res.status(500).send({message: erro.message});
    }
  };

  static bookDelete = async (req, res) => {
    try {
      const id = req.params.id;

      await books.findByIdAndDelete(id);

      res.status(200).send({message: "Livro removido com sucesso"});
    } catch (erro) {
      res.status(500).send({message: erro.message});
    }
  };

  static bookListByPublisher = async (req, res) => {
    try {
      const publisher = req.query.editora;

      const resultBook = await books.find({"editora": publisher});

      res.status(200).send(resultBook);
    } catch (erro) {
      res.status(500).json({ message: "Erro interno no servidor" });
    }
  };



}

export default BookController;