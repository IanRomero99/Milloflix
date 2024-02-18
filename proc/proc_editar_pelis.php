<?php
// Inicializamos la sesión
session_start();

// Verificar si el usuario ha iniciado sesión como admin
if (!isset($_SESSION['admin'])) {
    // Redireccionar a la página de inicio de sesión si el usuario no ha iniciado sesión como admin
    header("Location: ../view/index.php");
    exit();
}

// Incluye aquí la conexión a la base de datos
require_once("./conexion.php"); // Conexión a la base de datos

// Obtener los datos del formulario
$id_peli = $_POST["id_peli"];
$desc_peli = $_POST["desc_editar"];
$id_ano_peli = $_POST["ano_editar"];
$id_pais = $_POST["pais_editar"];
$id_gen = $_POST["gen_editar"];

// Verificar si la película ya existe en la base de datos
$sql_check = "SELECT * FROM tbl_peliculas WHERE id_peli = :id_peli";
$stmt_check = $pdo->prepare($sql_check);
$stmt_check->bindParam(':id_peli', $id_peli);
$stmt_check->execute();
$peli = $stmt_check->fetch(PDO::FETCH_ASSOC);

if ($peli) {
    // La película existe, procedemos con la actualización
    $sql_update = "UPDATE tbl_peliculas SET desc_peli = :desc_peli, id_ano_peli = :id_ano_peli, id_pais = :id_pais, id_gen = :id_gen WHERE id_peli = :id_peli";
    $stmt_update = $pdo->prepare($sql_update);
    $stmt_update->bindParam(':id_peli', $id_peli);
    $stmt_update->bindParam(':desc_peli', $desc_peli);
    $stmt_update->bindParam(':id_ano_peli', $id_ano_peli);
    $stmt_update->bindParam(':id_pais', $id_pais);
    $stmt_update->bindParam(':id_gen', $id_gen);
    $stmt_update->execute();

    // Verifica si la actualización fue exitosa
    if ($stmt_update->rowCount() > 0) {
        echo "ok";
    } else {
        echo "Error al actualizar la película.";
    }
} else {
    echo "La película no existe.";
}
?>
