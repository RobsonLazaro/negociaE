const mysql = require('mysql');

// Configuração da conexão com o banco de dados
const connection = mysql.createConnection({
    host: 'localhost',     // ou o endereço do seu servidor MySQL
    user: 'root',   // substitua com o seu usuário MySQL
    password: '', 
    database: 'negociae' // substitua pelo nome do seu banco de dados
});

// Conectando ao banco de dados
connection.connect(err => {
    if (err) {
        console.error('Erro ao conectar no banco de dados: ' + err.stack);
        return;
    }
    console.log('Conectado ao banco de dados com sucesso!');
});
module.exports = connection;
