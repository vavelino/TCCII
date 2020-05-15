/* Usando sequelize
app.get('/', function (req, res) {    
    Post.findAll({ order: [['id', 'DESC']] }).then(function (posts) { 
        res.render('home', { posts: posts })
    })
})
{{#each posts}}
<h1>{{dataValues.titulo}}</h1>
<p>{{dataValues.conteudo}}</p>
<h6>{{dataValues.createdAt}}</h6>
<a href="/admin/deletar/{{dataValues.id}}"><button>Deletar</button></a>
<hr>
{{/each}}*/



//insert into estados (nome, sigla, regiao, populacao)
//values ('Mais Novo', 'MN', 'Norte', 2.51);
/*
router.post('/add', function (req, res) {
    var sql = "insert into postagems (titulo,createdAt,updateAt) values ('aee',131311,13131)";
    usudb.connection.query(sql, function (err, posts, field) {
        if (err) res.send("Postagem não existe");
        res.send("Postagem deletada com sucesso");
    })
})*/

/*router.post('/add', function (req, res) {
    Post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    }).then(function () {
        //res.send("Post criado com sucesso")
        res.redirect('/')
    }).catch(function (erro) {
        res.send("Houve um erro: " + erro)
    })

    // res.send('titulo: '+req.body.titulo+"<br>conteudo: "+req.body.conteudo)
})*/
//delete from estados
//where sigla = 'MN';
//router.get('/deletar/:id', function (req, res) {

/* Post.destroy({ where: { 'id': req.params.id } })// 'nome':'vitor'
     .then(function () {
         res.send("Postagem deletada com sucesso")
     }).catch(function (erro) {
         res.send("Postagem não existe")
     })*/
//})


/*
// Rotas
router.get('/', function (req, res) {
    // Post.findAll().then(function(posts){ // mostra todos os dados
    Post.findAll({ order: [['id', 'DESC']] }).then(function (posts) { //decrescente
        res.render('home', { posts: posts })
    })
})*/






