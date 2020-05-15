const express = require("express")
const router = express.Router()
//const Post = require('../models/Post')
//const banco = require('../models/db')
const usudb = require("../models/Usuaridb")



router.get('/oi', (req, res) => {
    res.send("OI E AE?")
})
router.get('/boot', (req, res) => {
    res.render("admin/outro")
})

router.get('/cad', function (req, res) {
    res.render('formulario')
})
router.post('/add', function (req, res) {



    var sql = "insert into estados(nome,sigla)values ?";
    var values = [[req.body.titulo, req.body.conteudo]]

    usudb.connection.query(sql, [values], function (err, result) {
        if (err) res.send("Erro Criação postagem");
        res.send("Postagem criada com sucesso");
    })

})
router.get('/deletar/:id', function (req, res) {

    var sql = "DELETE FROM postagems WHERE id =" + req.params.id;
    usudb.connection.query(sql, function (err, posts, field) {
        if (err) res.send("Postagem não existe");
        res.send("Postagem deletada com sucesso");
    })
})

router.get("/usuario", (req, res) => {
    res.render("admin/usuario")
})
router.get("/usuario/add", (req, res) => {
    res.render("admin/addusuario")
})
router.post("/usuario/novo", (req, res) => {
    
})

module.exports = router