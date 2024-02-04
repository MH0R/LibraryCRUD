import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";

async function paginar(req, res, next) {
  try {
    let { pagina = 1, limite = 3, ordenacao = "id:1"} = req.query;
    let [campo, ordem] = ordenacao.split(":");

    pagina = parseInt(pagina);
    limite = parseInt(limite);

    const resultado = req.resultado;
    const errorMessage = res.message;
    if (pagina > 0 && limite > 0) {
      const resultadoPaginado = await resultado.find({})
        .sort({[campo]: ordem})
        .skip((pagina - 1) * limite)
        .limit(limite);
      res.status(200).json(resultadoPaginado);
    } else {
      new RequisicaoIncorreta(errorMessage).enviarResposta(res);
    }
  } catch (erro) {
    next(erro);
  }
}

export default paginar;