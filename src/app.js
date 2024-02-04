import express from "express";
import conectaNaDatabase from "./config/dbconnect.js";
import routes from "./routes/index.js";
import manipulador404 from "./middlewares/manipulador404.js";
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";

const conexao = await conectaNaDatabase();

conexao.on("error", (err) => {
  console.error("Erro de conexão", err);
});

conexao.once("open", () => {
  console.log("Conexão com sucesso");
});

const app = express();
routes(app);
app.use(manipulador404);
// eslint-disable-next-line no-unused-vars
app.use(manipuladorDeErros);


export default app;


