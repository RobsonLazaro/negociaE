const express = require('express');
const mysql = require('mysql');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const connection = require('../database');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Local onde os arquivos serão salvos
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Rota para Cadastrar Leilão
router.post('/', upload.single('imagem_leilao'), (req, res) => {
    // Extrair dados do corpo da requisição e do arquivo
    const { nome_empresa, cnpj, valor_divida, lance_minimo, descricao } = req.body;
    const imagem_url = req.file ? `/uploads/${req.file.filename}` : ''; // URL da imagem

    // Extrair apenas a data da string ISO
    const data_aquisicao = req.body.data_aquisicao.split('T')[0];

    // Inserir dados no banco de dados
    const sql = 'INSERT INTO leiloes (nome_empresa, cnpj, valor_divida, lance_minimo, descricao, data_aquisicao, imagem_url) VALUES (?, ?, ?, ?, ?, ?, ?)';
    connection.query(sql, [nome_empresa, cnpj, valor_divida, lance_minimo, descricao, data_aquisicao, imagem_url], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Erro ao cadastrar leilão');
        } else {
            res.redirect('/index-tela-leilao');
        }
    });

});

// ...

// Rota para Buscar Leilões
// Rota existente para buscar todos os leilões
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM leiloes';
    connection.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Erro ao buscar leilões');
        } else {
            res.json(results);
        }
    });
});

// Nova rota para buscar um leilão específico pelo ID
router.get('/:id', (req, res) => {
    const leilaoId = req.params.id;
    const sql = 'SELECT * FROM leiloes WHERE id = ?';
    connection.query(sql, [leilaoId], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Erro ao buscar o leilão');
        } else {
            if (result.length > 0) {
                res.json(result[0]); // Enviar apenas o leilão correspondente ao ID
            } else {
                res.status(404).send('Leilão não encontrado');
            }
        }
    });
});


// Rota para Cadastrar Leilão
// ... (sua rota POST existente)

module.exports = router;

