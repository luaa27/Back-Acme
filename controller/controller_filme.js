/****************************************************************
 * Objetivo: Arquivo responsável pela interação entre o app     
 * e a model, que teremos todas as tratativas e regra de negócio
 *              para o CRUD de filmes                           
 * Data: 31/01/2024                                             
 * Autor: Luana Santos                                           
 * Versão: 1.0                                                  
 ****************************************************************/
const message = require('../modulo/config')

const filmesDAO = require('../model/DAO/filme')
const classificacaoDAO = require('../model/DAO/classificacao.js')
const generoDAO = require('../model/DAO/genero.js')
const { filmes } = require('../modulo/filmes')


//Função para inserir um novo filme no banco de dados
const setInserirNovoFilme = async function (dadosFilme, contentType) {

    try {

        if (String(contentType).toLowerCase() == 'application/json') {

            let resultDadosFilme = {}


            //validação para verificar campos obrigatórios e consistencia de dados
            if (dadosFilme.nome == "" || dadosFilme.nome == undefined || dadosFilme.nome.length > 80 ||
                dadosFilme.sinopse == "" || dadosFilme.sinopse == undefined || dadosFilme.sinopse.length > 65000 ||
                dadosFilme.duracao == "" || dadosFilme.duracao == undefined || dadosFilme.duracao.length > 8 ||
                dadosFilme.data_lancamento == "" || dadosFilme.data_lancamento == undefined || dadosFilme.data_lancamento.length > 10 ||
                dadosFilme.foto_capa == "" || dadosFilme.foto_capa == undefined || dadosFilme.foto_capa.length > 200 ||
                dadosFilme.valor_unitario.length > 8
            ) {

                return message.ERROR_REQUIRED_FIELDS //400 campos obrigatórios/incorretos

            } else {

                let dadosValidated = false

                if (dadosFilme.data_relancamento != null &&
                    dadosFilme.data_relancamento != undefined &&
                    dadosFilme.data_relancamento != ""
                ) {
                    if (dadosFilme.data_relancamento.length != 10) {

                        return message.ERROR_REQUIRED_FIELDS
                    } else {
                        dadosValidated = true //se a data tiver exatamente 10 caracteres
                    }
                } else {
                    dadosValidated = true // se a data não existir nos dados
                }

                if (dadosValidated) {

                    //encaminha os dados para o DAO inserir no banco de dados
                    let novoFilme = await filmesDAO.insertFilme(dadosFilme)

                    //validação para verificar se os dados foram inseridos pelo DAO no DB
                    if (novoFilme) {
                        let returnId = await filmesDAO.returnId()
                        //Cria o padrão de json para retorno dos dados criados no banco de dados
                        resultDadosFilme.status = message.SUCESS_CREATED_ITEM.status
                        resultDadosFilme.status_code = message.SUCESS_CREATED_ITEM.status_code
                        resultDadosFilme.message = message.SUCESS_CREATED_ITEM.message
                        resultDadosFilme.filme = dadosFilme

                        resultDadosFilme.filme.id = await returnId

                        return resultDadosFilme //201

                    } else {
                        return message.ERROR_INTERNAL_SERVER_DB //500 Erro na camada do DAO
                    }
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }

}



//Função para atualizar um filme existente
const setAtualizarFilme = async function (id, contentType, dadosFilme) {

    try {

        if (String(contentType).toLowerCase() == 'application/json') {

            let resultDadosFilme = {}
            let idFilme = id

            if (idFilme == '' || idFilme == undefined || isNaN(idFilme)) {

                return message.ERROR_INVALID_ID
            } else {
                let validaId = await filmesDAO.selectByIdFilme(idFilme)

                if (validaId == false) {

                    return message.ERROR_NOT_FOUND //404

                } else {

                    if (dadosFilme.nome == "" || dadosFilme.nome == undefined || dadosFilme.nome.length > 80 ||
                        dadosFilme.sinopse == "" || dadosFilme.sinopse == undefined || dadosFilme.sinopse.length > 65000 ||
                        dadosFilme.duracao == "" || dadosFilme.duracao == undefined || dadosFilme.duracao.length > 8 ||
                        dadosFilme.data_lancamento == "" || dadosFilme.data_lancamento == undefined || dadosFilme.data_lancamento.length > 10 ||
                        dadosFilme.foto_capa == "" || dadosFilme.foto_capa == undefined || dadosFilme.foto_capa.length > 200 ||
                        dadosFilme.valor_unitario.length > 8
                    ) {

                        return message.ERROR_REQUIRED_FIELDS //400 campos obrigatórios/incorretos

                    } else {

                        let dadosValidated = false

                        if (dadosFilme.data_relancamento != null &&
                            dadosFilme.data_relancamento != undefined &&
                            dadosFilme.data_relancamento != ""
                        ) {
                            if (dadosFilme.data_relancamento.length != 10) {
                                return message.ERROR_REQUIRED_FIELDS

                            } else {
                                dadosValidated = true
                            }
                        } else {
                            dadosValidated = true
                        }

                        if (dadosValidated) {
                            let novoFilme = await filmesDAO.updateFilme(dadosFilme, idFilme)

                            //validação para verificar se os dados foram inseridos pelo DAO no DB
                            if (novoFilme) {
                               
                                resultDadosFilme.status = message.SUCESS_EDITED_ITEM.status
                                resultDadosFilme.status_code = message.SUCESS_EDITED_ITEM.status_code
                                resultDadosFilme.message = message.SUCESS_EDITED_ITEM.message
                                resultDadosFilme.filme = dadosFilme
                                return resultDadosFilme //201

                            } else {
                                return message.ERROR_INTERNAL_SERVER_DB //500 Erro na camada do DAO
                            }
                        } else {
                            return message.ERROR_CONTENT_TYPE //415
                        }
                    }

                }
            }

        }else{
            return message.ERROR_CONTENT_TYPE
        }
    }catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}




//Função para excluir um filme existente
const setExcluirFilme = async function (id) {
    try {
        let idFilme = id
        console.log(idFilme);

        if (idFilme == '' || idFilme == undefined || isNaN(idFilme)) {
            return message.ERROR_INVALID_ID
        } else {

            let validaId = await filmesDAO.selectByIdFilme(idFilme)
         

            if (validaId == false) {

                return message.ERROR_NOT_FOUND //404

            } else{
                let apagarFilmeGenero = await filmesDAO.deleteFilmeGenero(id)
                console.log('abbbbbbbbbbbbbbbbbbbbaaaaaa');
                let dadosFilme = await filmesDAO.deleteFilme(idFilme)
                if (dadosFilme) {
                    console.log(dadosFilme);

                    return message.SUCESS_DELETED_ITEM
                } else {
                    console.log(dadosFilme);

                    return message.ERROR_INTERNAL_SERVER_DB
                }

            }

        }

    } catch (error) {
        console.log(error);
        return message.ERROR_INTERNAL_SERVER

    }

}


//Função para retormar todos os filmes do Banco de Dados
const getListarfilmes = async function () {
    let filmesJSON = {}

    // Chama a função do DAO para buscar dados no db
    let dadosFilmes = await filmesDAO.selectAllFilmes()

    // verifica se existem dados retornados do DAO
    if (dadosFilmes) {
        console.log(dadosFilmes)
        let id_filme=dadosFilmes.id

        if (dadosFilmes.length > 0) {
            let generoFilme = await generoDAO.generoFilme(id_filme)
            filmesJSON.filmes = dadosFilmes
            filmesJSON.quantidade = dadosFilmes.length
            filmesJSON.filmes.genero = generoFilme
            filmesJSON.status_code = 200
            // for(let filmes of dadosFilmes){
            //     // let classificacaoFilme = await classificacaoDAO.selectByIdClassificacao(filmes.id_classificacao)
            //     let generoFilme = await generoDAO.generoFilme(dadosFilmes.id)
            //     console.log(id)
            //     delete filmes.id_classificacao
            //     // filmes.classificacao = classificacaoFilme
            //     filmes.genero = generoFilme
            // }


            // filmesJSON.filmes = dadosFilmes
            // filmesJSON.quantidade = dadosFilmes.length
            // filmesJSON.status_code = 200

            //Retorna o json montado
            return filmesJSON //200
        } else {
            return message.ERROR_NOT_FOUND //404
        }

    } else {
        return message.ERROR_INTERNAL_SERVER_DB //500
    }
}


//Função para buscar um filme pelo ID
const getBuscarFilme = async function (id) {

    //Recebe o id do filme
    let idFilme = id
    let filmeJson = {}

    if (idFilme == '' || idFilme == undefined || isNaN(idFilme)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosFilme = await filmesDAO.selectByIdFilme(idFilme)

        if(dadosFilme){

            let filmeClassificacao = await classificacaoDAO.classificacaoFilmes(id)
            for(filme of dadosFilme){
                let diretor = await filmesDAO.filmeDiretor(id)
                filme.diretor = diretor
            }

            if(filmeClassificacao){

                if (dadosFilme.length) {

                    filmeJson.filme = dadosFilme
                    filmeJson.status_code = 200
    
                    return filmeJson //200
    
                } else {
                    return message.ERROR_NOT_FOUND //404
                }
            }
            return message.ERROR_INTERNAL_SERVER_DB //500

        }
        console.log(dadosFilme)

        
        // for(let filmes of dadosFilme){
        //     let dadosClassificacao = await classificacaoDAO.selectByIdClassificacao(filmes.classificacao_id)
        //     delete filmes.classificacao_id
        //     filmes.classificacao = dadosClassificacao
        // }

        // if (dadosFilme) {
        //     if (dadosFilme.length) {
        //         filmeJson.filme = dadosFilme
        //         filmeJson.status_code = 200

        //         return filmeJson //200

        //     } else {
        //         return message.ERROR_NOT_FOUND //404
        //     }

        // } else {
        //     return message.ERROR_INTERNAL_SERVER_DB //500
        // }
    }


}

const getNomeFilme = async function (filmeNome) {
    let nomeFilme = filmeNome
    let nomeFilmeJson = {}

    let infoFilmes = await filmesDAO.selectNameFilme(nomeFilme)

    if (nomeFilme == '' || nomeFilme == undefined) {
        return message.ERROR_INVALID_ID
    } else {
        if (infoFilmes) {

            if (infoFilmes.length) {
                nomeFilmeJson.filmes = infoFilmes
                nomeFilmeJson.quantidade = infoFilmes.length
                nomeFilmeJson.status_code = 200

                return nomeFilmeJson //200
            } else {

                return message.ERROR_NOT_FOUND //404
            }

        } else {
            return message.ERROR_INTERNAL_SERVER_DB //500
        }
    }
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
    
module.exports = {
    setAtualizarFilme,
    setExcluirFilme,
    setInserirNovoFilme,
    getBuscarFilme,
    getListarfilmes,
    getNomeFilme,
    setExcluirClassificacao,
    setAtualizarClassificacao,
    setInserirNovaClassificacao,
    getBuscarClassificacaoID
}