const express = require("express")

const routeresp = express.Router()

/* Rota para mandar comandos para o ESP
*res.send("a\n908a75a3\n2")
* Comando \n Parâmetro 1 \n Parâmetro 2
* Comando:
* 1 -) Cadastro e Descadastro de Usuários:
* Comando: a(Cadastro) b(Descadastro)  
* Parâmetro 1: ID
* Parâmetro 2: Pasta que será Modificada
*
*/
routeresp.get("/test", (req, res) => {
    //usudb.connection.query("select * from usuario", function (err, posts, field) {
       // if (err) throw err;
       // res.json({ nome: 'tobi', valor:'123'})//, valor:5,time:2})
       res.send("v\n908a75a3\nAEEE")


        //render('admin/usuario', { posts: posts })
   // })    
})
/*Rota para receber 
*a => Tipo
*b => 1 Parâmetro
*c => 2 Parâmetro
*d => 3 Parâmetro
*e => 4 Parâmetro
*/
/*
* Para recebimento de log
* Tipo /N ESP  /TAG     /Resultado/Horário
* LOG /1 a 100/aaaaaaaa/(a ou n)  / Hora
*/

routeresp.post("/esptoserver",(req,res)=>{   
   console.log(req.body.a)
   console.log(req.body.b)
   console.log(req.body.c)
   console.log(req.body.d)
   console.log(req.body.e)   
})


module.exports = routeresp
