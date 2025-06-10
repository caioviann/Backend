import express from "express";
import connectDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js";
const connect = await connectDatabase();

connect.on("error", (erro) => {
    console.error("erro de conexão", erro);
});

connect.once("open", () => {
    console.log("Conexão Bem sucedida.");
})

const app = express();
routes(app);

export default app;

