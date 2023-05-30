<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "pirerayen";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Error de conexión: " . $conn->connect_error);
}

$id = $_POST['id']; // Nuevo campo "id" agregado
$nombre = $_POST['nombre'];
$apellido = $_POST['apellido'];
$empresa = $_POST['empresa'];
$servidores = $_POST['servidores'];
$usuario = $_POST['usuario'];
$contraseña = $_POST['contraseña'];
$sector = $_POST['sector'];
$interno = $_POST['interno'];
$email = $_POST['email'];
$impresora = $_POST['impresora'];
$ip = $_POST['ip'];

$idEmpresa = null; // Variable para almacenar el idEmpresa correspondiente a la empresa seleccionada

// Asignar el valor correcto al idEmpresa según la empresa seleccionada
if ($empresa == "pire") {
  $idEmpresa = 1;
} elseif ($empresa == "valley") {
  $idEmpresa = 2;
} elseif ($empresa == "hicsa") {
  $idEmpresa = 3;
}

$sql = "INSERT INTO usuarios (id, nombre, apellido, empresa, servidores, usuario, contraseña, sector, interno, email, impresora, idEmpresa, ip)
        VALUES ('$id', '$nombre', '$apellido', '$empresa', '$servidores', '$usuario', '$contraseña', '$sector', '$interno', '$email', '$impresora', '$idEmpresa', '$ip')";

if ($conn->query($sql) === TRUE) {
  echo "Usuario guardado exitosamente";
} else {
  echo "Error al guardar el usuario: " . $conn->error;
}

$conn->close();
?>
