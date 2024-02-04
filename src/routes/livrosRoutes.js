import express from "express";
import LivroController from "../controllers/livroController.js";
import paginar from "../middlewares/paginar.js";

const routes = express.Router();

routes.get("/livros", LivroController.listarLivros, paginar);
routes.get("/livros/busca", LivroController.buscaLivroPorFiltro, paginar);
routes.get("/livro/:id", LivroController.listarLivroPorID);
routes.post("/livros", LivroController.cadastrarLivro);
routes.put("/livro/:id", LivroController.atualizarLivro);
routes.delete("/livro/:id", LivroController.deletarLivro);

export default routes;