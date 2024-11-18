const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

async function listarTodosUsuarios(){
    try {
        return await prisma.usuarios.findMany({
            select:{
                usuario_id: true,
                usuario_nome: true,
                usuario_email: true,
                usuario_tipo: true,
                createdAt: true,
                updatedAt: true,
            }
        });
    } catch (error) {
        return {
            severity: 'error',
            detail: error.message
        }
    }
}

async function listarUmUsuario(id){
    try {
        return await prisma.usuarios.findFirst({
            where: {
                usuario_id: Number(id)
            }
        });
    } catch (error) {
        return {
            severity: 'error',
            detail: error.message
        }
    }
}

async function criarUsuario(dados) {
    try {
        return await bcrypt.hash(dados.usuario_senha, 10).then(async (senha_segura) => {
            let dados_seguros = { ...dados, usuario_senha: senha_segura }
            return await prisma.usuarios.create({
                data: dados_seguros
            })    
        })
    } catch (error) {
        return {
            severity: 'error',
            detail: error.message
        }
    }
}

async function login(dados){
    try {
        const usuario = await prisma.usuarios.findFirst({
            where: {
                usuario_email: dados.usuario_email
            }
        })
        if(usuario){
            return await bcrypt.compare(dados.usuario_senha, usuario.usuario_senha).then(result => {
                if(result){
                    const token = jwt.sign({email: dados.usuario_email}, process.env.SEGREDO, { expiresIn: '1h'})
                    return {
                        severity: 'success',
                        detail: 'Usuário logado com sucesso!',
                        token
                    }
                }
                return {
                    severity: 'warn',
                    detail: 'Email ou senha incorreto'
                }
            });
        }
        return {
            severity: 'warn',
            detail: 'Email ou senha incorreto'
        }
    } catch (error) {
        return {
            severity: 'error',
            detail: error.message
        }
    }
}


module.exports = {
    listarTodosUsuarios,
    listarUmUsuario,
    criarUsuario,
    login
}
