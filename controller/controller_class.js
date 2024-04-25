const message = require('../modulo/config')
const classDAO = require('../model/DAO/classificacao')

const getListarClass = async function(){
let classJSON = {}

let dadosClass = await classDAO.selectAllClass()

if (dadosClass) {

    if (dadosClass.length) {
        classJSON.classificacao = dadosClass
        classJSON.quantidade = dadosClass.length
        classJSON.status_code = 200
        return classJSON
    } else {
        return message.ERROR_NOT_FOUND
    }
    
} else {
    return message.ERROR_INTERNAL_SERVER_DB
}
}

const setInserirNovaClass = async function( contentType,classificacao){
try {
 
    if (String(contentType).toLowerCase() == 'application/json') {
        let resultDadosClass = {}

        
        if (classificacao.idade == "" || classificacao.idade == undefined || classificacao.idade.length> 2||
        classificacao.foto_classificacao == "" || classificacao.foto_classificacao == undefined || classificacao.foto_classificacao.length> 200||
        classificacao.descricao == "" || classificacao.descricao == undefined || classificacao.descricao.length> 100||
        classificacao.motivo == "" || classificacao.motivo == undefined || classificacao.motivo.length> 200)
         {
            
            return message.ERROR_REQUIRED_FIELDS
        } else {
            
            let novaClass = await classDAO.inserirClass(classificacao)

            if (novaClass) {
                let returnId = await classDAO.returnId()

                resultDadosClass.status = message.SUCESS_CREATED_ITEM.status
                resultDadosClass.status_code = message.SUCESS_CREATED_ITEM.status_code
                resultDadosClass.message = message.SUCESS_CREATED_ITEM.message
                resultDadosClass.classificacao = classificacao
            

                resultDadosClass.classificacao.id = await returnId

                return resultDadosClass
            } else {
                return message.ERROR_INTERNAL_SERVER_DB
            }
        }
    } else {
        return message.ERROR_CONTENT_TYPE
    }
    
} catch (error) {
    return message.ERROR_INTERNAL_SERVER
}
}

const setExcluirClass = async function(id){
try {
    
    let idClass = id
    if (idClass == '' || idClass == undefined || isNaN(idClass)) {
        return message.ERROR_INVALID_ID
    } else {
        let validaId = await classDAO.selectByIdGenero(idClass)
        if (validaId == false) {
            return message.ERROR_NOT_FOUND
        } else {
            
            let dadosClass = await classDAO.deleteClass(idClass)

            if (dadosClass) {
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

const setAtualizarClass = async function(){

}

module.exports = {
    setAtualizarClass,
    setExcluirClass,
    setInserirNovaClass,
    getListarClass
}