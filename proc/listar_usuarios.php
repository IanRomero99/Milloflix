<?php
// Inicializamos la sesión
session_start();

// Obtenemos el usuario que ha iniciado sesión
$correo_ini = $_SESSION['correo_ini'];

require_once("./conexion.php"); // Conexión a la base de datos

$sql_nombre = "SELECT nombre_user
FROM tbl_user
WHERE correo_user = :correo_ini";
$stmt_nombre = $pdo->prepare($sql_nombre);
$stmt_nombre->bindParam(':correo_ini', $correo_ini);
$stmt_nombre->execute();
$nombre_usuario = $stmt_nombre->fetchColumn();

// Verificamos si el campo de búsqueda no está vacío
if (!empty($_POST["busqueda"])) {
    // Guardamos el valor en una variable
    $data = $_POST["busqueda"];

    // Consulta para obtener el usuario que se busca
    $consulta = $pdo->prepare("SELECT u.id_user, u.nombre_user, correo_user, pwd_user, u.id_rol, r.nombre_rol; 
    FROM tbl_user u
    JOIN tbl_rol r ON u.id_rol = r.id_rol
    WHERE u.nombre_user != :nombre AND (u.nombre_user LIKE'%".$data."%')");
    $consulta->bindParam(":nombre", $nombre_usuario);
    $consulta->execute();
} else {
    // Si está vacío, aparecerán todos los usuarios menos el que ha iniciado sesión
    $consulta = $pdo->prepare("SELECT u.id_user, u.nombre_user, correo_user, pwd_user, u.id_rol, r.nombre_rol
    FROM tbl_user u
    JOIN tbl_rol r ON u.id_rol = r.id_rol
    WHERE u.nombre_user != :nombre");
    $consulta->bindParam(":nombre", $nombre_usuario);
    $consulta->execute();
}

$resultado = $consulta->fetchAll(PDO::FETCH_ASSOC); // Obtenemos los resultados

echo json_encode($resultado); // Enviamos el resultado mediante JSON
?>
