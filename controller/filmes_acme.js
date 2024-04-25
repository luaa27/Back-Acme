var buscar_filmes = require ('../modulo/filmes')

const getFilmes = function(){

    return buscar_filmes.filmes
}

getFilmes()

const getIdFilmes = function(filmeId){
    let idFilme = filmeId
    dados = false


    buscar_filmes.filmes.filmes.forEach(function(filmes){

        if(filmes.id == idFilme){
             dados = filmes
        }
    })

return dados
  
}
getIdFilmes('3')

module.exports = {
    getFilmes,
    getIdFilmes
}