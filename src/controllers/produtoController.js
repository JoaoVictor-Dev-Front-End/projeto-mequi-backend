const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient();

const formi = require("formidable");
const fs = require("fs");
const path = require("path");
const util = require('util');

const copyFileAsync = util.promisify(fs.copyFile);
const unlinkAsync = util.promisify(fs.unlink);

const uploadDir = path.join(__dirname, '../uploads/produtos_imagem');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

async function criarProduto(dados) {
    try {
        return new Promise((resolve, reject) => {
            const form = new formi.IncomingForm({});

            form.parse(dados, async (err, fields, files) => {
                if (err) {
                    return reject({
                        status: 400,
                        message: err.message
                    });
                }

                if (!files.produto_imagem) {
                    return reject({
                        status: 400,
                        message: 'O arquivo é obrigatório'
                    });
                }

                if (!files.produto_imagem[0].originalFilename.includes(".png") && !files.produto_imagem[0].originalFilename.includes(".jpg")) {
                    return reject({
                        status: 400,
                        message: 'O arquivo precisa ser do tipo PNG ou JPG'
                    });
                }


                const oldpath = files.produto_imagem[0].filepath;
                const filename = files.produto_imagem[0].originalFilename.split('.');
                const newFilename = `${filename[0].replaceAll(' ', '-').toLowerCase()}-${Date.now()}.${filename[1]}`
                const newpath = path.join(__dirname, '../uploads/produtos_imagem', newFilename);

                try {
                    await copyFileAsync(oldpath, newpath);
                    await unlinkAsync(oldpath);
                    await prisma.produtos.create({
                        data: {
                            produto_nome: fields.produto_nome[0],
                            produto_preco: fields.produto_preco[0],
                            produto_imagem: newFilename
                        }
                    })
                } catch (err) {
                    return reject({
                        status: 400,
                        message: err.message
                    });
                }

                resolve();
            })
        }).then(() => {
            return {
                status: 200,
                severity: 'success',
                message: 'Dados criados com sucesso'
            }
        }).catch((error) => {
            return {
                status: 200,
                severity: 'error',
                message: error.message
            }
        });
    } catch (error) {
        return {
            severity: 'error',
            detail: error.message
        }
    }
}

module.exports = {
    criarProduto
}