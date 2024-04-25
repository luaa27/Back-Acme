/*****************************************************
 * Objetivo: Criar uma API de filmes                 *
 * Data: 23/01/2024                                  *
 * Autor: Luana Santos                               *
 * Versão: 1.0                                       *
*****************************************************/

const express =  require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use((request, response, next)=> {

    response.header('Access-Control-allow-Origin', '*')

    response.header('Access-Control-allow-Methods', 'GET')

    app.use(cors())

    next()

})

//Cria um objeto do tipo json para receber os dados via body nas resquisições post ou put
const bodyParserJSON = bodyParser.json()

/* **************************** Imports de arquivos e bibliotecas do projeto **********/

const controllerFilmes = require('./controller/controller_filme')

const controllerGeneros = require('./controller/controller_generos')
const controller_diretor = require('./controller/controller_diretor')

const controllerClassificacao = require('./controller/controller_class')

//************************************************************************************** 

app.get('/v1/FilmesACME/filmes', cors(), async function(request, response, next){
    let listarFilmes = require('./controller/filmes_acme')
    let filmes = listarFilmes.getFilmes()

    if(filmes){
        response.json(filmes)
        response.status(200)
    } else{
        response.json({ERRO: "Desculpe, ocorreu algum problema"})
        response.status(404)
    }
    
})



app.get('/v1/FilmesACME/filmes/:id', cors(), async function(request, response, next){
    let id_filmes = request.params.id

    let pesquisarFilmesId = require('./controller/filmes_acme')
    let buscarId = pesquisarFilmesId.getIdFilmes(id_filmes)

    if(buscarId){
        response.json(buscarId)
        response.status(200)
    } else{
        response.json({ERRO: "Desculpe, ocorreu algum problema"})
        response.status(404)
    }
    
})


app.get('/v2/FilmesACME/filmes', cors(), async function(request, response,next){

    //chama a função para retornar os dados do filmes
    let dadosFilmes = await controllerFilmes.getListarfilmes()

        response.status(dadosFilmes.status_code)
        response.json(dadosFilmes)
        
   
})


app.get('/v2/FilmesACME/filme/:id', cors(), async function(request, response, next){
    //recebe o id da requisição do filme
    let idFilme = request.params.id

    let dadosFilme= await controllerFilmes.getBuscarFilme(idFilme)

    response.status(dadosFilme.status_code)
    response.json(dadosFilme)
})



app.get('/v2/FilmesACME/filmes/filtro', cors(), async function(request, response, next){
    let filmeNome = request.query.nomeFilme

    let procurarFilme = await controllerFilmes.getNomeFilme(filmeNome)

        response.status(procurarFilme.status_code)
        response.json(procurarFilme)
        
   
})

//EndPoint: Inserir novos filmes no Banco de Dados

