/* ************************************************************
Arquivo responsavel pelas configurações globais de mensagens, 
valores e conteúdos para o projeto
Data: 20/02/2024
Autor:Luana Santos
Versão:1.0
***************************************************************/

/**************************** Mensagens de erro ********************** */ 

const ERROR_INVALID_ID = {status: false, status_code:400, message:'O ID encaminhado na requisição não e válido!!!'}

const ERROR_NOT_FOUND  = {status: false, status_code:404, message:'Nenhum item encontrado na requisição!!!'}

const ERROR_INTERNAL_SERVER_DB  = {status: false, status_code:500, message:'Ocorreram erros internos no servidor de banco de dados, por favor contate do administrador do sistema!!!'}

const ERROR_INTERNAL_SERVER  = {status: false, status_code:500, message:'Ocorreram erros internos no servidor na camada de negocio da API, por favor contate do administrador do sistema!!!'}

const ERROR_REQUIRED_FIELDS = {status: false, status_code: 400, message: 'Existem dados obrigatórios que não foram preenchidos corretamente!!!'}

const ERROR_CONTENT_TYPE =  {status: false, status_code: 415, message: 'O content-type da requisição não é suportado.Precisa ser enviado dados no formato application/json !!!'}

/********************************** Mensegens de sucesso ******************************************/
const SUCESS_CREATED_ITEM = {status: true, status_code: 201, message: 'Item criado com sucesso no banco de dados !!!'}

const SUCESS_DELETED_ITEM = {status: true, status_code: 200, message: 'Item excluido com sucesso !!!'}

const SUCESS_EDITED_ITEM = {status: true, status_code:200, message: 'Item editado com sucesso'}



module.exports = {
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND,
    ERROR_INTERNAL_SERVER_DB,
    ERROR_REQUIRED_FIELDS,
    SUCESS_CREATED_ITEM,
    ERROR_CONTENT_TYPE,
    ERROR_INTERNAL_SERVER,
    SUCESS_DELETED_ITEM,
    SUCESS_EDITED_ITEM
}

