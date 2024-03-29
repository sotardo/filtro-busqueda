<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "pirerayen";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Error de conexión: " . $conn->connect_error);
}

// Consulta SQL para obtener el último ID cargado
$sql = "SELECT MAX(id) AS max_id FROM hardware";

// Ejecutar la consulta
$result = $conn->query($sql);

// Obtener el último ID cargado
$ultimoId = $result->fetch_assoc()['max_id'];

// Calcular el siguiente ID
$nuevoId = $ultimoId + 1;

$equipo = $_POST['equipo'];
$nombre = $_POST['nombre'];
$apellido = $_POST['apellido'];
$ubicacion = $_POST['ubicacion'];
$so = $_POST['so'];
$procesador = $_POST['procesador'];
$ram = $_POST['ram'];
$disco = $_POST['disco'];
$gpu = $_POST['gpu'];

$idUbicacion = null; // Variable para almacenar el idUbicacion según la ubicación seleccionada

// Asignar el valor correcto al idUbicacion según la ubicación seleccionada
if ($ubicacion == "pire") {
  $idUbicacion = 1;
} elseif ($ubicacion == "valley") {
  $idUbicacion = 2;
} elseif ($ubicacion == "hicsa") {
  $idUbicacion = 3;
} elseif ($ubicacion == "usados") {
  $idUbicacion = 4;
} elseif ($ubicacion == "roca") {
  $idUbicacion = 5;
} elseif ($ubicacion == "zapala") {
  $idUbicacion = 6;
} elseif ($ubicacion == "pin") {
  $idUbicacion = 7;
}

$sql = "INSERT INTO hardware (id, equipo, nombre, apellido, ubicacion, so, procesador, ram, disco, gpu, idUbicacion)
        VALUES ('$nuevoId', '$equipo', '$nombre', '$apellido', '$ubicacion', '$so', '$procesador', '$ram', '$disco', '$gpu', '$idUbicacion')";

if ($conn->query($sql) === TRUE) {
  echo "Hardware guardado exitosamente";
} else {
  echo "Error al guardar el hardware: " . $conn->error;
}

$conn->close();
?>
