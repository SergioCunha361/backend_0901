//Impostando o servidr

const express = require ('express')


//Inicializando o servidor
const app = express()

//Middleware(meio termo)para pemitir o uso do json
app.use(express.json());''

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

//rota  /hello
app.get('/', (requisicao, resposta) => {
    resposta.send('Heloo Word')
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
// http:localhost:3000/1
app.put('/:id', (requisicao, resposta) => {
    try { 
        const {id} = requisicao.params;        
        const produto = produtos.find(elemento) => elemento.id === id)
        if (produto){
            resposta.status(404).json({msg:"produto não encontrado"})
        }
        const {novoNome, novoPreco, novaQuantidade} = requisicao.body;
        if (produto){
            produto.nome = novoNome;
            produto.preco= novoPreco;
            produto.quntidade = novaQuantidade;
            return produto
        }
        resposta.status(200).json(Produto)

    } catch (error) {
    resposta.status(500).json({msg:"erro ao editar produtos"})   
        
    }
})


//Ouvindo a porta 3000 e exibindo uam mensagem
app.listen(port, () =>{
    console.log(`servidor rodando em http://localhost:${port}`)
})