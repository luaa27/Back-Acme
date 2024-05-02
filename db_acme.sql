create database db_acme_filmes_turma_ab;

use db_acme_filmes_turma_ab;

create table tbl_filme (
id int not null auto_increment primary key,
nome varchar(80) not null,
sinopse text not null,
duracao time not null,
data_lancamento date not null,
data_relancamento date,
foto_capa varchar(200) not null,
valor_unitario float,
unique index (id),
unique key (id),
classificacao_id int,
foreign key(classificacao_id) references classificacao(id_classificacao)
);
insert into tbl_filme (nome, 
sinopse, 
duracao,
data_lancamento, 
data_relancamento, 
foto_capa, 
valor_unitario) values (
"Legalmente loira",
"Elle Woods (Reese Whiterspoon) é uma garota que tem tudo que possa querer. Ela é a presidente da fraternidade de onde estuda, 
Miss Junho no calendário do campus e, além disso, uma loira natural. Elle ainda namora o mais bonito garoto de seu colégio, Warner Huntington III (Matthew Davis), 
com quem inclusive planeja se casar no futuro. Mas Elle tem um problema que incomoda Warner: ela é fútil demais! Até que, quando Warner vai estudar Direito na Universidade de Harvard, 
ele passa a namorar uma nova garota (Selma Blair) e decide largar Elle,
que não se dá por vencida e decide estudar a fim de também passar para o curso de Direito e ainda por cima provar sua inteligência.",
"01:36:00",
"2001-11-09",
null,
"https://br.web.img2.acsta.net/c_310_420/pictures/15/05/21/21/49/411666.jpg",
"50.00"
),

(
"A freira",
"Fazendo parte da franquia Invocação do Mal, em A Freira, após uma irmã cometer suicídio em um convento na Romênia,
 o Vaticano envia um padre atormentado e uma noviça para investigar o ocorrido. Arriscando suas vidas, a fé e até suas almas,
 os dois descobrem um segredo profano no local, confrontando-se com uma força do mal que toma a forma de uma freira demoníaca e transforma o convento num campo de batalha espiritual.",
 "01:37:00",
 "2018-09-06",
 null,
 "https://br.web.img3.acsta.net/c_310_420/pictures/18/07/18/21/53/1348208.jpg",
 "50.00"
);

create table genero(
id_genero int not null auto_increment primary key,
genero varchar(30) not null
);

insert into genero (genero) values(
"Ação"
),(
"Aventura"
),(
"Comédia"
),(
"Comédia romântica"
),(
"Documentário"
),(
"ficção"
),(
"Terror"
),(
"Fantasia"
),(
"Musical"
);

create table atores(
id_atores int not null auto_increment primary key,
nome_ator varchar(80) not null,
data_falecimento date,
pais varchar (80),
irmaos varchar(80),
data_nascimento date not null,
sexo_id int,
foto_ator varchar(200),
foreign key(sexo_id) references sexo(id_sexo)
);

insert into atores(
nome_ator,
data_falecimento,
pais,
irmaos,
data_nascimento,
foto_ator
) values (
"Anne Hathaway",
null,
"kate McCauley, Gerald Hathaway",
"Michael Hathaway, Thomas Hathaway",
"1982-11-12",
"https://www.datocms-assets.com/46743/1660315849-anne-hathaway.jpg?auto=format%2Ccompress&cs=srgb"
),
(
"Margot Robbie",
null,
"Sarie Kessler, Doug Robbie",
" Anya Robbie, Cameron Robbie, Lachlan Robbie",
"1990-07-02",
"https://media-manager.noticiasaominuto.com.br/1920/naom_64b028b329ae9.jpg"
);

create table classificacao (
id_classificacao int not null auto_increment primary key,
idade varchar(2) not null,
foto_classificacao varchar(200) not null,
descricao varchar(100) not null,
motivo varchar(200) not null
);

