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
    let sql = 'select * from tbl_filme'
console.log(sql);
    //executa o script no db e recebe o retorno dos dados na variael rsFilmes
    let rsFilmes = await prisma.$queryRawUnsafe(sql)
    console.log(rsFilmes);
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

const ApagarGeneroFilme = async function(id){
    try {

        let sql = `delete from tbl_genero_filme where genero_id = ${id}`
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
    returnId,
    ApagarGeneroFilme
}
