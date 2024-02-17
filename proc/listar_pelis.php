<?php
// Inicializamos la sesión
session_start();

// Verificar si el usuario ha iniciado sesión como admin
if (!isset($_SESSION['admin'])) {
    // Redireccionar a la página de inicio de sesión si el usuario no ha iniciado sesión como admin
    header("Location: ../view/index.php");
    exit();
}

// Obtener el correo del usuario que ha iniciado sesión como admin
$correo_ini = $_SESSION['admin'];

require_once("./conexion.php"); // Conexión a la base de datos

// Verificar si el campo de búsqueda no está vacío
if (!empty($_POST["busqueda"])) {
    // Guardamos el valor en una variable
    $data = $_POST["busqueda"];

    // Consulta para obtener las películas que se buscan
    $consulta = $pdo->prepare("SELECT p.id_peli, p.desc_peli, p.caratula_peli, p.trailer_peli, a.ano, pa.nombre_pais, g.nombre_gen
                               FROM tbl_peliculas p
                               JOIN tbl_ano a ON p.id_ano_peli = a.id_ano_peli
                               JOIN tbl_pais pa ON p.id_pais = pa.id_pais
                               JOIN tbl_genero g ON p.id_gen = g.id_gen
                               WHERE p.desc_peli LIKE :data AND p.id_peli != :correo_ini");
    $consulta->bindParam(":data", $data);
    $consulta->bindParam(":correo_ini", $correo_ini);
    $consulta->execute();
} else {
    // Si está vacío, aparecerán todas las películas
    $consulta = $pdo->prepare("SELECT p.id_peli, p.desc_peli, p.caratula_peli, p.trailer_peli, a.ano, pa.nombre_pais, g.nombre_gen
                               FROM tbl_peliculas p
                               JOIN tbl_ano a ON p.id_ano_peli = a.id_ano_peli
                               JOIN tbl_pais pa ON p.id_pais = pa.id_pais
                               JOIN tbl_genero g ON p.id_gen = g.id_gen");
    $consulta->execute();
}

$resultado = $consulta->fetchAll(PDO::FETCH_ASSOC); // Obtenemos los resultados

echo json_encode($resultado); // Enviamos el resultado mediante JSON
?>
