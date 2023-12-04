CREATE DATABASE negociae
CHARACTER SET utf8mb4
COLLATE utf8mb4_general_ci;
USE negociae;

CREATE TABLE leiloes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_empresa VARCHAR(255) NOT NULL,
    cnpj VARCHAR(20) NOT NULL,
    valor_divida DECIMAL(15, 2) NOT NULL,
    lance_minimo DECIMAL(15, 2) NOT NULL,
    descricao TEXT,
    data_aquisicao DATE NOT NULL,
    imagem_url VARCHAR(255) -- O caminho para a imagem, se estiver armazenando as imagens em disco
);

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cnpj VARCHAR(18) NOT NULL,
    email VARCHAR(255) NOT NULL,
    username VARCHAR(50) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    telefone VARCHAR(15) NOT NULL,
    tipo_usuario ENUM('comprador', 'vendedor') NOT NULL,
    UNIQUE (cnpj),
    UNIQUE (email),
    UNIQUE (username)
);

select*from usuarios

select *from leiloes


