<?php
// Inicializamos la sesión
session_start();

// Verificar si el usuario ha iniciado sesión como admin
if (!isset($_SESSION['admin'])) {
    // Redireccionar a la página de inicio de sesión si el usuario no ha iniciado sesión como admin
    header("Location: ../view/index.php");
    exit();
}

require_once("./conexion.php"); // Conexión a la base de datos

if (isset($_POST["id_peli"]) && $_POST["id_peli"]) {
    // Guardamos el valor en una variable
    $id_peli = $_POST["id_peli"];

    // Eliminar la película
    $consulta_eliminar_pelis = $pdo->prepare("DELETE FROM tbl_peliculas WHERE id_peli = :id_peli");
    $consulta_eliminar_pelis->bindParam(":id_peli", $id_peli);
    $consulta_eliminar_pelis->execute();

    // Verificar si se eliminó con éxito
    if ($consulta_eliminar_pelis->rowCount() > 0) {
        echo "ok"; // Respondemos con 'ok' en lugar de un mensaje de texto
    } else {
        echo "No se pudo eliminar la película.";
    }
} else {
    echo "ID de película no proporcionado.";
}
?>
