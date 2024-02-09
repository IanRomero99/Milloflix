<?php
// Hacemos un session_start
session_start();

// Verificar si el campo 'correo_ini' y el 'pwd_ini' está presente en $_POST
if (isset($_POST['correo_ini']) && isset($_POST['pwd_ini'])) {
    // Recogemos los datos que ha introducido el usuario
    $correo_ini = $_POST['correo_ini'];
    $pwd_ini = $_POST['pwd_ini']; // Recogemos la contraseña del formulario
    $pwdEncriptada = hash("sha256", $pwd_ini);

    // Incluir el archivo de conexión a la base de datos
    include_once("./conexion.php");

    // Verificar si el usuario y la contraseña coinciden en la base de datos
    $sql_check = "SELECT correo_user, pwd_user, id_rol, id_estado FROM tbl_user WHERE correo_user = :correo_ini";
    $stmt_check = $pdo->prepare($sql_check);
    $stmt_check->bindParam(':correo_ini', $correo_ini, PDO::PARAM_STR);
    $stmt_check->execute();
    // Obtener el resultado
    $resultado_check = $stmt_check->fetch(PDO::FETCH_ASSOC);

    if(!$resultado_check) {
        // El usuario no existe
        echo json_encode(["error" => "Noexiste"]);
    } else {
        // Verificar si la contraseña ingresada coincide con la almacenada en la base de datos
        if (hash_equals($pwdEncriptada, $resultado_check['pwd_user'])) {
            $rol = $resultado_check['id_rol'];
            $estado = $resultado_check['id_estado'];
            
            if($rol == '2') {
                if($estado == '1') {
                    echo json_encode(["error" => "pendiente"]);
                } else if($estado == '2') {
                    $_SESSION['cliente'] = $correo_ini;
                    echo json_encode(["success" => true, "role" => "cliente"]);
                } else if($estado == '3') {
                    echo json_encode(["error" => "inactivo"]);
                }
            } else if ($rol == '1') {
                $_SESSION['admin'] = $correo_ini;
                echo json_encode(["success" => true, "role" => "admin"]);
            }
        } else {
            // La contraseña no coincide
            echo json_encode(["error" => "Passwordincorrect"]);
        }
    }
} else {
    // Redireccionar si no se reciben los datos esperados
    echo json_encode(["error" => "Missing fields"]);
}
?>
