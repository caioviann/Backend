import NotFound from "../errors/NotFound.js";
import { authors, books } from "../models/index.js";

class BookController {
  static bookList = async (req, res, next) => {
    try {
      let { limit = 5, page = 1 } = req.query;

      limit = parseInt(limit);
      page = parseInt(page);
      if(limit > 0 && page > 0) {
        const resultBook = await books
          .find()
          .skip((page - 1) * limit)
          .limit(limit)
          .populate("autor")
          .exec();

        res.status(200).json(resultBook);
      }else{
        next(new IncorretRequest);
      }

      
    } catch (err) {
      next(err);
    }
  };

  static bookListById = async (req, res, next) => {
    try {
      const id = req.params.id;

      const resultBook = await books.findById(id);
      if (resultBook !== null) {
        res.status(200).send(resultBook);
      } else {
        next(new NotFound("- Id do livro não encontrado"));
      }
    } catch (err) {
      next(err);
    }
  };

  static booksRegister = async (req, res, next) => {
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

      const result = await books.findByIdAndUpdate(id, { $set: req.body });
      if (result !== null) {
        res.status(200).send({ message: "Livro atualizado com sucesso" });
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
      if (result !== null) {
        res.status(200).send({ message: "Livro removido com sucesso" });
      } else {
        next(new NotFound("- Id do livro não encontrado"));
      }
    } catch (err) {
      next(err);
    }
  };

  static bookListByFilter = async (req, res, next) => {
    try {
      const search = await processSearch(req.query);

      if (search !== null) {
        const resultBook = await books.find(search).populate("autor");

        res.status(200).send(resultBook);
      } else {
        res.status(200).send("num tem esse autor :(");
      }
    } catch (err) {
      next(err);
    }
  };
}

async function processSearch(param) {
  const { publisher, title, minPages, maxPages, nameAuthor } = param;

  let search = {};
  if (publisher) search.publisher = publisher;
  if (title) search.title = { $regex: title, $options: "i" };

  if (minPages || maxPages) search.numberPages = {};
  // gte = Greater Than or Equal = Maior ou igual que
  if (minPages) search.numberPages.$gte = minPages;
  // lte = Less Than or Equal = Menor ou igual que
  if (maxPages) search.numberPages.$lte = maxPages;

  if (nameAuthor) {
    const author = await authors.findOne({ name: nameAuthor });

    if (author !== null) {
      search.autor = author._id;
    } else {
      search = null;
    }
  }

  return search;
}

export default BookController;
