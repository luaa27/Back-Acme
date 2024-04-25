const message = require('../modulo/config')
const generosDAO = require('../model/DAO/genero')

const setInserirNovoGenero = async function (genero, contentType){
try {
    
    if(String(contentType).toLowerCase() == 'application/json'){
        let resultGeneros = {}

        if(genero.genero == "" || genero.genero == undefined || genero.genero.length > 30 ){
            return message.ERROR_REQUIRED_FIELDS //400
        } else{

            let novoGenero = await generosDAO.inserirGenero(genero)

            if(novoGenero) {
                let returnId = await generosDAO.returnId()

                resultGeneros.status = message.SUCESS_CREATED_ITEM.status
                resultGeneros.status_code = message.SUCESS_CREATED_ITEM.status_code
                resultGeneros.message = message.SUCESS_CREATED_ITEM.message
                resultGeneros.genero = genero

                resultGeneros.genero.id = await returnId

                return resultGeneros //201
            } else{
                return message.ERROR_INTERNAL_SERVER_DB //500
            }
        }
    }

} catch (error) {
    return message.ERROR_INTERNAL_SERVER
}

}

const setExcluirGenero = async function(id){
try {

    let idGeneno = id

    if (idGeneno == '' || idGeneno == undefined || isNaN(idGeneno)) {
        return message.ERROR_INVALID_ID
    } else {
        let validaId = await generosDAO.selectByIdGenero(idGeneno)
        if (validaId == false) {
            return message.ERROR_NOT_FOUND //404
        } else {
            
            let dadosGenero = await generosDAO.deleteGenero(idGeneno)

            if (dadosGenero) {
                
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

const getListarGeneros = async function(){
let generoJSON = {}

let dadosGenero = await generosDAO.selectAllGenero()

if (dadosGenero){
    if (dadosGenero.length) {
        generoJSON.genero = dadosGenero
        generoJSON.quantidade = dadosGenero.length
        generoJSON.status_code = 200

        return generoJSON//200

    } else {
        return message.ERROR_NOT_FOUND //404
    }
} else{
    return message.ERROR_INTERNAL_SERVER_DB //500
}
}

const setAtualizarGenero = async function(id, contentType, dadosGenero){
try {
console.log(id)
console.log(contentType)
console.log(dadosGenero)
if (String(contentType).toLowerCase() == 'application/json') {
    
    let resultDadosGenero = {}
    let id_genero = id

    if (id_genero == '' || id_genero == undefined || isNaN(id_genero)) {
        
        return message.ERROR_INVALID_ID
    } else {

        let validaId = await generosDAO.selectByIdGenero(id_genero)

        if (validaId == false) {
            
            return message.ERROR_NOT_FOUND
        } else {

            if (dadosGenero.genero == "" || dadosGenero.genero == undefined || dadosGenero.genero.length >30 ) {
                
                return message.ERROR_REQUIRED_FIELDS
            } else {

             let novoGenero = await generosDAO.atualizarGenero(dadosGenero, id_genero)

             if (novoGenero) {
                
                resultDadosGenero.status = message.SUCESS_EDITED_ITEM.status
                resultDadosGenero.status_code = message.SUCESS_EDITED_ITEM.status_code
                resultDadosGenero.message = message.SUCESS_EDITED_ITEM.message
                resultDadosGenero.genero = dadosGenero
                console.log(resultDadosGenero)
                return resultDadosGenero
             } else {
                return message.ERROR_INTERNAL_SERVER_DB
            
             }
                
            }
            
        }
        
    }
} else{
    return message.ERROR_CONTENT_TYPE
}

} catch (error) {
    return message.ERROR_INTERNAL_SERVER
}
}
const getBuscarGenero = async function (id) {
    let idGenero = id
    let generoJSON = {}

    if (idGenero == '' || idGenero == undefined || isNaN(idGenero)) {
        return message.ERROR_INVALID_ID//400
    }
    else {
        let dadosGenero = await filmesDAO.selectByIdGenero(id)
        if (dadosGenero) {
            if (dadosGenero.length > 0) {
                generoJSON.Genero = dadosGenero
                generoJSON.status_code = 200
                return generoJSON
            } else {
                return message.ERROR_NOT_FOUND//404
            }
        }
        else {
            return message.ERROR_INTERNAL_SERVER_DB//500
        }
    }
}

const getListarGenerosPorId = async function(id){

    let filmeId = id
    let generosJSON = {}

    let generosFilme = await generosDAO.selectGeneroById(filmeId)

    if(generosFilme){
        generosJSON.genero = generosFilme
        generosJSON.quantidade = generosFilme.length

        return generosJSON
    } else {
        return false
    }
}
module.exports = {
    getListarGenerosPorId,
    setAtualizarGenero,
    setExcluirGenero,
    setInserirNovoGenero,
    getListarGeneros,
    getBuscarGenero
}