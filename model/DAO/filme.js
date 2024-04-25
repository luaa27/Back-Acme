/***************************************************
 * Objetivo: Criar a interação com o banco de dados*
 * MySQL para fazer o CRUD de filmes               *
 * *************************************************
 * data: 30/01/2024                                *
 * Autor: Luana Santos                             *
 * Versão: 1.0                                     *
 *************************************************** */

//Importe da biblioteca do prisma cliente
const { PrismaClient } = require('@prisma/client')

//Instanciando o objeto prisma com as caracteristicas do prisma client
const prisma = new PrismaClient()

//Inserir um novo filme
const insertFilme = async function (dadosFilme) {
try {

    let sql
    if (dadosFilme.data_relancamento == null || 
        dadosFilme.data_relancamento == ""   || 
        dadosFilme.data_relancamento == undefined
        ){

        //Script sql para inserir novo filme
     sql = `insert into tbl_filme (
        nome,
        sinopse,
        data_lancamento,
        data_relancamento,
        duracao,
        foto_capa,
        valor_unitario
    ) values (
        '${dadosFilme.nome}',
        '${dadosFilme.sinopse}',
        '${dadosFilme.data_lancamento}',
         null,
        '${dadosFilme.duracao}',
        '${dadosFilme.foto_capa}',
        '${dadosFilme.valor_unitario}'
    )`
    } else {
        sql = `insert into tbl_filme (
            nome,
            sinopse,
            data_lancamento,
            data_relancamento,
            duracao,
            foto_capa,
            valor_unitario
        ) values (
            '${dadosFilme.nome}',
            '${dadosFilme.sinopse}',
            '${dadosFilme.data_lancamento}',
            '${dadosFilme.data_relancamento}',
            '${dadosFilme.duracao}',
            '${dadosFilme.foto_capa}',
            '${dadosFilme.valor_unitario}'
        )`
    }

    
//Executa o script no DB (devemos utilizar o comando execute e não query)
//O comando execute deve ser utilizado para (insert, update e delete)
    let result = await prisma.$executeRawUnsafe(sql)

    //verifica se o insert funcionou no DB
    if (result) {
        return true
    } else{
        return false
    }
} catch (error) {
    return false
}
}

//atualizar um filme existente filtrando pelo ID
const updateFilme = async function (dadosFilme,id) {
    try {

        let sql
        if (dadosFilme.data_relancamento == null || 
            dadosFilme.data_relancamento == ""   || 
            dadosFilme.data_relancamento == undefined
            ){
    
            //Script sql para inserir novo filme
         sql = `update tbl_filme set 
            nome =  '${dadosFilme.nome}',
            sinopse = '${dadosFilme.sinopse}',
            data_lancamento = '${dadosFilme.data_lancamento}',
            data_relancamento = null,
            duracao = '${dadosFilme.duracao}',
            foto_capa = '${dadosFilme.foto_capa}',
            valor_unitario =  '${dadosFilme.valor_unitario}'
            where id = ${id}`
           
        } else {
            sql = `update tbl_filme set 
            nome = '${dadosFilme.nome}',
            sinopse = '${dadosFilme.sinopse}',
            data_lancamento = '${dadosFilme.data_lancamento}',
            data_relancamento = '${dadosFilme.data_relancamento}',
            duracao = '${dadosFilme.duracao}',
            foto_capa = '${dadosFilme.foto_capa}',
            valor_unitario =  '${dadosFilme.valor_unitario}'
            where id = ${id}`
           
        }

            let result = await prisma.$executeRawUnsafe(sql)
        
            if (result) {
                return true
            } else{
                return false
            }
        } catch (error) {
            return false
        }
        
        
}

//Deletar um filme existente filtrando pelo ID
const deleteFilme = async function (id) {
try {
    let sql = `delete from tbl_filme where id = ${id}`
    let rsFilme = await prisma.$executeRawUnsafe(sql)

    return rsFilme

} catch (error) {
    return false
}
}

