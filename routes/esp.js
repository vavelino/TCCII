const express = require("express")

const routeresp = express.Router()



routeresp.get("/test", (req, res) => {
    //usudb.connection.query("select * from usuario", function (err, posts, field) {
       // if (err) throw err;
       // res.json({ nome: 'tobi', valor:'123'})//, valor:5,time:2})
       res.send("a\n908a75a3\n2")


        //render('admin/usuario', { posts: posts })
   // })    
})


module.exports = routeresp
/*
*res.send("a\n908a75a3\n2")
* Comando \n Parâmetro 1 \n Parâmetro 2
* Comando:
* 1 -) Cadastro e Descadastro de Usuários:
* Comando: a(Cadastro) b(Descadastro)  
* Parâmetro 1: ID
* Parâmetro 2: Pasta que será Modificada
*
*/