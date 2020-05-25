const express = require("express")

const routeresp = express.Router()
const Pilha = require("../models/pilha")
const usudb = require("../models/Usuaridb")

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
// Variavéis
var tempo = 0;
var pilhaPedido = Pilha.pilha;
var pilhaEnvio = Pilha.pilha2;
// Função com a função de adicionar na pilha de pedidos



routeresp.get("/servertoesp/:id", (req, res) => {
  // Pilha.pilha.Push("v\n908a75a3\n1")
  if (req.params.id == 'ESP_1') {
    tempo++
    console.log("GET ID:" + req.params.id)
    if (pilhaPedido.GetCount() == 0) {
      res.send("N")
    } else {
      res.send(pilhaPedido.Pop())
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
  //console.log(req.body.a)
  pilhaEnvio.Push(req.body.a);
  //res.send(200) //ok
  res.sendStatus(200) //OK
  // console.log(req.body.b)
  // console.log(req.body.c)
  // console.log(req.body.d)
  //  console.log(req.body.e)   
})
// Responsável por controlar os pedidos
var umavez;
var myInt = setInterval(function () {
  if (tempo == 4) {
    tempo = 0
  }
  if (umavez != tempo) {
    switch (tempo) {
      case 0:
        pilhaPedido.Push("v"); // verifica se está vivo
        break;
      case 1:
        pilhaPedido.Push("L"); // verifica se está vivo
        break;
      case 2:
        pilhaPedido.Push("C\n1000\n1");
        break;
      case 3:
       // pilhaPedido.Push("a\n1000\n1");
        break;
      case 4:
        break;
      case 5:
        break;
    }
    console.log("tempo=" + tempo);
    umavez = tempo;
  }

}, 1000);

//Tratamento dos dados recebidos
var myInt2 = setInterval(function () {
  var mensgrecebida
  var log = ""
  var ID = ""
  var autentificação = ""
  var data = ""
  var informação = 0

  if (pilhaEnvio.GetCount() != 0) {
    mensgrecebida = pilhaEnvio.Pop();
    //console.log(mensgrecebida)
    switch (mensgrecebida[0]) {
      case 'v':
        console.log("ta vivo")
        break;
      case 'L'://    L/LOG/0.TXTa9ff582c$N$10

        for (var a = 6; a < mensgrecebida.length; a++) {
          var b = (mensgrecebida[a] == '.') || (mensgrecebida[a] == 'T') || (mensgrecebida[a] == '$')
          if (b) {
            informação++
          } else {
            switch (informação) {
              case 0:
                log += mensgrecebida[a];
                pilhaPedido.Push("R\n" + log);
                break;
              case 3:
                ID += mensgrecebida[a];
                break;
              case 4:
                autentificação += mensgrecebida[a];
                break;
              case 5:
                data += mensgrecebida[a];
                break;
            }
          }
        }
        console.log('/log= ' + log + '/ID= ' + ID + '/aute= ' + autentificação + '/data= ' + data)
        var a = "insert into log(numero,aute,tempo,dt)values('"
        var b = ID;
        var c = "','"
        var d = autentificação
        var e = "','"
        var f = data;
        var g = "',CURRENT_TIMESTAMP)"
        var sql = a + b + c + d + e + f + g;
        usudb.connection.query(sql, function (err, result) {
          if (err) {
            console.log("Erro ao gravar LOG")
          } else {
            console.log("LOG gravado com sucesso")
          }
        })
        break;
      case 'E':
        autentificação = mensgrecebida[2];
        for (var a = 4; a < mensgrecebida.length; a++) {
          ID += mensgrecebida[a];
        }
        console.log('/ID= ' + ID + '/aute= ' + autentificação)
        break;
    }

  }


}, 1000);

routeresp.get("/log", (req, res) => {
  usudb.connection.query("select * from log", function (err, posts, field) {
    // console.log(posts)
    if (err) throw err;
    res.render('log/logesp', { posts: posts })
  })
})




//module.exports = routeresp

module.exports=routeresp
module.exports.adicionarnaPilha=(informação)=>{
  pilhaPedido.Push(informação);

}
/*
module.exports = {
  //routeresp: routeresp,
  //adicionarnaPilha:adicionarnaPilha
}*/
/*
function adicionarnaPilha(informação) {
  pilhaPedido.Push(informação);
}*/
