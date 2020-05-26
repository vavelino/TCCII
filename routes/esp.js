const express = require("express")
const routeresp = express.Router()
const Pilha = require("../models/pilha")
const usudb = require("../models/Usuaridb")


// Variavéis
var tempo = 0;
var pilhaPedido = Pilha.pilha;
var pilhaEnvio = Pilha.pilha2;
var pilhaPedidoExterno = Pilha.pilha3;


routeresp.get("/servertoesp/:id", (req, res) => {
  // Pilha.pilha.Push("r\n908a75a3\n1")
  if (req.params.id == 'ESP_1') {
    if (pilhaPedidoExterno.GetCount() == 0) {
      tempo++
      // console.log("GET ID:" + req.params.id)
      if (pilhaPedido.GetCount() == 0) {
        res.send("N")
      } else {
        res.send(pilhaPedido.Pop())
      }
    } else {
      res.send(pilhaPedidoExterno.Pop())
    }
  } else {
    console.log("Desconhecido")
  }  
})


routeresp.post("/esptoserver", (req, res) => {
  console.log(req.body.a)
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
  if (umavez != tempo) {
    tempo = 0
    pilhaPedido.Push("L"); // v 
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
      case 't':
        agora();
        break;
      case 'L'://    L/LOG/0.TXTa9ff582c$N$10
        if (mensgrecebida[1] != '$') {
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
          if (autentificação == 'N') {
            autentificação = 'Não autorizado'
          }
          if (autentificação == 'A') {
            autentificação = 'Autorizado'
          }
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
        } else {
          console.log("Sem LOG")
          agora();
        }
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

function agora() {
  var ag=Math.floor(Date.now() / 1000)-3*3600 // Brasil -3   
  var envio = "t\nt\n"+ag;
  pilhaPedido.Push(envio);
}
// Função para adicionar zero nos minutos e segundos
function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
// ROTA LOG
routeresp.get("/log", (req, res) => {
  sql = " select	u.nome as nome,    l.id as id,    l.numero as numero,    l.aute as aute,    l.tempo as tempo,    l.dt as dt     from usuario u    right OUTER JOIN  log l	on u.numero = l.numero ORDER BY id ASC"

  //usudb.connection.query("select * from log", function (err, posts, field) {

  usudb.connection.query(sql, function (err, posts, field) {
    //console.log(posts.length)
    for (a = 0; a < posts.length; a++) {
      if (posts[a].nome == null) {
        posts[a].nome = 'Desconhecido'
        //console.log(posts[a].dt)
      }
      // Horário servidor
      var dataInput = posts[a].dt
      data = new Date(dataInput);
      var dataFormatada = ("0" + data.getDate()).substr(-2) + "/"
        + ("0" + (data.getMonth() + 1)).substr(-2) + "/" + data.getFullYear() + " " + addZero(data.getHours()) + ":" + addZero(data.getMinutes()) + ":" + addZero(data.getSeconds());
      posts[a].dt = dataFormatada;
      // Horário Esp
      //console.log(posts[a].tempo)
      //var dataInput = posts[a].tempo
      data = new Date(posts[a].tempo * 1000);
      console.log(data)

      var dataFormatada = ("0" + data.getDate()).substr(-2) + "/"
        + ("0" + (data.getMonth() + 1)).substr(-2) + "/" + data.getFullYear() + " " + addZero(data.getHours()) + ":" + addZero(data.getMinutes()) + ":" + addZero(data.getSeconds());
      posts[a].tempo = dataFormatada;

    }
    //posts.nome

    // console.log(posts)
    if (err) throw err;
    res.render('log/logesp', { posts: posts })
    //res.render('log/logesp', { posts: posts })
  })

})
// Exports
module.exports = routeresp
module.exports.adicionarnaPilha = (informação) => {
  pilhaPedidoExterno.Push(informação);
}
