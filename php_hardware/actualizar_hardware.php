<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "pirerayen";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Error de conexión: " . $conn->connect_error);
}

$id = $_POST['id']; // ID del hardware a actualizar
$equipo= $_POST['equipo'];
$nombre = $_POST['nombre'];
$apellido = $_POST['apellido'];
$ubicacion = $_POST['ubicacion'];
$so = $_POST['so'];
$procesador = $_POST['procesador'];
$ram = $_POST['ram'];
$disco = $_POST['disco'];
$gpu = $_POST['gpu'];

$updateSql = "UPDATE hardware SET equipo=?, nombre=?, apellido=?, so=?, procesador=?, ram=?, disco=?, ubicacion=?, gpu=? WHERE id=?";
$stmtUpdate = $conn->prepare($updateSql);
$stmtUpdate->bind_param("sssssssssi", $equipo, $nombre, $apellido, $so, $procesador, $ram, $disco, $ubicacion, $gpu, $id);


if ($stmtUpdate->execute()) {
  if ($stmtUpdate->affected_rows > 0) {
    echo "success";
  } else {
    echo "No se encontró el hardware para actualizar";
  }
} else {
  echo "Error al ejecutar la consulta: " . $stmtUpdate->error;
}

$stmtUpdate->close();
$conn->close();
?>
