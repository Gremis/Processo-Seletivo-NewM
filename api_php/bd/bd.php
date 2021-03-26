<?php
$pdo = null; //Começamos declarando uma variável global
$host = 'localhost';
$user = 'root';
$password = '';
$bd = 'newm';

// Conexão da base de dados

function connect(){
    try{
        $GLOBALS['pdo']=new PDO("mysql:host=".$GLOBALS['host'].";dbname=".$GLOBALS['bd']."", $GLOBALS['user'], $GLOBALS['password']);
        $GLOBALS['pdo']->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }catch (PDOException $e){
        // print "Error!: No se pudo conectar a la bd ".$bd."<br/>";
        print "\nError!: ".$e."<br/>";
        die();
    }
}

function disconnect() {
    $GLOBALS['pdo']=null;
}

//Metodo GET

function methodGet($query){
    try{
        // Primeiro conectar á base de dados
        connect();
        // Preparar a consulta
        $statement=$GLOBALS['pdo']->prepare($query);
        // transformamos o resultado do query em um array associativo
        $statement->setFetchMode(PDO::FETCH_ASSOC);
        // Executamos o query
        $statement->execute();
        disconnect();
        return $statement; //Desconectamos e retornamos o resultado da consulta

    }catch(Exception $e){
        die("Error: ".$e);
    }
}

//Metodo Post
// Este método deve retornar o registro (numero A.I.) que acabou de ser inserido

function methodPost($query, $queryAutoIncrement){
    try{
        // Primeiro conectar á base de dados
        connect();
        // Preparar a consulta
        $statement=$GLOBALS['pdo']->prepare($query);
        // Executamos o query
        $statement->execute();
        // Depois de executar colocamos o id do A.I.
        $idAutoIncrement=methodGet($queryAutoIncrement)->fetch(PDO::FETCH_ASSOC);
        // Convertimos o A.I. em um array associativo e unimos os dois arrays
        $result=array_merge($idAutoIncrement, $_POST);
        $statement->closeCursor();
        disconnect();
        return $result; //Desconectamos e retornamos o resultado da consulta

    }catch(Exception $e){
        die("Error: ".$e);
    }
}

// Metodo Put
// Similar ao metodo Post mas não fazemos uma consulta

function methodPut($query){
    try{
        connect();
        $statement=$GLOBALS['pdo']->prepare($query);
        $statement->execute();
        // Unimos os metodos e retornamos o resultado
        $result=array_merge($_GET, $_POST);
        $statement->closeCursor();
        disconnect();
        return $result; 

    }catch(Exception $e){
        die("Error: ".$e);
    }
}

// Metodo delete
// Ele retorna únicamente o ID

function methodDelete($query){
    try{
        connect();
        $statement=$GLOBALS['pdo']->prepare($query);
        $statement->execute();
        $statement->closeCursor();
        disconnect();
        return $_GET['id']; 

    }catch(Exception $e){
        die("Error: ".$e);
    }
}