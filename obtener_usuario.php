<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "pirerayen";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Error de conexión: " . $conn->connect_error);
}

$idUsuario = $_GET['id'];

$sql = "SELECT * FROM usuarios WHERE id='$idUsuario'";
$resultado = $conn->query($sql);

if ($resultado->num_rows > 0) {
  $usuario = $resultado->fetch_assoc();
  echo json_encode($usuario);
} else {
  echo "Usuario no encontrado";
}

$conn->close();
?>
