//Impostando o servidr

const express = require ('express')


//Inicializando o servidor
const app = express()

//Middleware(meio termo)para pemitir o uso do json - analisa os dados JSON que vêm nas requisições HTTP e os transforma em um objeto JavaScript.
app.use(express.json());

const dotenv = require('dotenv')

//Configurando o env
dotenv.config()

//Definir a porta que o servidor ira rodar
const port = process.env.PORTA 


//Banco de Dados
const produtos = []

//rota raiz
app.get('/', (requisicao, resposta) => {
    try {
        if (produtos.length ===0) {
            return resposta.status(200).json({msg:"não há produtos para serem exibidos"})
        }
        resposta.status(200).json(produtos)
    } catch(error){
        resposta.status(500).json({msg:"erro ao listar produtos"})
    }
})


//Rota de cadastro de produtos
app.post('/', (requisicao, resposta) =>{
    try { 
        const {id, nome, preco, quantidade} = requisicao.body;
        const novoProduto = {id, nome, preco, quantidade};
        produtos.push(novoProduto);
        resposta.status(201).json(novoProduto)

    } catch (error) {
        
    }
})

//Rota de Editar  produtos
app.put('/:id', (requisicao, resposta) => {
    try { 
        const id = parseInt(requisicao.params.id);      
        const produto = produtos.find(elemento =>  elemento.id == id); 
        if (!produto){
            resposta.status(404).json({msg:"produto não encontrado"});
        }
        const {novoNome, novoPreco, novaQuantidade} = requisicao.body;
        if (produto){
            produto.nome = novoNome;
            produto.preco = novoPreco;
            produto.quantidade = novaQuantidade;
        }
        resposta.status(200).json(produto)

    } catch (error) {
    resposta.status(500).json({msg:"erro ao editar produtos"})          
    }                                                                                                                                                                                                                                                                                             
})

//Rota de deletar  produtos
app.delete('/:id', (requisicao, resposta) => {
    try {
        const id = requisicao.params.id;
        const produto = produtos.findIndex (elemento => elemento.id == id);
        if(produto !== -1){
            produtos.splice(produto,1)
            resposta.json({msg:"produto deletado com sucesso"})
        }else {
            resposta.status(404).json({msg:"produto não encontrado"});
        }
    } catch (error) {
    }
})


//Ouvindo a porta 3000 e exibindo uam mensagem
app.listen(port, () =>{
    console.log(`servidor rodando em http://localhost:${port}`)
})