const express = require("express");
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require("body-parser")
//const banco = require('./models/db')
//const Post = require('./models/Post')
const admin = require('./routes/admin')
const path = require("path")
const usudb = require("./models/Usuaridb")



// Config 
// Template Engine
// usar o handlebars como template engine
// Tem que existir a pasta views obrigatóriamente com esse nome
app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
// Configuração Body Parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//app.use(express.static(path.join(__dirname, "public")))
app.use(express.static(path.join(__dirname, 'public'))); // bootstrap
//app.use(express.static('public'));
//Rotas

app.get('/', function (req, res) {
    usudb.connection.query("select * from postagems", function (err, posts, field) {
        if (err) throw err;      
       res.render('home', { posts:posts})
    })
})

app.use('/admin', admin)

// tem que ser a ultima
app.listen(8080, function () {
    console.log("Servidor Rodando") // Função call back
});