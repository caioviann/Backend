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
      required: [true, "O nome do(a) autor(a) é obrigatória"]
    },
    publisher: {
      type: String,
      required: [true, "A editora é obrigatória"],
      enum: {
        values: ["Casa Do código", "Alura"],
        message: "A editora {VALUE} não é um valor permitido."
      }
    },
    numberPages: {
      type: Number,
      validate: {
        validator: (value) => {
          return value >= 10 && value <= 5000;
        },
        message: "O número de página deve estar entre 10 e 5000. Valor fornecido: {VALUE}"
      }
    }
  }
);

const books = mongoose.model("books", bookSchema);

export default books;