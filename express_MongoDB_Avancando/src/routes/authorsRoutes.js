import express from "express";
import AuthorController from "../controllers/authorsController.js";

const router = express.Router();

router
  .get("/autores", AuthorController.authorList)
  .get("/autores/:id", AuthorController.authorListById)
  .post("/autores", AuthorController.authorRegister)
  .put("/autores/:id", AuthorController.authorUpdate)
  .delete("/autores/:id", AuthorController.authorDelete);

export default router;   