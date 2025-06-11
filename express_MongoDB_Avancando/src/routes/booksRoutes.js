import express from "express";
import bookController from "../controllers/booksController.js";

const router = express.Router();

router
  .get("/livros", bookController.bookList)
  .get("/livros/busca", bookController.bookListByPublisher)
  .get("/livros/:id", bookController.bookListById)
  .post("/livros", bookController.booksRegister)
  .put("/livros/:id", bookController.bookUpdate)
  .delete("/livros/:id", bookController.bookDelete);

export default router;   