import mongoose from "mongoose";
import { autorSchema } from "./Autor.js";

const livroSchema = new mongoose.Schema({
  id: {type: mongoose.Schema.Types.ObjectId},
  titulo: {type: String, required: [true, "O título do livro é obrigatório"]},
  preco: {type: Number},
  paginas: {
    type: Number,
    min: [10, "O número de páginas deve ser entre 10 e 10.000."],
    max: [10000, "O número de páginas deve ser entre 10 e 10.000."],
  },
  autor: autorSchema,
  editora: {
    type: String,
    required: [true, "A editora é obrigatória"]
  }
}, {versionKey: false});

const livro = mongoose.model("livros", livroSchema);


export default livro;