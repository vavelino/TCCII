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

connection.query("CREATE TABLE IF NOT EXISTS usuario (id INT UNSIGNED NOT NULL AUTO_INCREMENT,nome VARCHAR(255) NOT NULL,numero VARCHAR(10) NOT NULL,dt datetime NOT NULL,PRIMARY KEY (id))",
    function (err, result) {
        if (!err) {
            console.log('Tabela usuario Criada com sucesso!');
        } else {
            console.log('Erro na Criação da Tabela usuario');
        }
    });

connection.query("CREATE TABLE IF NOT EXISTS log (id INT UNSIGNED NOT NULL AUTO_INCREMENT,numero VARCHAR(10) NOT NULL,tempo VARCHAR(100) NOT NULL, dt datetime NOT NULL, PRIMARY KEY (id))",
    function (err, result) {
        if (!err) {
            console.log('Tabela LOG Criado com sucesso!');
        } else {
            console.log('Erro na Criação da Tabela LOG');
        }
    });

module.exports = {
    connection: connection
}

