const express = require("express")

const routeresp = express.Router()
const Pilha = require("../models/pilha")

/* Rota para mandar comandos para o ESP
*res.send("a\n908a75a3\n2")
* Comando \n Parâmetro 1 \n Parâmetro 2
* Comando:
* 1 -) Cadastro e Descadastro de Usuários:
* Comando: a(Cadastro) b(Descadastro)  
* Parâmetro 1: ID
* Parâmetro 2: Pasta que será Modificada
* 2-) 
*/

routeresp.get("/servertoesp/:id", (req, res) => {
 // Pilha.pilha.Push("v\n908a75a3\n1")
  if (req.params.id == 'ESP_1') {
    console.log("GET ID:" + req.params.id)
    if (Pilha.pilha.GetCount() == 0) {
      res.send("N")
    }else{
     res.send(Pilha.pilha.Pop())  
    }
  } else {
    console.log("Desconhecido")
  }
 // console.log(Pilha.pilha.GetCount())
  //usudb.connection.query("select * from usuario", function (err, posts, field) {
  // if (err) throw err;
  // res.json({ nome: 'tobi', valor:'123'})//, valor:5,time:2})
  // res.send("G\n908a75a3\n49000")   
  // res.send("G\n1000\n49000")    
  // res.send("v\n908a75a3\n1")

  //res.send("T\n1000\n49000")
  //res.sendStatus(status)

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
*Para recebimento de log
 Tipo /N LOG  /TAG     /Resultado/Horário
   L/LOG/0.TXTa9ff582c$N$10
 L   $ID$Autorizado ou não(a ou n)$ Hora
*Consulta usuário:
E  $ existe ou não(T e F) $ ID perguntado
*/

routeresp.post("/esptoserver", (req, res) => {
  console.log(req.body.a)
  //res.send(200) //ok
  res.sendStatus(200) //OK
  // console.log(req.body.b)
  // console.log(req.body.c)
  // console.log(req.body.d)
  //  console.log(req.body.e)   
})


module.exports = routeresp
