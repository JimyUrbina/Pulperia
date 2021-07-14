let fact = new facturacion();

function obtener() {
  let codigo = document.getElementById("producto").value; //obtenemos el valor del codigo seleccinado
  let precio = fact.ObtenerPrecio(codigo); //mandamos a llamar los metodos
 
  document.getElementById("precio").value = precio; // le asignamos al input el precio obtenido
}

function cambiar() {
    
  let codigo = document.getElementById("producto").value;
  let precio = document.getElementById("nuevo_precio").value;

  fact.CambiarPrecio(codigo, precio);
  document.getElementById("nuevo_precio").value = "";
  document.getElementById("precio").value = precio;
  alert("El precio del producto ha cambiado");
}

function agregar() {
  let codigo = document.getElementById("producto").value;
  fact.Agregar(codigo);
  let tr = "";

  fact.$carrito.forEach((element) => { //recorremos el carrito para crear las filas para tabla de facturacion
    tr +=
      "<tr>" +
      "<td>" +
      element.nombre +
      "</td>" +
      "<td>" +
      element.cantidad +
      "</td>" +
      "<td>C$ " +
      element.subtotal +
      "</td>" +
      "</tr>";
  });

  document.getElementById("carritos").innerHTML = tr; //asignamos la filas creadadas a la tabla
  document.getElementById("total").innerHTML = "C$" + fact.Total; //asignamos el total a pagar
}

function vuelto() {
  let pago = document.getElementById("pago").value;
  let cambio = parseFloat(pago) - parseFloat(fact.Total);

  cambio = Math.round(cambio * 100) / 100;

  if (cambio < 0){ //comprobamos que el monto disponible sea mayor a total a pagar
      alert('El monto disponible insuficiente para el total a pagar');
      return;
  }

  let obj = fact.Vuelto(pago);
  let tr = "";

  obj.forEach((element) => {
    tr +=
      "<tr>" +
      "<td>C$ " +
      element.billete +
      "</td>" +
      "<td>" +
      element.cantidad +
      "</td>" +
      "</tr>";
  });

 
  document.getElementById("tcambio").value = cambio;
  document.getElementById("vuelto").innerHTML = tr;
}
