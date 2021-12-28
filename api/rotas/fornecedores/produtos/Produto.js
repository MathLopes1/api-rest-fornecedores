//Importando DAO para classe
const Tabela = require('./TabelaProduto')

//Classe para representar produtos
class Produto {
    constructor({ id, titulo, preco, estoque, fornecedor, dataCriacao, dataAtualizacao, versao }) {
        this.id = id
        this.titulo = titulo
        this.preco = preco
        this.estoque = estoque
        this.fornecedor = fornecedor
        this.dataCriacao = dataCriacao
        this.dataAtualizacao = dataAtualizacao
        this.versao = versao
    }

    //Validando informações recebidas
    validar (){

        //Validando titulo
        if(typeof this.titulo !== 'string' || this.titulo.length === 0){
            throw new Error('O campo está inválido')
        }   

        //Validando preco
        if(typeof this.preco !== 'number' || this.preco === 0){
            throw new Error('O campo preco está inválido')
        }
    }

    //Metodo para inserir as informações recebidas nos respectivos campos do Database
    async criar() {
        this.validar()
        const resultado = await Tabela.inserir({
            titulo: this.titulo,
            preco: this.preco,
            estoque: this.estoque,
            fornecedor: this.fornecedor
        })

        this.id = resultado.id
        this.dataCriacao = resultado.dataCriacao
        this.dataAtualizacao = resultado.dataAtualizacao
        this.versao = resultado.versao
    }

    apagar (){
        return Tabela.remover(this.id, this.fornecedor)
    }
}

module.exports = Produto