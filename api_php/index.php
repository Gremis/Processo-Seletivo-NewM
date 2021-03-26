<?php

include './bd/bd.php';

// recebemos solicitações de qualquer url

header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD'] == 'GET') {

    // Usamos o metodo Get e armazenamos o resultado na variável $result
    // O resultado retorna ao cliente a través do echo json_encode como um array associativo
    if (isset($_GET['id'])) {
        $query = "select * from clientes where id=" . $_GET['id'];
        $result = methodGet($query);
        echo json_encode($result->fetch(PDO::FETCH_ASSOC));
    } else {              //Consulta de todos os registros
        $query = "select * from clientes";
        $result = methodGet($query);
        echo json_encode($result->fetchAll());
    }
    header("HTTP/1.1 200 OK");
    exit();
}

// Enviamos um parámetro adicional por post em cada uma das petições

if ($_POST['METHOD'] == 'POST') {
    // Apagamos o parametro adicional
    unset($_POST['METHOD']);
    // Capturamos cada um dos parámetros que nos envia por post, colocamos os mesmos nomes dos das bases de dados 
    $nome = $_POST['nome'];
    $nascimento = $_POST['nascimento'];
    $cpf = $_POST['cpf'];
    $celular = $_POST['celular'];
    $email = $_POST['email'];
    $endereco = $_POST['endereco'];
    $observacao = $_POST['observacao'];

    // armamos o query
    $query = "insert into clientes(nome, nascimento, cpf, celular, email, endereco, observacao) values ('$nome', '$nascimento', '$cpf', '$celular', '$email', '$endereco', '$observacao')";
    $queryAutoIncrement = "select MAX(id) as id from clientes";
    $result = methodPost($query, $queryAutoIncrement); //Neste resultado armazenamos o que nos retorna o metodo Post do db.php
    echo json_encode($result); //Retornamos ao cliente o resultado obtido
    header("HTTP/1.1 200 OK");
    exit();
}


//Petição put

if ($_POST['METHOD'] == 'PUT') {
    $id = $_GET['id'];
    $nome = $_POST['nome'];
    $nascimento = $_POST['nascimento'];
    $cpf = $_POST['cpf'];
    $celular = $_POST['celular'];
    $email = $_POST['email'];
    $endereco = $_POST['endereco'];
    $observacao = $_POST['observacao'];

    $query = "UPDATE clientes SET nome='$nome', nascimento='$nascimento', cpf='$cpf', celular='$celular', email='$email', endereco='$endereco', observacao='$observacao' WHERE id='$id'";
    $result = methodPut($query);
    echo json_encode($result);
    header("HTTP/1.1 200 OK");
    exit();
}


//Delete

if ($_POST['METHOD'] == 'DELETE') {
    unset($_POST['METHOD']);
    $id = $_GET['id'];
    
    $query = "DELETE FROM clientes WHERE id='$id'";
    $result = methodDelete($query);
    echo json_encode($result);
    header("HTTP/1.1 200 OK");
    exit();
}

header("HTTP/1.1 400 Bad Request");