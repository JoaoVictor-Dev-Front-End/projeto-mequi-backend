const { listarTodosCupons, listarUmCupom, criarUmCupom, editarUmCupom, deletarUmCupom } = require('../controllers/cupomController');
const router = require('express').Router();

router.get('/', async (req, res) => {
    res.send(await listarTodosCupons());
})

router.get('/:id', async (req, res) => {
    res.send(await listarUmCupom(req.params.id));
})

router.post('/', async (req, res) => {
    res.send(await criarUmCupom(req.body))
})

router.put('/:id', async (req, res) => {
    res.send(await editarUmCupom(req.body, req.params.id))
})

router.delete('/:id', async (req, res) => {
    res.send(await deletarUmCupom(req.params.id))
})

module.exports = router;
