const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function listarTodosCupons(){
    return await prisma.cupons.findMany();
}
async function listarUmCupom(id){
    return await prisma.cupons.findFirst({
        where: {
            cupom_id: Number(id)
        }
    })
}
async function criarUmCupom(dados){
    try {
        return await prisma.cupons.create({
            data: dados
        })
    } catch (error) {
        return {
            severity: 'error',
            detail: error.message
        }
    }
}
async function editarUmCupom(dados, id){
    try {
        return await prisma.cupons.update({
            data: dados,
            where: {
                cupom_id: Number(id)
            }
        })
    } catch (error) {
        return {
            severity: 'error',
            detail: error.message
        }
    }
}
async function deletarUmCupom(id){
    try {
        return await prisma.cupons.delete({
            where: {
                cupom_id: Number(id)
            }
        }).then(() => {
            return {
                severity: 'success',
                detail: 'Dados deletados com sucesso'
            }
        })
    } catch (error) {
        return {
            severity: 'error',
            detail: error.message
        }
    }
}

module.exports = {
    listarTodosCupons,
    listarUmCupom,
    criarUmCupom,
    editarUmCupom,
    deletarUmCupom
}
