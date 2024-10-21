const express = require("express");
const app = express();

const cupomRoutes = require('./src/routes/cupomRoutes')

app.get("/", (req, res) => {
    res.send('e ai');
})

app.use("/cupons", cupomRoutes)


app.listen(8000, () => {
    console.log(`Servidor de pé: http://localhost:8000`);
})