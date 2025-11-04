import express from "express";
import bookController from "../controllers/booksController.js";
import paginate from "../middlewares/paginate.js";

const router = express.Router();

router
  .get("/livros", bookController.bookList, paginate)
  .get("/livros/busca", bookController.bookListByFilter, paginate)
  .get("/livros/:id", bookController.bookListById)
  .post("/livros", bookController.booksRegister)
  .put("/livros/:id", bookController.bookUpdate)
  .delete("/livros/:id", bookController.bookDelete);

export default router;   