import NaoEncontrado from "../erros/NaoEncontrado.js";
import { autor } from "../models/index.js";

class AutorController {

  static listarAutores = async (req, res, next) => {
    try {
      const listaAutores = autor.find({});

      req.resultado = listaAutores;
      res.message = "Autor não encontrado";
      next();
    } catch (erro) {
      next(erro);
    }
  };

  static listarAutorPorID = async (req, res, next) => {
    try {
      const id = req.params.id;
      const listaAutor = await autor.findById(id) || 0;
      if (listaAutor) {
        res.status(200).json(listaAutor);
      } else {
        new NaoEncontrado("Autor não encontrado").enviarResposta(res);
      }
    } catch (erro) {
      next(erro);
    }
  };

  // static listarAutoresFiltro = async (req, res, next) => {
  //   const {nome, nacionalidade} = req.params;
  //   const busca = {};
  //   if (nome) busca.nome = {$regex: nome, $options: "i"};
  //   if (nacionalidade) busca.nacionalidade = {$regex: nacionalidade, $options: "i"};
  //   try {
  //     const autorBuscado = await autor.find(busca);
  //     if (autorBuscado.length > 0) {
  //       res.status(200).json(autorBuscado);
  //     } else {
  //       new NaoEncontrado("Autor não encontrado").enviarResposta(res);
  //     }
  //   } catch (erro) {
  //     next(erro);
  //   }
  // };

  static cadastrarAutor = async (req, res, next) => {
    try {
      const novoAutor = await autor.create(req.body);
      res.status(201).json({ message: "Criado com sucesso", livro: novoAutor });
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarAutor = async (req, res, next) => {
    try {
      const id = req.params.id;
      const autorAtualizado = await autor.findByIdAndUpdate(id, req.body) || 0;
      if (autorAtualizado) {
        res.status(200).json({ message: "Autor atualizado"});
      } else {
        new NaoEncontrado("Autor não encontrado").enviarResposta(res);
      }
    } catch (erro) {
      next(erro);
    }
  };

  static deletarAutor= async (req, res, next) => {
    try {
      const id = req.params.id;
      const autorDeletado = await autor.findByIdAndDelete(id) || 0;
      if (autorDeletado) {
        res.status(200).json({ message: "Autor deletado"});
      } else {
        new NaoEncontrado("Autor não encontrado").enviarResposta(res);
      }
    } catch (erro) {
      next(erro);
    }
  };

}

export default AutorController;