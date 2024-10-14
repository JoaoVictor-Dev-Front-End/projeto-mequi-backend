const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send('e ai');
})

app.get("/boas-vindas", (req, res) => {
    res.send('Seja bem-vindo');
})

app.listen(8000, () => {
    console.log(`Servidor de pé: http://localhost:8000`);
})