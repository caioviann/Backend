import express from "express";
import AuthorController from "../controllers/authorController.js";

const routes = express.Router();

routes.get("/autores", AuthorController.listAuthor);
routes.get("/autores/:id", AuthorController.SearchAuthorById);
routes.post("/autores", AuthorController.postAuthor);
routes.put("/autores/:id", AuthorController.putAuthor);
routes.delete("/autores/:id", AuthorController.deleteAuthor);

export default routes;