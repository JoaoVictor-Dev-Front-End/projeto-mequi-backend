const express = require("express");
const app = express();

const usuarioRoutes = require('./src/routes/usuarioRoutes');
const cupomRoutes = require('./src/routes/cupomRoutes');
const { verificarToken } = require("./src/utils");

app.use(express.json());

app.get("/", (req, res) => {
    res.send('hello world');
})

app.use("/usuarios", usuarioRoutes);
app.use("/cupons", verificarToken, cupomRoutes);

app.all("*", (req, res) => {
    res.status(404).send("Rota não encontrada!");
})

app.listen(8000, () => {
    console.log(`Servidor de pé: http://localhost:8000`);
})