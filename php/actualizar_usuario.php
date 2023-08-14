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

// Verificar si el usuario existe antes de actualizarlo
$selectSql = "SELECT id FROM usuarios WHERE id = ?";
$stmtSelect = $conn->prepare($selectSql);
$stmtSelect->bind_param("i", $id);
$stmtSelect->execute();
$stmtSelect->store_result();

if ($stmtSelect->num_rows > 0) {
  // El usuario existe, realizar la actualización
  $updateSql = "UPDATE usuarios SET nombre=?, apellido=?, empresa=?, servidores=?, usuario=?, contraseña=?, sector=?, interno=?, email=?, impresora=?, idEmpresa=?, ip=? WHERE id=?";
  $stmtUpdate = $conn->prepare($updateSql);
  $stmtUpdate->bind_param("ssssssssssisi", $nombre, $apellido, $empresa, $servidores, $usuario, $contraseña, $sector, $interno, $email, $impresora, $idEmpresa, $ip, $id);

  if ($stmtUpdate->execute()) {
    if ($stmtUpdate->affected_rows > 0) {
      echo "success";
    } else {
      echo "No se encontró el usuario para actualizar";
    }
  } else {
    echo "Error al ejecutar la consulta: " . $stmtUpdate->error;
  }

  $stmtUpdate->close();
} else {
  echo "No se encontró el usuario para actualizar";
}

$stmtSelect->close();
$conn->close();
?>
