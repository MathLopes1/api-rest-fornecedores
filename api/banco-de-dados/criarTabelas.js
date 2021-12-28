//Criação de tabelas
const modelos  = [
    require('../rotas/fornecedores/ModeloTabelaFornecedor'),
    require('../rotas/fornecedores/produtos/ModeloTabelaProduto')
]

//Criar as duas tabelas ao mesmo tempo
async function criarTabelas(){
    for(let i = 0; i < modelos.length; i++){
        const modelo = modelos[i]
        await modelo.sync()
    }
}

criarTabelas()
