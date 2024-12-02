const express = require("express");
const app = express();

const usuarioRoutes = require('./src/routes/usuarioRoutes');
const cupomRoutes = require('./src/routes/cupomRoutes');
const produtoRoutes = require('./src/routes/produtoRoutes');

const { verificarToken } = require("./src/utils");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/files', express.static('./src/uploads/produtos_imagem'));

app.get("/", (req, res) => {
    res.send('hello world');
})

app.use("/usuarios", usuarioRoutes);
app.use("/cupons", verificarToken, cupomRoutes);
app.use("/produtos", produtoRoutes);

app.all("*", (req, res) => {
    res.status(404).send("Rota não encontrada!");
})

app.listen(8000, () => {
    console.log(`Servidor de pé: http://localhost:8000`);
})