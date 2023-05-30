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

// Consultar todos los datos de la tabla
$sql = "SELECT * FROM usuarios";
$result = $conn->query($sql);

$usuarios = array();

// Recorrer los resultados y guardarlos en el array $usuarios
if ($result->num_rows > 0) {
  while ($row = $result->fetch_assoc()) {
    $usuarios[] = $row;
  }
}

// Devolver los datos como respuesta JSON
header('Content-Type: application/json');
echo json_encode($usuarios);

$conn->close();
?>