//Listar todos os filmes existentes na tabela
const selectAllFilmes = async function () {

// $queryRawUnsafe(sql) ---> encaminha só a variavel
// $queryRaw(select * from tbl_filmes) ---> encaminha o script

    try {

    // Script sql para listar todos os registros
    let sql = 'select * from tbl_filme order by id desc'

    //executa o script no db e recebe o retorno dos dados na variael rsFilmes
    let rsFilmes = await prisma.$queryRawUnsafe(sql)
    return rsFilmes

    } catch (error) {
        return false
    }
}


//Buscar filme existente buscando pelo ID
const selectByIdFilme = async function (id) {
try {
    let sql = `select * from tbl_filme where id = ${id}`
    let rsFilme = await prisma.$queryRawUnsafe(sql)
    return rsFilme

} catch (error) {
    return false
}

   
}


const selectNameFilme = async function (filmeNome) {
    let nomeFilme = filmeNome

    try {

        let filmeSql = `select * from tbl_filme where nome like '%${nomeFilme}%' `
        let resultFilmes = await prisma.$queryRawUnsafe(filmeSql)
            return resultFilmes

    } catch (error) {

        return false
    } 
}

const returnId = async function (){

    try {

        let sql = 'select CAST(last_insert_id() AS DECIMAL) as id from tbl_filme limit 1'
        let rsId = await prisma.$queryRawUnsafe(sql)
        
        return rsId

    } catch (error) {
        
        return false
    }
  
}

module.exports = {
    insertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilmes,
    selectByIdFilme,
    selectNameFilme,
    returnId
}

const getListarClassificacoes = async function (){
    let classificacaoJSON = {}


    //Chama a função do DAO que retorna os filmes do BD
    let dadosClassificacao = await filmesDAO.selectAllClassificacao()


    //Validação para verificar se o DAO retornou dados
    if(dadosClassificacao){

        //cria o JSON
        classificacaoJSON.Classificacao = dadosClassificacao
        classificacaoJSON.quantidade = dadosClassificacao.length
        classificacaoJSON.status_code = 200

        return classificacaoJSON
    }else{
        return false
    }
}

const getBuscarClassificacaoID = async function (id){
     
    

    let idClassificacao = id

    //cria o objeto JSON
    let classificacaoJSON = {}


    //Validação para verificar se o id é válido (vazio, indefinido e não numerico)
    if(id == '' || idClassificacao == undefined || isNaN(idClassificacao)){
        return message.ERROR_INVALID_ID//400
    }else{
        
        //Encaminha para o DAO localizar o ID do filme
        let dadosClassificacao = await filmesDAO.selectClassificacaoByID(idClassificacao)
        console.log(dadosClassificacao)

        //Validação para verificar se existem dados de retorno
        if(dadosClassificacao){

            if(dadosClassificacao.length > 0){

            //cria o JSON de retorno
            classificacaoJSON.Classificacao = dadosClassificacao
            classificacaoJSON.status_code = 200

            return classificacaoJSON
            }else{
                return message.ERROR_NOT_FOUND
            }
        }else{
        return message.ERROR_INTERNAL_SERVER_DB//500
    }
    }


}

