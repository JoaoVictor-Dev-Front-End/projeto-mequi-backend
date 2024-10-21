const router = require('express').Router();

router.get('/', (req, res) => {
    res.send('Listar cupons')
})

router.post('/', (req, res) => {
    res.send('Criar cupons')
})

router.put('/', (req, res) => {
    res.send('Editar cupons')
})

router.delete('/', (req, res) => {
    res.send('Deletar cupons')
})

module.exports = router;
