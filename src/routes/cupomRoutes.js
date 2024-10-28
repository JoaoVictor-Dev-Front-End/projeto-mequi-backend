const { listarTodosCupons, listarUmCupom } = require('../controllers/cupomController');


const router = require('express').Router();

router.get('/', async (req, res) => {
    res.send(await listarTodosCupons());
})

router.get('/:id', async (req, res) => {
    res.send(await listarUmCupom(req.params.id));
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
