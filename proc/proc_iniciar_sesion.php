<?php
// Creamos la variable de errores que está vacía 
$errores = array();

// Hacemos un session_start
session_start();

// Verificar si el campo 'correo_ini' está presente en $_POST
if (isset($_POST['correo_ini']) && isset($_POST['pwd_ini'])) {
    // Recogemos los datos que ha introducido el usuario
    $correo_ini = $_POST['correo_ini'];
    $pwd_ini = $_POST['pwd_ini']; // Recogemos la contraseña del formulario
    $pwdEncriptada = hash("sha256", $pwd_ini);

    // Incluir el archivo de conexión a la base de datos
    include_once("./conexion.php");

    // Verificar si el usuario y la contraseña coinciden en la base de datos
    $sql_check = "SELECT correo_user, pwd_user FROM tbl_user WHERE correo_user = :correo_ini";
    $stmt_check = $pdo->prepare($sql_check);
    $stmt_check->bindParam(':correo_ini', $correo_ini, PDO::PARAM_STR);
    $stmt_check->execute();

    // Obtener el resultado
    $resultado_check = $stmt_check->fetch(PDO::FETCH_ASSOC);

    // Verificamos si se encontró algún resultado
    if (!$resultado_check) {
        // El usuario no existe, agregar un mensaje de error a la variable $errores
        $errores['nombreNotExist'] = true;
    } else {
        // El usuario existe, ahora verificamos la contraseña almacenada en la base de datos
        $stored_password = $resultado_check['pwd_user'];

        // Verificar si la contraseña ingresada coincide con la almacenada en la base de datos
        if (hash_equals($pwdEncriptada, $stored_password)) {
            // Contraseña coincide, redirigir a sessiones.php que la cogerá por la url
            $_SESSION['correo_ini'] = $correo_ini; // Almacenar el correo en la sesión
            
            // Consulta para obtener el rol del usuario
            $sql_rol = "SELECT r.nombre_rol
                        FROM tbl_user u
                        JOIN tbl_rol r ON u.id_rol = r.id_rol
                        WHERE u.correo_user = :correo_ini";
            $stmt_rol = $pdo->prepare($sql_rol);
            $stmt_rol->bindParam(':correo_ini', $correo_ini, PDO::PARAM_STR);
            $stmt_rol->execute();
            
            // Obtener el resultado
            $resultado_rol = $stmt_rol->fetch(PDO::FETCH_ASSOC);

            if ($resultado_rol['nombre_rol'] == 'Admin') {
                echo '<script>
                        Swal.fire({
                            title: "Aceptado",
                            text: "Has entrado a la página principal del Administrador",
                            icon: "success"
                        });
                        window.location.href = "../view/admin.php";
                      </script>';
                exit();
            } else {
                echo '<script>
                        Swal.fire({
                            title: "Aceptado",
                            text: "Has entrado a la página principal del Cliente",
                            icon: "success"
                        });
                        window.location.href = "./index.php";
                      </script>';
                echo "ok";
                exit();
            }
        } else {
            // La contraseña no coincide, agregar un mensaje de error a la variable $errores
            $errores['passwdIncorrect'] = true;
        }
    }
}

// Convertir los errores a JSON y enviarlos como respuesta
// header('Content-Type: application/json');
// echo json_encode($errores);
exit();
?>