//não esquecer de colocar o bodyParserJSON, porque é quem define o formato de chegada dos dados
//obs: esse objeto foi criao no inicio do projeto
app.post('/v2/FilmesACME/filme', cors(), bodyParserJSON, async function(request, response, next){

    //recebe content-type da requisição (a API deve receber applicaion/json)
    let contentType = request.headers['content-type']

    //recebe os dados encaminhados na requisição no body (JSON)
    let dadosBody = request.body

    //encainha os dados da requisição para a controller enviar para o db
    let resultDados = await controllerFilmes.setInserirNovoFilme(dadosBody, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.delete('/v2/FilmesACME/filme/:id', cors(), async function(request, response, next){

    let id_filme = request.params.id
    let deleteFilme = await controllerFilmes.setExcluirFilme(id_filme)

    response.status(deleteFilme.status_code)
    response.json(deleteFilme)
})

app.put('/v2/FilmesACME/filme/:id', cors(), bodyParserJSON, async function(request, response, next){
    let contentType = request.headers['content-type']
    let id_filme = request.params.id

    let dadosBody = request.body

    let resultDados = await controllerFilmes.setAtualizarFilme(id_filme, contentType,dadosBody)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

/************************************************ Generos *****************************************/

app.post('/v2/FilmesACME/genero', cors(), bodyParserJSON, async function(request, response, next){
    let contentType = request.headers['content-type']

    let dadosBody = request.body

    let resultDados = await controllerGeneros.setInserirNovoGenero(dadosBody, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.get('/v2/FilmesACME/generos', cors(), async function(request, response, next){
    let allGeneros = await controllerGeneros.getListarGeneros()

    response.status(allGeneros.status_code)
    response.json(allGeneros)
})

app.get('/v2/FilmesACME/generos/:id', cors(), async function(request, response){

    let idGeneroFilme = request.params.id

    let dadosGenerosPorId = await controllerGeneros.getListarGenerosPorId(idGeneroFilme)
    console.log(dadosGenerosPorId);

    if(dadosGenerosPorId){
        response.status(200)
        response.json(dadosGenerosPorId)
    } else {
        response.status(404)
        response.json({message: 'nenhum registro encontrado'})
    }
})

app.delete('/v2/FilmesACME/genero/:id', cors(), async function(request, response, next){
    let id_genero = request.params.id
    let deleteGenero = await controllerGeneros.setExcluirGenero(id_genero)

    response.status(deleteGenero.status_code)
    response.json(deleteGenero)
})

app.put('/v2/FilmesACME/genero/:id', cors(), bodyParserJSON, async function(request, response,next){
    let contentType = request.headers['content-type']
    let id_genero = request.params.id

    let dadosBody = request.body
    

    let resultDados = await controllerGeneros.setAtualizarGenero(id_genero, contentType, dadosBody)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

/************************************************ Classificação *****************************************/

app.get('/v2/FilmesACME/classificacoes', cors(), async function(request,response,next){
    let allClass = await controllerClassificacao.getListarClass()

    response.status(allClass.status_code)
    response.json(allClass)
})

app.post('/v2/FilmesACME/classificacao', cors(), bodyParserJSON, async function(request,response,next){
    let contentType = request.headers['content-type']

    let dadosBody = request.body

    let resultDados = await controllerClassificacao.setInserirNovaClass(contentType,dadosBody)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.delete('/v2/FilmesACME/classDelete/:id')

app.listen(8080, function(){
    console.log('API funcionando e aguardando requisições')
})
/*******************************************DIRETOR************************************************************** */
app.get('/v3/acmefilmes/diretores', cors(),async function (_request,response,next){

    // chama a função da controller para retornar os filmes;
    let dadosDiretor = await controllerDiretor.setListarDiretor()

    // validação para retornar o Json dos filmes ou retornar o erro 404;
   response.status(dadosDiretor.status_code)
   response.json(dadosDiretor)
});

app.get('/v3/acmefilmes/diretores/:id', cors(), async function(request,response,next){

    // recebe o id da requisição
    let idDiretor = request.params.id

    //encaminha o id para a acontroller buscar o Ator
    let dadosDiretor = await controllerDiretor.setListarDiretorById(idDiretor)

    response.status(dadosDiretor.status_code);
    response.json(dadosDiretor);
})

app.delete('/v3/acmefilmes/deleteDiretor/:id', cors (), async function (request,response,next){

    let idDiretor = request.params.id

    let dadosDiretor = await controllerDiretor.setExcluirDiretor(idDiretor)

    response.status(dadosDiretor.status_code);
    response.json(dadosDiretor)
})




app.listen('8080', function () {
    console.log('API FUNCIONANDO');
});


/*******************************************classificacao************************************************************** */

app.get('/v3/acmefilmes/classificacoes', cors(), async function (_request, response) {
    let dadosClassificacao = await controllerFilmes.getListarClassificacoes()

    response.json(dadosClassificacao)
    response.status(200)
})

app.get('/v3/acmefilmes/classificacao/:id', cors(), async function(request, response, next){


//recebe o ID da requisição
let idClassificacao = request.params.id


//encaminha o ID para a controller buscar o filme
let dadosClassificacao = await controllerFilmes.getBuscarClassificacaoID(idClassificacao)

response.status(dadosClassificacao.status_code)
response.json(dadosClassificacao)
})

app.post('/v3/acmefilmes/classificacao', cors(), bodyParserJSON, async function(request, response){
//recebe o contente-type da requisição
let contentType = request.headers['content-type']



//recebe todos os daoos encaminhados na requisição pelo body
let dadosBody = request.body


//encaminha os dados para o controller enviar para DAO
let resultDadosNovaClassificacao = await controllerFilmes.setInserirNovaClassificacao(dadosBody, contentType)
response.status(resultDadosNovaClassificacao.status_code)

response.json(resultDadosNovaClassificacao)
})

app.put('/v3/acmefilmes/classificacao/:id', cors(), bodyParserJSON, async function(request, response){
let contentType = request.headers['content-type']
let dadosBody = request.body
let idClassificacao = request.params.id

let dadosClassificacao = await controllerFilmes.setAtualizarClassificacao(idClassificacao, dadosBody, contentType)

response.status(dadosClassificacao.status_code)
response.json(dadosClassificacao)
})

app.delete('/v3/acmefilmes/classificacao/:id', cors(), async (request, response, next)=>{

let idClassificacao = request.params.id

let dadosClassificacao = await controllerFilmes.setExcluirClassificacao(idClassificacao)

response.status(dadosClassificacao.status_code)
response.json(dadosClassificacao)


})


/*******************************************Nacionalidade************************************************************** */
app.get('/v3/acmefilmes/nacionalidades', cors(),async function (_request,response,next){

// chama a função da controller para retornar os filmes;
let dadosNacionalidade = await controllerNacionalidade.setListarNacionalidade();

// validação para retornar o Json dos filmes ou retornar o erro 404;
if(dadosNacionalidade){
    response.json(dadosNacionalidade);
    response.status(200);
}else{
    response.json({message: 'Nenhum registro foi encontrado'});
    response.status(404);
}
});

app.get('/v3/acmefilmes/nacionalidade/:id', cors(), async function(request,response,next){

// recebe o id da requisição
let idNacionalidade = request.params.id

//encaminha o id para a acontroller buscar o filme
let dadosNacionalidade = await controllerNacionalidade.setListarNacionalidadeById(idNacionalidade);

response.status(dadosNacionalidade.status_code);
response.json(dadosNacionalidade);
})

app.get('/v3/acmeFilmes/nacionalidade/Filtro', cors(), async function(request, response){
let nome = request.query.nome
let dadosNacionalidade = await controllerNacionalidade.setListarAtorNacionalidade(nome)

response.status(dadosNacionalidade.status_code)
response.json(dadosNacionalidade)
})
