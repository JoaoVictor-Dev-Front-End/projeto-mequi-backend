const { criarProduto } = require('../controllers/produtoController');

const router = require('express').Router();

router.post('/', async (req, res) => {    
    res.send(await criarProduto(req));
})

module.exports = router;