<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "pirerayen";

// Crear conexión a la base de datos
$conn = new mysqli($servername, $username, $password, $dbname);

// Comprobar la conexión
if ($conn->connect_error) {
  die("Error de conexión: " . $conn->connect_error);
}

// Consultar todos los datos de la tabla hardware
$sql = "SELECT * FROM hardware";
$result = $conn->query($sql);

$hardware = array();

// Recorrer los resultados y guardarlos en el array $hardware
if ($result->num_rows > 0) {
  while ($row = $result->fetch_assoc()) {
    $hardware[] = $row;
  }
}

// Devolver los datos como respuesta JSON
header('Content-Type: application/json');
echo json_encode($hardware);

$conn->close();
?>
