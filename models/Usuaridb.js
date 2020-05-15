const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'controle'
});

connection.connect(function (err) {
    if (err) console.error('Erro ao realizar a conexão com BD: ' + err.stack); return;
    console.log("Banco conectado")
});
/*
connection.query( "CREATE TABLE IF NOT EXISTS usuarios(id INT UNSIGNED NOT NULL AUTO_INCREMENT,nome VARCHAR(255) NOT NULL,estado_id int unsigned NOT NULL,area DECIMAL(10,2),PRIMARY KEY (id),FOREIGN KEY (estado_id) REFERENCES estados (id))", function (err, result) {
    if (!err) {
        console.log('Usuario cadastrado com sucesso!');
    } else {
        console.log('Erro ao cadastra o usuario!');
    }
});
*/
module.exports = {
    connection: connection
}

