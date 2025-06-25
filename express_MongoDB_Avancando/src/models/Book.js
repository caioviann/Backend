import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    id: {type: String},
    title: {
      type: String,
      required: [true, "O nome do livro é obrigatório"]
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "autores",
      required: [true, "O nome do(a) autor(a) é obrigatória"]},
    publisher: {
      type: String,
      required: [true, "A editora é obrigatória"]},
    numberPages: {type: Number}
  }
);

const books = mongoose.model("books", bookSchema);

export default books;