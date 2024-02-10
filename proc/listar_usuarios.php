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

$sql_nombre = "SELECT nombre_user FROM tbl_user WHERE correo_user = :correo_ini";
$stmt_nombre = $pdo->prepare($sql_nombre);
$stmt_nombre->bindParam(':correo_ini', $correo_ini);
$stmt_nombre->execute();
$nombre_usuario = $stmt_nombre->fetchColumn();

// Verificar si el campo de búsqueda no está vacío
if (!empty($_POST["busqueda"])) {
    // Guardamos el valor en una variable
    $data = $_POST["busqueda"];

    // Consulta para obtener el usuario que se busca
    $consulta = $pdo->prepare("SELECT u.id_user, u.nombre_user, u.correo_user, u.pwd_user,  r.nombre_rol,  e.nombre_estado
                               FROM tbl_user u
                               JOIN tbl_rol r ON u.id_rol = r.id_rol
                               JOIN tbl_estado e ON u.id_estado = e.id_estado
                               WHERE u.correo_user != :correo_ini AND u.correo_user LIKE :data");
    $consulta->bindParam(":correo_ini", $correo_ini);
    $data = "%" . $data . "%"; // Agregar comodines a la búsqueda
    $consulta->bindParam(":data", $data);
    $consulta->execute();
} else {
    // Si está vacío, aparecerán todos los usuarios menos el que ha iniciado sesión
    $consulta = $pdo->prepare("SELECT u.id_user, u.nombre_user, u.correo_user, u.pwd_user, r.nombre_rol, e.nombre_estado
                               FROM tbl_user u
                               JOIN tbl_rol r ON u.id_rol = r.id_rol
                               JOIN tbl_estado e ON u.id_estado = e.id_estado
                               WHERE u.correo_user != :correo_ini");
    $consulta->bindParam(":correo_ini", $correo_ini);
    $consulta->execute();
}

$resultado = $consulta->fetchAll(PDO::FETCH_ASSOC); // Obtenemos los resultados

echo json_encode($resultado); // Enviamos el resultado mediante JSON
?>
