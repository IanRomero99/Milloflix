<?php
// Inicializamos la sesión
session_start();

require_once("./conexion.php"); // Conexión a la base de datos

if (isset($_POST["id_user"]) && $_POST["id_user"]) {
    // Guardamos el valor en una variable
    $id_user = $_POST["id_user"];

    // Cambiar el estado del usuario de pendiente (ID 1) a activo (ID 2)
    $sql_cambiar = "UPDATE tbl_user SET id_estado = 2 WHERE id_user = :id_user"; // Cambiar 2 al ID correspondiente de "activo"
    $consulta_cambiar = $pdo->prepare($sql_cambiar);
    $consulta_cambiar->bindParam(":id_user", $id_user);
    $consulta_cambiar->execute();

    // Verificar si se cambió el estado con éxito
    if ($consulta_cambiar->rowCount() > 0) {
        echo "ok"; // Respondemos con 'ok' en lugar de un mensaje de texto
    } else {
        echo "No se pudo cambiar el estado del usuario.";
    }
} else {
    echo "ID de usuario no proporcionado.";
}
