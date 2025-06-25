import mongoose from "mongoose";

const authorSchema = new mongoose.Schema(
  {
    id: {type: String},
    name: {
      type: String,
      required: [true, "O nome do(a) Autor(a) é obrigatório"]
    },
    nationality: {type: String}
  },
  {
    versionKey: false
  }
);

const authors = mongoose.model("autores", authorSchema);

export { authors, authorSchema};