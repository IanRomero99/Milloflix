<?php
// Creamos la variable de errores que está vacía
$errores = "";

// Recogemos los datos que ha introducido el usuario
$correo_ini = $_POST['correo_ini'];
$pwd_ini = $_POST['pwd_ini'];

// Creamos una variable que pasará la contraseña sha256 lo que hará que se encripte
$pwdEncriptada = hash("sha256", $pwd_ini);

// Si hay errores
if ($errores != "") {
    $datosRecibidos = array(
        'correo_ini' => $correo_ini,
        'pwd_ini' => $pwd_ini
    );
    $datosDevueltos = http_build_query($datosRecibidos);
    header("Location: ../view/index.php" . $errores . "&" . $datosDevueltos);
    exit();
}

// Aquí puedes realizar validaciones y manejo de errores si es necesario

include_once("./conexion.php");
$sql_check = "SELECT COUNT(*) FROM tbl_user WHERE correo_user = :correo_ini";
$stmt_check = $pdo->prepare($sql_check);
$stmt_check->bindParam(':correo_ini', $correo_ini);
$stmt_check->execute();
$user_count = $stmt_check->fetchColumn();
$stmt_check->closeCursor();

if ($user_count > 0) {
    // El usuario ya existe, agrega un mensaje de error a la variable $errores
    if ($errores) {
        $errores .= '&correoExist=true';
    } else {
        $errores = '?correoExist=true';
    }

    // Si hay errores
    if ($errores != "") {
        $datosRecibidos = array(
            'correo_ini' => $correo_ini,
            'pwd_ini' => $pwd_ini
        );
        $datosDevueltos = http_build_query($datosRecibidos);
        header("Location: ../view/registrar.php" . $errores . "&" . $datosDevueltos);
        exit();
    }
} else {
    // El usuario no existe, procede con la inserción
    $sql = "INSERT INTO tbl_user (`id_user`, `nombre_user`, `pwd_user`, `correo_user`) VALUES (NULL, '', :pwdEncriptada, :correo_ini)";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':pwdEncriptada', $pwdEncriptada);
    $stmt->bindParam(':correo_ini', $correo_ini);
    $stmt->execute();

    // Verifica si la inserción fue exitosa
    if ($stmt->rowCount() > 0) {
        echo "Usuario registrado exitosamente";
        header('Location: ./sessiones.php');
        exit();
    } else {
        // Agrega un mensaje de error en caso de fallo en la inserción
        if ($errores) {
            $errores .= '&insertError=true';
        } else {
            $errores = '?insertError=true';
        }
        header('Location: ../view/registrar.php' . $errores);
        exit();
    }
}
?>
