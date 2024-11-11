const { listarTodosUsuarios, listarUmUsuario, criarUsuario } = require('../controllers/usuarioController');

const router = require('express').Router();

router.get('/', async (req, res) => {
    res.send(await listarTodosUsuarios());
})

router.get('/:id', async (req, res) => {
    res.send(await listarUmUsuario(req.params.id))
})

router.post('/', async (req, res) => {
    res.send(await criarUsuario(req.body))
})

module.exports = router;