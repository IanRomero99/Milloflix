<?php
session_start();

// Verificar si el usuario ha iniciado sesión como admin
if (!isset($_SESSION['admin'])) {
    // Redireccionar a la página de inicio de sesión si el usuario no ha iniciado sesión como admin
    header("Location: ../view/index.php");
    exit();
}

// Obtener el correo del usuario que ha iniciado sesión como admin
$correo_ini = $_SESSION['admin'];

// Incluye aquí la conexión a la base de datos
require_once("./conexion.php"); // Conexión a la base de datos

// Obtén el ID del rol utilizando el tipo de rol
$sql_get_pais = "SELECT nombre_pais FROM tbl_pais"; // Modificado para seleccionar id_ano_peli además de ano
$stmt_get_pais = $pdo->prepare($sql_get_pais);
$stmt_get_pais->execute();
$resultado = $stmt_get_pais->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($resultado); // Enviamos el resultado mediante JSON
?>
