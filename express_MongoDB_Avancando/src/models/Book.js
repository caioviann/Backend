import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    id: {type: String},
    titulo: {type: String, required: true},
    autor: {type: mongoose.Schema.Types.ObjectId, ref: "autores", required: true},
    editora: {type: String, required: true},
    numeroPaginas: {type: Number}
  }
);

const books = mongoose.model("books", bookSchema);

export default books;