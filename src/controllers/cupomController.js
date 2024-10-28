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
async function criarUmCupom(){

}
async function editarUmCupom(){

}
async function deletarUmCupom(){

}

module.exports = {
    listarTodosCupons,
    listarUmCupom,
    criarUmCupom,
    editarUmCupom,
    deletarUmCupom
}
