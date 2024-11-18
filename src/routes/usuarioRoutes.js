const { listarTodosUsuarios, listarUmUsuario, criarUsuario, login } = require('../controllers/usuarioController');
const { verificarToken } = require('../utils');

const router = require('express').Router();

router.get('/', verificarToken, async (req, res) => {
    res.send(await listarTodosUsuarios());
})

router.get('/:id', async (req, res) => {
    res.send(await listarUmUsuario(req.params.id))
})

router.post('/', async (req, res) => {
    res.send(await criarUsuario(req.body))
})

router.post('/login', async (req, res) => {
    res.send(await login(req.body))
})

module.exports = router;