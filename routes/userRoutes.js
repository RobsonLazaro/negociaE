const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const connection = require('../database'); // Sua conexão com o banco de dados

// Rota para Cadastrar Usuário
router.post('/usuarios', async (req, res) => {
    const { cnpj, email, username, senha, telefone } = req.body;
    const tipo_usuario = req.body.tipoUsuario; // Asegure-se de que este nome corresponda ao do formulário

    // Verificar se tipo_usuario não é nulo ou vazio
    if (!tipo_usuario || tipo_usuario.trim() === "") {
        return res.status(400).send('Tipo de usuário é obrigatório.');
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const sql = 'INSERT INTO usuarios (cnpj, email, username, senha, telefone, tipo_usuario) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(sql, [cnpj, email, username, senhaHash, telefone, tipo_usuario], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Erro ao cadastrar usuário');
        } else {
            res.send('Usuário cadastrado com sucesso!');
        }
    });
});


// Rota para Autenticar Usuário
router.post('/login', (req, res) => {
    const { username, password, tipoUsuario } = req.body;

    // Consulta SQL para buscar o usuário pelo CNPJ e tipo de usuário
    const sql = 'SELECT * FROM usuarios WHERE cnpj = ? AND tipo_usuario = ?';
    connection.query(sql, [username, tipoUsuario], async (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro no servidor');
        }

        if (results.length === 0) {
            return res.status(401).send('Usuário não encontrado ou tipo de usuário incorreto');
        }

        const usuario = results[0];

        // Verificar se a senha está correta
        const senhaValida = await bcrypt.compare(password, usuario.senha);
        if (!senhaValida) {
            return res.status(401).send('Senha incorreta');
        }

        req.session.userId = usuario.id;

        // Se o login for bem-sucedido como "comprador", redirecione para a página desejada
        if (tipoUsuario === 'comprador') {
            return res.redirect('/index-perfil-credor');
        }
        if (tipoUsuario === 'vendedor') {
            return res.redirect('/index-perfil-venda');
        }

        return res.send(`Login bem-sucedido como ${tipoUsuario}`);
    });
});

router.get('/perfil', (req, res) => {
    // Verifica se o usuário está logado
    if (!req.session || !req.session.userId) {
        return res.status(401).send('Usuário não logado');
    }

    const userId = req.session.userId;

    // Consulta SQL para buscar o usuário pelo ID
    const sql = 'SELECT cnpj, email, username, telefone, tipo_usuario FROM usuarios WHERE id = ?';
    connection.query(sql, [userId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro no servidor');
        }

        if (results.length === 0) {
            return res.status(404).send('Usuário não encontrado');
        }

        const usuario = results[0];
        res.json(usuario);
    });
});



// ... suas outras rotas ...

module.exports = router;