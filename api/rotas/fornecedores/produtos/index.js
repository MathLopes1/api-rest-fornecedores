//rotas relacionadas a produto
const roteador = require('express').Router({ mergeParams: true}) //Juntando os parametros das rotas
//importando o DAO para nossa rota
const Tabela = require('./TabelaProduto')
//importando Classe Produto
const Produto = require('./Produto')

//metodo GET produtos
roteador.get('/', async (requisicao, resposta) => {
    const produtos = await Tabela.listar(requisicao.params.idFornecedor)
    resposta.send(
        JSON.stringify(produtos)
    )
})

//Metodo Post Produtos
roteador.post('/',  async (requisicao, resposta) => {
    const idFornecedor = requisicao.params.idFornecedor
    const corpo = requisicao.body
    const dados = Object.assign({}, corpo, { fornecedor: idFornecedor})
    //instanciando classe e passando os dados como parametro
    const produto = new Produto(dados)
    await produto.criar()
    resposta.status(201)
    resposta.send(produto)
})
//Metodo Delete para Produtos
roteador.delete('/:id', async (requisicao, resposta) => {
    const dados = {
        id: requisicao.params.id,
        fornecedor: requisicao.params.idFornecedor
    }
    const produto = new Produto(dados)

    await produto.apagar()
    resposta.status(204)
    resposta.end()
})


module.exports = roteador