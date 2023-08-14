<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "pirerayen";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Error de conexión: " . $conn->connect_error);
}

$idHardware = $_GET['id'];

$sql = "SELECT * FROM hardware WHERE id='$idHardware'";
$resultado = $conn->query($sql);

if ($resultado->num_rows > 0) {
  $hardware = $resultado->fetch_assoc();
  echo json_encode($hardware);
} else {
  echo "Hardware no encontrado";
}

$conn->close();
?>
