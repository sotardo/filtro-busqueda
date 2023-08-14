var hardware = [];

function cargarHardware() {
  // Realizar la solicitud AJAX para obtener el hardware desde "filtrar_hardware.php"
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // Procesar la respuesta JSON y guardar el hardware en la variable "hardware"
      hardware = JSON.parse(xhr.responseText);
    }
  };
  xhr.open('GET', '../php_hardware/filtrar_hardware.php', true);
  xhr.send();
}

function filtrarHardware() {
  var filtroInput = document.getElementById('filtroInput');
  var filtro = filtroInput.value.toUpperCase();

  var tablaHardware = document.getElementById('tablaHardware');
  var filas = tablaHardware.getElementsByTagName('tr');

  // Vaciar la tabla, excepto la primera fila que contiene los encabezados
  for (var i = filas.length - 1; i > 0; i--) {
    tablaHardware.deleteRow(i);
  }

  // Recargar los datos filtrados en la tabla
  for (var i = 0; i < hardware.length; i++) {
    var item = hardware[i];
    var nombre = item.nombre.toUpperCase();
    var apellido = item.apellido.toUpperCase();
    var sistemaOperativo = item.so.toUpperCase();
    var procesador = item.procesador.toUpperCase();
    var ram = item.ram.toUpperCase();
    var disco = item.disco.toUpperCase();
    var ubicacion = item.ubicacion.toUpperCase();

    if (nombre.includes(filtro) || apellido.includes(filtro) || so.includes(filtro) ||
        procesador.includes(filtro) || ram.includes(filtro) || disco.includes(filtro) || ubicacion.includes(filtro)) {
      var claseCSS = i % 2 === 0 ? 'color-fondo-1' : 'color-fondo-2';    
      var fila = tablaHardware.insertRow();
      fila.innerHTML = '<td class="' + claseCSS + '">' + item.id + '</td>' +
                       '<td class="' + claseCSS + '">' + item.nombre + '</td>' +
                       '<td class="' + claseCSS + '">' + item.apellido + '</td>' +
                       '<td class="' + claseCSS + '">' + item.so + '</td>' +
                       '<td class="' + claseCSS + '">' + item.procesador + '</td>' +
                       '<td class="' + claseCSS + '">' + item.ram + '</td>' +
                       '<td class="' + claseCSS + '">' + item.disco + '</td>' +
                       '<td class="' + claseCSS + '">' + item.ubicacion + '</td>';
    }
  }
}
function guardarHardware(event) {
    event.preventDefault();
  
    var id = document.getElementById("id").value;
    var nombre = document.getElementById("nombre").value;
    var sistemaOperativo = document.getElementById("sistemaOperativo").value;
    var procesador = document.getElementById("procesador").value;
    var ram = document.getElementById("ram").value;
    var disco = document.getElementById("disco").value;
    var ubicacion = document.getElementById("ubicacion").value;
  
    var data = new FormData();
    data.append("id", id);
    data.append("nombre", nombre);
    data.append("sistemaOperativo", sistemaOperativo);
    data.append("procesador", procesador);
    data.append("ram", ram);
    data.append("disco", disco);
    data.append("ubicacion", ubicacion);
  
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "php_hardware/guardar_hardware.php", true); // Ajusta la ruta aquí
    xhr.onload = function () {
      if (xhr.status === 200) {
        var response = xhr.responseText;
        if (response === "success") {
          document.getElementById("formulario").reset();
          alert("Hardware guardado exitosamente.");
        } else {
          alert("Error al guardar el hardware.");
        }
      }
    };
    xhr.send(data);
  }
  
// Cargar hardware al cargar la página
window.onload = function () {
  cargarHardware();

  var buscarButton = document.getElementById('button-buscar');
  buscarButton.addEventListener('click', filtrarHardware);

  var filtroInput = document.getElementById('filtroInput');
  filtroInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
      filtrarHardware();
    }
  });
};
