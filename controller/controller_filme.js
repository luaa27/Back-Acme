/****************************************************************
 * Objetivo: Arquivo responsável pela interação entre o app     *
 * e a model, que teremos todas as tratativas e regra de negócio*
 *              para o CRUD de filmes                           *
 * Data: 31/01/2024                                             *
 * Autor: Ana Luiza                                             *
 * Versão: 1.0                                                  *
 ****************************************************************/
const message = require('../modulo/config')

const filmesDAO = require('../model/DAO/filme')
const classificacaoDAO = require('../model/DAO/classificacao.js')
const generoDAO = require('../model/DAO/genero.js')


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

        if (idFilme == '' || idFilme == undefined || isNaN(idFilme)) {
            return message.ERROR_INVALID_ID
        } else {

            let validaId = await filmesDAO.selectByIdFilme(idFilme)

            if (validaId == false) {

                return message.ERROR_NOT_FOUND //404

            } else {
                let dadosFilme = await filmesDAO.deleteFilme(idFilme)

                if (dadosFilme) {
                    return message.SUCESS_DELETED_ITEM
                } else {
                    return message.ERROR_INTERNAL_SERVER_DB
                }

            }

        }

    } catch (error) {

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

        if (dadosFilme) {
            if (dadosFilme.length) {
                filmeJson.filme = dadosFilme
                filmeJson.status_code = 200

                return filmeJson //200

            } else {
                return message.ERROR_NOT_FOUND //404
            }

        } else {
            return message.ERROR_INTERNAL_SERVER_DB //500
        }
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

module.exports = {
    setAtualizarFilme,
    setExcluirFilme,
    setInserirNovoFilme,
    getBuscarFilme,
    getListarfilmes,
    getNomeFilme
}