<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "pirerayen";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Error de conexión: " . $conn->connect_error);
}

$id = $_POST['id']; // ID del usuario a actualizar

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

$sql = "UPDATE usuarios SET nombre='$nombre', apellido='$apellido', empresa='$empresa', servidores='$servidores', 
        usuario='$usuario', contraseña='$contraseña', sector='$sector', interno='$interno', email='$email', 
        impresora='$impresora', idEmpresa='$idEmpresa', ip='$ip' WHERE id='$id'";

$result = $conn->query("SELECT * FROM usuarios WHERE id='$id' LIMIT 1");

if ($result->num_rows > 0) {
  if ($conn->query($sql) === TRUE) {
    echo "Usuario actualizado exitosamente";
  } else {
    echo "Error al actualizar el usuario: " . $conn->error;
  }
} else {
  echo "No se encontró el usuario para actualizar";
}

$conn->close();
?>
