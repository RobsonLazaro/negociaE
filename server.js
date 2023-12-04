const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const leilaoRoutes = require('./routes/leilaoRoutes');
const userRoutes = require('./routes/userRoutes'); 
const app = express();
const port = 3000;

// Configuração da sessão
app.use(session({
    secret: 'seu_secreto',  // Substitua 'seu_secreto' por uma string secreta real
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Use `true` se estiver usando https
}));

// Demais middlewares e rotas
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use('/api/leiloes', leilaoRoutes);
app.use('/api/usuarios', userRoutes); 

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index-PáginaPrincipal.html'));
});

app.get('/index-perfil-credor', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index-perfil-credor.html'));
});

app.get('/index-perfil-venda', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index-perfil-venda.html'));
});


app.get('/index-tela-leilao', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index-tela-leilao.html'));
});




app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
