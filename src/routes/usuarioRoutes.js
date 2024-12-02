const { listarTodosUsuarios, listarUmUsuario, criarUsuario, login } = require('../controllers/usuarioController');
const { verificarToken } = require('../utils');

const router = require('express').Router();

router.get('/', verificarToken, async (req, res) => {
    // #swagger.description = 'Retorna lista de usuarios'
    res.send(await listarTodosUsuarios());
})

router.get('/:id', async (req, res) => {
    res.send(await listarUmUsuario(req.params.id))
})

router.post('/', async (req, res) => {
    // #swagger.description = 'Cria um usuario'
    /* #swagger.parameters['obj'] = {
    in: 'body',
    schema: {
        $usuario_email: "email@email.com",
        $usuario_senha: "min-8 dig+1-letra-maiscula+1-alfanumerico",
        $usuario_nome: "Nome do Usuario",
        }
    } */ 
    res.send(await criarUsuario(req.body))
})

router.post('/login', async (req, res) => {
    res.send(await login(req.body))
})

module.exports = router;