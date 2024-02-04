import mongoose from "mongoose";

async function conectaNaDatabase() {
  mongoose.connect(process.env.STRING_CONEXAO_DB);
  return mongoose.connection;
}

export default conectaNaDatabase;