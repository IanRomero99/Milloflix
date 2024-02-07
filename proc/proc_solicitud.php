<?php
session_start();

if ($_SESSION['correo_ini']) {
    include_once('../proc/conexion.php');
    // Obtener el ID del usuario que envía la solicitud (puedes obtenerlo de la sesión)

    $correo_ini = $_SESSION['correo_ini'];  
    
    // Obtener el ID del usuario receptor de la solicitud enviado desde AJAX
    $idUsuarioReceptor = $_POST['id_user'];

    
    try {
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        // Inicia la transacción
        $pdo->beginTransaction();
        
        //consulta para obtener id del usuario que ha inciado sesion
        $sqlRecogerId = "SELECT id_user FROM tbl_user WHERE correo_user = :correo_ini";
        $stmtRecogerId = $pdo->prepare($sqlRecogerId);
        $stmtRecogerId->bindParam(':correo_ini', $correo_ini, PDO::PARAM_STR);
        $stmtRecogerId->execute();
        if ($stmtRecogerId->rowCount() > 0) {
            $idUsuarioEmisor = $stmtRecogerId->fetchColumn();
        } else{
            // Verificar si ya existe una solicitud pendiente
                $sqlSolicitudExistente = "SELECT id_solicitud 
                FROM tbl_solicitud s 
                JOIN tbl_estado e ON s.id_estado = e.id_estado 
                WHERE id_emisor = :idUsuarioEmisor 
                AND id_receptor = :idUsuarioReceptor 
                AND e.nombre_estado = 'Pendiente'
                 ";            
                $stmtSolicitud = $pdo->prepare($sqlSolicitudExistente);
                $stmtSolicitud->bindParam(':idUsuarioEmisor', $idUsuarioEmisor, PDO::PARAM_INT);
                $stmtSolicitud->bindParam(':idUsuarioReceptor', $idUsuarioReceptor, PDO::PARAM_INT);
                $stmtSolicitud->execute();
            
                if ($stmtSolicitud->rowCount() > 0) {
                    echo "pendiente";
                    exit();  // Salir del script para evitar insertar la solicitud
                }else{
                    // Insertar la solicitud en la base de datos
                    $sqlInsertarSolicitud = "INSERT INTO tbl_solicitud (id_emisor, id_receptor, id_estado) VALUES (:idEmisor, :idReceptor, '1')";
                    $stmtInsertarSolicitud = $pdo->prepare($sqlInsertarSolicitud);
                    $stmtInsertarSolicitud->bindParam(':idEmisor', $idUsuarioEmisor, PDO::PARAM_INT);
                    $stmtInsertarSolicitud->bindParam(':idReceptor', $idUsuarioReceptor, PDO::PARAM_INT);
                    $stmtInsertarSolicitud->execute();
                    //error_log('Solicitud insertada en la base de datos');
                    // Confirma la transacción
                    $pdo->commit();
                    //error_log('Transacción confirmada');
                    echo "ok";

                }
            


        }
    } catch (PDOException $e) {
        // Si hay algún error, realiza un rollback
        $pdo->rollBack();
        echo "Error al enviar la solicitud: " . $e->getMessage() . " - Código: " . $e->getCode();
        die();
    }
        
} else {
    header('Location: ../index.php');
    exit();
}
?>
