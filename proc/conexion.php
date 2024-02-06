<?php

//indicamos nombre servidor  
$servidor = "mysql:dbname=bd_milloflix;host=localhost";  
//usuario
$user = "root";
//password
$pass = "";
//inciamos bloque try catch
try {
    //crea el objeto pdo que es el que establece conexión con la bd
    $pdo = new PDO($servidor, $user, $pass, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
} catch (PDOException $e) {
    echo "Error en la conexión con la base de datos: " . $e->getMessage();
    die();
}


?>