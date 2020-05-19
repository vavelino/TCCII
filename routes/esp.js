const express = require("express")

const routeresp = express.Router()



routeresp.get("/test", (req, res) => {
    //usudb.connection.query("select * from usuario", function (err, posts, field) {
       // if (err) throw err;
       // res.json({ nome: 'tobi', valor:'123'})//, valor:5,time:2})
       res.send("a\n908a75a3\n1")

        //render('admin/usuario', { posts: posts })
   // })    
})


module.exports = routeresp