<?php
session_start();
if(isset($_SESSION['cliente'])) {
    $username = $_SESSION['cliente'];
    include_once("./conexion.php");

    if(isset($_POST['id_peli'])) {
        $id_peli = $_POST['id_peli'];
        try {
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $pdo->beginTransaction();

            $sql_id_user = "SELECT id_user FROM tbl_user WHERE id_user = :cliente";
            $stmt_id_user = $pdo->prepare($sql_id_user);
            $stmt_id_user->bindParam(':cliente', $username, PDO::PARAM_INT);
            $stmt_id_user->execute();
            $row = $stmt_id_user->fetch(PDO::FETCH_ASSOC);
            $id_user = $row['id_user'];
            var_dump($row);

            $sql_check = "SELECT * FROM tbl_likes WHERE id_likes_peli = :id_peli AND id_likes_user = :id_user";
            $stmt_check = $pdo->prepare($sql_check);
            $stmt_check->bindParam(':id_peli', $id_peli, PDO::PARAM_INT);
            $stmt_check->bindParam(':id_user', $id_user, PDO::PARAM_INT);
            $stmt_check->execute();

            if ($stmt_check->rowCount() > 0) {
                // hacer delete
                $consulta_delete = $pdo->prepare("DELETE FROM tbl_likes WHERE id_likes_peli = :id_peli AND id_likes_user = :id_user");
                $consulta_delete->bindParam(':id_user', $id_user, PDO::PARAM_INT);
                $consulta_delete->bindParam(':id_peli', $id_peli, PDO::PARAM_INT);
                $consulta_delete->execute(); 
                if ($consulta_delete->rowCount() > 0) {
                    echo json_encode("BORRADO");
                } else {
                    echo "Hubo un problema al borrar el like.";
                }          
            } else {
                // hacer el insert 
                $consulta = $pdo->prepare("INSERT INTO tbl_likes (id_likes_user, id_likes_peli) VALUES (:id_user, :id_peli)");
                $consulta->bindParam(':id_user', $id_user, PDO::PARAM_INT);
                $consulta->bindParam(':id_peli', $id_peli, PDO::PARAM_INT);
                $consulta->execute(); 
                if ($consulta->rowCount() > 0) {
                    echo json_encode("ok");
                } else {
                    echo "Hubo un problema al dar like.";
                }  
            }
            $pdo->commit();
        } catch(PDOException $e) {
            $pdo->rollBack();
            echo json_encode(["error" => "Error: " . $e->getMessage()]);
        }
    } else {
        echo json_encode(["error" => "No se recibió el ID de la película."]);
    }
} else {
    header('Location: ../index.php');
    exit(); 
}
?>
