import {livro} from "../models/index.js";
import { autor } from "../models/index.js";
import NaoEncontrado from "../erros/NaoEncontrado.js";
// import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";

class LivroController {

  static listarLivros = async (req, res, next) => {
    try {
      const buscaLivros = livro.find();
      req.resultado = buscaLivros;
      next();
    } catch (erro) {
      next(erro);
    }
  };

  static listarLivroPorID = async (req, res, next) => {
    try {
      const id = req.params.id;
      const listaLivro = await livro.findById(id) || 0;
      if (listaLivro) {
        res.status(200).json(listaLivro);
      } else {
        new NaoEncontrado("Livro não encontrado").enviarResposta(res);
      }
    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarLivro = async (req, res, next) => {
    const novoLivro = req.body;
    try {
      const autorEncontrado = await autor.findById(novoLivro.autor) || 0;
      if (autorEncontrado) {
        const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc } };
        const livroCriado = await livro.create(livroCompleto);
        res.status(201).json({ message: "Criado com sucesso", livro: livroCriado });
      } else {
        new NaoEncontrado("Autor não encontrado.").enviarResposta(res);
      }
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
      const livroAtualizado = await livro.findByIdAndUpdate(id, req.body) || 0;
      if (livroAtualizado) {
        res.status(200).json({ message: "Livro atualizado"});
      } else {
        new NaoEncontrado("Livro não Encontrado").enviarResposta(res);
      }
    } catch (erro) {
      next(erro);
    }
  };

  static deletarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
      const livroDeletado = await livro.findByIdAndDelete(id) || 0;
      if (livroDeletado) {
        res.status(200).json({ message: "Livro deletado"});
      } else {
        new NaoEncontrado("Livro não encontrado").enviarResposta(res);
      }
    } catch (erro) {
      next(erro);
    }
  };

  static buscaLivroPorFiltro = async (req, res, next) =>  {
    const {editora, titulo, minPaginas, maxPaginas, nomeAutor} = req.query;
    const minNMax = minPaginas && maxPaginas != null ? true : false;
    let busca = {};

    if (editora)  busca.editora = {$regex: editora, $options: "i"};
    if (titulo) busca.titulo = {$regex: titulo, $options: "i"};
    if (minNMax) busca.paginas = {$gte: minPaginas, $lte: maxPaginas};
    if (!minPaginas == false && minNMax == false) busca.paginas = {$gte: minPaginas};
    if (!maxPaginas == false && minNMax == false) busca.paginas = {$lte: maxPaginas};
    if (nomeAutor) {
      const autores = await autor.findOne({ nome: nomeAutor});
      if (autores != null) {
        busca.autor = autores.id;
      } else {
        busca = null;
      }
    }
    
    try {
      if (busca !== null) {
        const livroBuscado = livro
          .find(busca);
        req.resultado = livroBuscado;
        next();
      } else {
        new NaoEncontrado("Livro não encontrado").enviarResposta(res);
      }} catch (erro) {
      next(erro);
    }
  };
}
      

 

export default LivroController;