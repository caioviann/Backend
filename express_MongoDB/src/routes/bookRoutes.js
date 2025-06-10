import express from "express";
import BookController from "../controllers/bookController.js";

const routes = express.Router();

routes.get("/livros", BookController.listBooks);
routes.get("/livros/busca", BookController.listBooksByPublisher);
routes.get("/livros/:id", BookController.SearchBookById);
routes.post("/livros", BookController.postBook);
routes.put("/livros/:id", BookController.putBook);
routes.delete("/livros/:id", BookController.deleteBook);

export default routes;