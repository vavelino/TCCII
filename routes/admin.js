const express = require("express")
const router = express.Router()
//const Post = require('../models/Post')
//const banco = require('../models/db')
const usudb = require("../models/Usuaridb")


/*
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
})*/
router.get('/usuario/deletar/:id', function (req, res) {

    var sql = "DELETE FROM usuario WHERE id =" + req.params.id;
    usudb.connection.query(sql, function (err, posts, field) {
        if (err){
            req.flash("error_msg","Erro ao deletar o Usuário ")
        }else{
            req.flash("success_msg","Usuário deletado com sucesso")
        }
        res.redirect("/admin/usuario")
    })
})
router.get("/usuario", (req, res) => {
    usudb.connection.query("select * from usuario", function (err, posts, field) {
        if (err) throw err;
        res.render('admin/usuario', { posts: posts })
    })    
})
router.get("/usuario/add", (req, res) => {
    res.render("admin/addusuario")
})
router.post("/usuario/novo", (req, res) => {
    // (!req.body.nome) -> se não for enviado o nome
    var erros = []
    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        erros.push({ text: "Nome inválido" })// Coloca um novo dado no array
    }
    if (!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null) {
        erros.push({ text: "Slug inválido" })// Coloca um novo dado no array
    }
    if (req.body.nome.length < 2) {
        erros.push({ text: "Nome de usuário muito pequeno" })
    }
    if (erros.length > 0) {
        res.render("admin/addusuario", { erros: erros })
    } else {

        var a = "insert into usuario(nome,numero,dt)values('"
        var b = req.body.nome;
        var c = "','"
        var d = req.body.slug;
        var e = "',CURRENT_TIMESTAMP)"

        var sql = a + b + c + d + e;
        usudb.connection.query(sql, function (err, result) {
            if (err) {
                //res.send("Erro na Criação do Usuário");
                req.flash("error_msg","Erro ao cadastrar Usuário ")
               // res.redirect("/admin/usuario")
               res.redirect("/admin/usuario/add")
            }else{
            //res.send("Usuario Criado");
            req.flash("success_msg","Usuário cadastrado com sucesso")
            res.redirect("/admin/usuario")
            }
        })
    }
})

module.exports = router