insert into classificacao(
idade,
foto_classificacao,
descricao,
motivo
) values (
"L", "https://blogdojotace.com.br/wp-content/uploads/2013/06/L.png", "Livre para todos os públicos", "História sem conteúdospotencialmente potencialmente prejudiciais para qualquer faixa etária"
),(
"10","https://blogdojotace.com.br/wp-content/uploads/2013/06/10.png", "Não recomendado para menores de 10 anos", "Histórias de conteúdo violento e linguagem imprópria de nível leve"
),(
"12", "https://logodownload.org/wp-content/uploads/2017/07/classificacao-12-anos-logo-1.png","Não recomendado para menores de 12 anos", "História com cenas de agressão física, insinuação de consumo de drogas e insinuação leve de sexo"
),(
"14", "https://blogdojotace.com.br/wp-content/uploads/2013/06/14.png","Não recomendado para menores de 14 anos", "História com agressão física média, consumo de drogas explicíto e insinuação de drogas acentuada"
),(
"16", "https://static.wikia.nocookie.net/redemundo/images/b/b8/DJCTQ_-_16.png/revision/latest/scale-to-width-down/250?cb=20190126201917&path-prefix=pt-br","Não recomendado para menores de 16 anos", "Histórias com o consumo de drogas explícito, agressão física acentuada e insinuação de sexo acentuada"
),(
"18", "https://static.wikia.nocookie.net/redemundo/images/3/31/DJCTQ_-_18.png/revision/latest/scale-to-width-down/250?cb=20190126201955&path-prefix=pt-br","Não recomendado para menores de 18 anos", "Histórias com consumo e indução ao consumo de drogas,violência extrema, suícidio, cenas de sexo explícitas e disturbios psicossomáticos"
);

create table usuario(
id_user int not null auto_increment primary key,
nome_user varchar(80) not null,
email varchar(90) not null,
data_nascimento date not null,
senha varchar(8) not null
);

insert into usuario(
nome_user,
email,
data_nascimento,
senha
)values (
"Luana ",
"Luana.Santos@gmail.com",
"2006-06-08",
"123"
);

create table nacionalidade(
id_nacionalidade int not null auto_increment primary key,
nome_local varchar(45) not null,
nacionalidade varchar(50) not null
);

insert into nacionalidade(
nome_local,
nacionalidade
) values (
"Brasil","Brasileiro"
),(
"Espanha","Espanhol"
);

create table sexo(
id_sexo int not null auto_increment primary key,
tipo_sexo varchar(10)
);

insert into sexo(
tipo_sexo
) values (
"Masculino"
),(
"Feminino"
);

create table diretores(
id_diretor int not null auto_increment primary key,
nome_diretor varchar(80) not null,
data_falecimento date,
pais varchar (80),
irmaos varchar(80),
data_nascimento date not null,
sexo_id int,
foreign key(sexo_id) references sexo(id_sexo)
);

insert into diretores(
nome_diretor,
data_falecimento,
pais,
irmaos,
data_nascimento
) values (
"Greta Gerwig",
null,
" Christine Gerwig, Gordon Gerwig",
null,
"1983-08-14"
),
(
"David Frankel",
null,
" Tobia Simone Frankel, Max Frankel",
"Jon Frankel, Margot Frankel",
"1959-04-02"
);

create table tbl_genero_filme(
id_genero_filme int not null auto_increment primary key,
genero_id int,
filme_id int,
foreign key(genero_id) references genero(id_genero),
foreign key(filme_id) references tbl_filme(id)
);

create table tbl_ator_filme(
id_ator_filme int not null auto_increment primary key,
ator_id int,
filme_id int,
foreign key(ator_id) references atores(id_atores),
foreign key(filme_id) references tbl_filme(id)
);

create table tbl_user_filme(
id_user_filme int not null auto_increment primary key,
usuario_id int,
filme_id int,
foreign key(usuario_id) references usuario(id_user),
foreign key(filme_id) references tbl_filme(id)
);

create table tbl_diretor_filme(
id_diretor_filme int not null auto_increment primary key,
diretor_id int,
filme_id int,
foreign key(diretor_id) references diretores(id_diretor),
foreign key(filme_id) references tbl_filme(id)
);

create table tbl_nacionalidade_ator(
id_nacionalidade_ator int not null auto_increment primary key,
nacionalidade_id int,
ator_id int,
foreign key(nacionalidade_id) references nacionalidade(id_nacionalidade),
foreign key(ator_id) references atores(id_atores)
);

create table tbl_nacionalidade_diretor(
id_nacionalidade_diretor int not null auto_increment primary key,
nacionalidade_id int,
diretor_id int,
foreign key(nacionalidade_id) references nacionalidade(id_nacionalidade),
foreign key(diretor_id) references diretores(id_diretor)
);

select * from genero;

select * from genero order by id_genero desc;

show tables;

select last_insert_id() from tbl_filme limit 1;

select * from tbl_filme where id = 10;

delete from tbl_filme where id = 10;

update tbl_filme set 
            nome =  "Luana",
            sinopse = "xjasxnxjxn sjnb s",
            data_lancamento = "2022-06-24",
            data_relancamento = null,
            duracao = "02:20:00",
            foto_capa = "https://br.web.img2.acsta.net/c_310_420/pictures/15/05/21/21/49/411666.jpg",
            valor_unitario =  "20.00"
            where id = 4