const setInserirNovaClassificacao = async function (dadosClassificacao, contentType){

    try {

        if (String(contentType).toLowerCase() == 'application/json') {

            let novaClassificacaoJSON = {}

            if (dadosClassificacao.faixa_etaria == ''       || dadosClassificacao.faixa_etaria == undefined     || dadosClassificacao.faixa_etaria == null      || dadosClassificacao.faixa_etaria.length > 5       ||
                dadosClassificacao.classificacao == ''      || dadosClassificacao.classificacao == undefined    || dadosClassificacao.classificacao == null     || dadosClassificacao.classificacao.length > 50     ||
                dadosClassificacao.caracteristica == ''     || dadosClassificacao.caracteristica == undefined   || dadosClassificacao.caracteristica == null    || dadosClassificacao.caracteristica.length > 1000  ||
                dadosClassificacao.icone == ''              || dadosClassificacao.icone == undefined            || dadosClassificacao.icone == null             || dadosClassificacao.icone.length > 200         
                ) {
                    
                return message.ERROR_REQUIRE_FIELDS //400

            } else {

                let validateStatus = true


                if (validateStatus) {

                    let novaClassificacao = await filmesDAO.inserirClassificacao(dadosClassificacao)

                    if (novaClassificacao) {

                        novaClassificacaoJSON.classificacao = dadosClassificacao
                        novaClassificacaoJSON.status = message.SUCCESS_CREATED_ITEM.status
                        novaClassificacaoJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                        novaClassificacaoJSON.message = message.SUCCESS_CREATED_ITEM.message

                        console.log(novaClassificacao);

                        return novaClassificacaoJSON //201
                        
                    
                    } else {
                        return message.ERROR_INTERNAL_SERVER_DB //500
                    }
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER //500 - Erro na controller
    }
}

const setAtualizarClassificacao = async function (id, dadoAtualizado, contentType){
    try {
        let idClassificacao = id

        if (String(contentType).toLowerCase() == 'application/json') {
            let dadosID = filmesDAO.selectClassificacaoByID()

            if (idClassificacao == '' || idClassificacao == undefined || idClassificacao == isNaN(idClassificacao) || idClassificacao == null) {

                return message.ERROR_INVALID_ID

            } else if (idClassificacao > dadosID.length) {

                return message.ERROR_NOT_FOUND

            } else {

                let atualizarClassificacaoJSON = {}

                if (dadoAtualizado.faixa_etaria == ''       || dadoAtualizado.faixa_etaria == undefined     || dadoAtualizado.faixa_etaria == null      || dadoAtualizado.faixa_etaria.length > 5       ||
                    dadoAtualizado.classificacao == ''      || dadoAtualizado.classificacao == undefined    || dadoAtualizado.classificacao == null     || dadoAtualizado.classificacao.length > 50     ||
                    dadoAtualizado.caracteristica == ''     || dadoAtualizado.caracteristica == undefined   || dadoAtualizado.caracteristica == null    || dadoAtualizado.caracteristica.length > 1000  ||
                    dadoAtualizado.icone == ''              || dadoAtualizado.icone == undefined            || dadoAtualizado.icone == null             || dadoAtualizado.icone.length > 200 
                ) { 
                    return message.ERROR_REQUIRE_FIELDS
                } else {

                    let validateStatus = true

                    if (validateStatus) {

                        let dadosClassificacao = await filmesDAO.updateClassificacao(idClassificacao, dadoAtualizado)
                        if (dadosClassificacao) {

                            atualizarClassificacaoJSON.genero = dadoAtualizado
                            atualizarClassificacaoJSON.status = message.SUCESS_UPDATE_ITEM.status//200
                            atualizarClassificacaoJSON.status_code = message.SUCESS_UPDATE_ITEM.status_code//200
                            atualizarClassificacaoJSON.message = message.SUCESS_UPDATE_ITEM.message//200             
                            return atualizarClassificacaoJSON 

                        } else {
                            return message.ERROR_INTERNAL_SERVER_DB //500
                        }
                    } else {
                        validateStatus = false
                    }

                }

            }
        } else {
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER //500 - erro na controller
    }
}


const setExcluirClassificacao = async function (id){
    let idClassificacao = id

    if(idClassificacao == '' || idClassificacao == undefined || isNaN(idClassificacao) || idClassificacao == null){
       return message.ERROR_INVALID_ID 
       
}else{
    let dadosClassificacao = await filmesDAO.selectClassificacaoByID(idClassificacao)
    let confirmarId = dadosClassificacao.length
   

    if (confirmarId > 0 ) {
        dadosClassificacao = await filmesDAO.deleteClassificacao(idClassificacao)

        return message.SUCCESS_DELETED_ITEM
    } else {
        return message.ERROR_NOT_FOUND
    }
}
}
    