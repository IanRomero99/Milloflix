<?php
// Creamos la variable de errores que está vacía
$errores = "";

// Recogemos los datos que ha introducido el usuario
$username = $_POST['username'];
$correo_reg = $_POST['correo_reg'];
$pwd_reg = $_POST['pwd_reg'];

// Creamos una variable que pasará la contraseña sha256 lo que hará que se encripte
$pwdEncriptada = hash("sha256", $pwd_reg);

// Si hay errores
if ($errores != "") {
    $datosRecibidos = array(
        'username' => $username,
        'correo_reg' => $correo_reg,
        'pwd_reg' => $pwd_reg
    );
    $datosDevueltos = http_build_query($datosRecibidos);
    header("Location: ../view/index.php" . $errores . "&" . $datosDevueltos);
    exit();
}

// Si las variables no están vacías pasarán por el if, haciendo un include para la conexión y seguidamente después hacemos el insert
// Verifica si hay errores antes de continuar
if ($errores) {
    header('Location: ../view/registrar.php' . $errores);
    exit(); // Asegura que la ejecución se detenga después de la redirección
}

// Aquí puedes realizar validaciones y manejo de errores si es necesario

include_once("./conexion.php");
$sql_check = "SELECT COUNT(*) FROM tbl_user WHERE nombre_user = :username";
$stmt_check = $pdo->prepare($sql_check);
$stmt_check->bindParam(':username', $username);
$stmt_check->execute();
$user_count = $stmt_check->fetchColumn();
$stmt_check->closeCursor();

if ($user_count > 0) {
    // El usuario ya existe, agrega un mensaje de error a la variable $errores
    if ($errores) {
        $errores .= '&usernameExist=true';
    } else {
        $errores = '?usernameExist=true';
    }

    // Si hay errores
    if ($errores != "") {
        $datosRecibidos = array(
            'username' => $username,
            'correo_reg' => $correo_reg,
            'pwd_reg' => $pwd_reg
        );
        $datosDevueltos = http_build_query($datosRecibidos);
        header("Location: ../view/index.php" . $errores . "&" . $datosDevueltos);
        exit();
    }
} else {
    // El usuario no existe, procede con la inserción
    $sql = "INSERT INTO tbl_user (`id_user`, `nombre_user`, `pwd_user`, `correo_user`) VALUES (NULL, :username, :pwdEncriptada, :correo_reg)";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':username', $username);
    $stmt->bindParam(':pwdEncriptada', $pwdEncriptada);
    $stmt->bindParam(':correo_reg', $correo_reg);
    $stmt->execute();

    // Verifica si la inserción fue exitosa
    if ($stmt->rowCount() > 0) {
        echo "Usuario registrado exitosamente";
        header('Location: ../view/index.php');
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
