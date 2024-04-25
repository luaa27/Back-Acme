const { PrismaClient } = require('@prisma/client')


const prisma = new PrismaClient()

const selectAllClass = async function(){
try {
    let sql = 'select * from classificacao order by id_classificacao desc'

    let rsClass = await prisma.$queryRawUnsafe(sql)
    return rsClass
} catch (error) {
    return false
}
}

const inserirClass = async function(classificacao){
try {
    
    let sql = `insert into classificacao(
        idade,
        foto_classificacao,
        descricao,
        motivo
    ) values(
        '${classificacao.idade}',
        '${classificacao.foto_classificacao}',
        '${classificacao.descricao}',
        '${classificacao.motivo}'
    )`

    let result = await prisma.$executeRawUnsafe(sql)
    if (result) {
        return true
    } else {
        return false
    }
} catch (error) {
    return false
}
}

const deleteClass = async function(id){
try {
    let sql = `delete from classificacao where id_classificacao = ${id}`
    let rsClass = await prisma.$executeRawUnsafe(sql)

    return rsClass
} catch (error) {
    return false
}
}

const atualizarClass = async function(){

}

const returnId = async function (){

    try {

        let sql = 'select CAST(last_insert_id() AS DECIMAL) as id from classificacao limit 1'
        let rsId = await prisma.$queryRawUnsafe(sql)
        
        return rsId

    } catch (error) {
        
        return false
    }
  
}

const selectByIdClassificacao = async function (id) {
    try {
        let sql = `select * from classificacao where id_classificacao = ${id}`
    
        let rsFilme = await prisma.$queryRawUnsafe(sql)
        return rsFilme
    
    } catch (error) {
        return false
    }
    
       
    }

module.exports={
    selectAllClass,
    inserirClass,
    deleteClass,
    atualizarClass,
    returnId,
    selectByIdClassificacao
}