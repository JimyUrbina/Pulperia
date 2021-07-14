class facturacion {

  //Arreglo que contiene los productos inicialess
  $prod = [
    {
      codigo: 1,
      nombre: "Toallas Húmedas Hubbies",
      precio: 65,
    },
    {
      codigo: 2,
      nombre: "Corn Flakes",
      precio: 45,
    },
    {
      codigo: 3,
      nombre: "Numar Clásica",
      precio: 50,
    },
    {
      codigo: 4,
      nombre: "Café Presto 150g",
      precio: 130,
    },
    {
      codigo: 5,
      nombre: "Xedex 500g",
      precio: 30,
    },
    {
      codigo: 6,
      nombre: "Magia Blanca 900ml",
      precio: 50,
    },
    {
      codigo: 7,
      nombre: "Nevax 4 Rollos",
      precio: 92,
    },
    {
      codigo: 8,
      nombre: "Nido 800g",
      precio: 230,
    },
    {
      codigo: 9,
      nombre: "Magia Blanca 1L",
      precio: 48,
    },
    {
      codigo: 10,
      nombre: "Fuente Pura 18.9L",
      precio: 70,
    },
  ];

  $carrito = [];//productos agregados a facturar

  constructor() {
    this.total = 0; //inicializamos el total de la factura
  }

  ObtenerPrecio(codigo) {
    let obj = this.$prod.find((x) => x.codigo == codigo); //hacemos una busqueda en el arreglos del producto comparandolos con el codigo para obtener el precio
    return obj.precio;//retornamos el valor del precio
  }

  CambiarPrecio(codigo, precio) {
    let objIndex = this.$prod.findIndex((obj) => obj.codigo == codigo); //obtenemos el index donde se almacena el objeto a modificar
    this.$prod[objIndex].precio = parseFloat(precio); //asignamos el nuevo precio al producto
  }

  Agregar(codigo) {

    let obj = this.$prod.find((x) => x.codigo == codigo); 

    let objIndex = this.$carrito.findIndex((x) => x.codigo == codigo);

    if (objIndex == -1) { //si devuelvo un numero negativo, indica que el producto no esta agregado al carrito
      let items = {
        codigo: codigo,
        cantidad: 1,
        nombre: obj.nombre,
        precio: obj.precio,
        subtotal: parseFloat(1) * parseFloat(obj.precio),
      };

      this.$carrito.push(items); //agregamos el producto al carrito
    } else {
      let cantidad = this.$carrito[objIndex].cantidad;
      cantidad = parseInt(cantidad) + 1;
      let subtotal = this.$carrito[objIndex].subtotal;
      subtotal = parseFloat(subtotal) + parseFloat(obj.precio);
      this.$carrito[objIndex].cantidad = cantidad;
      this.$carrito[objIndex].subtotal = subtotal;
    }
    this.Total = 0;
    this.$carrito.forEach((element) => {  //recorrimos el carrito para obtener el total de la factura
      this.Total += parseFloat(element.subtotal);
    });
  }

  Vuelto(pago) {

    //Unicamente controlamos valores enteros para el dar el vuelto
    //1000
    //500
    //200
    //100
    //50
    //20
    //10
    //5
    //1

    let cambio = parseFloat(pago) - parseFloat(this.Total); //obtenemos el cambio a entregar
    cambio = Math.round(cambio * 100) / 100;

    //creamos variables por cada denominacion de billetes
    let billetes_de_1000,
      billetes_de_500,
      billetes_de_200,
      billetes_de_100,
      billetes_de_50,
      billetes_de_20,
      billetes_de_10;

    let cantidad_de_cordoba,monedas_de_5, monedas_de_1, centavos_1, centavos_10, centavos_25, centavos_50;

    cantidad_de_cordoba = parseFloat(cambio);

    //monedas_de_1 = cantidad_de_cordoba; // le asignamos el total de cambio en caso de no haya billete a entregar

    centavos_1 = cantidad_de_cordoba;

    //para obtener el total de billete a entregar, simplemente comprobamos si el monto es divisible entre la denominacion del billete que queremos comprobar
    //se realiza la misma operacion por cada denomiacion
    billetes_de_1000 = (centavos_1- (centavos_1 % 1000)) / 1000; 
    centavos_1 = centavos_1 % 1000;
    billetes_de_500 = (centavos_1 - (centavos_1 % 500)) / 500;
    centavos_1 = centavos_1 % 500;
    billetes_de_200 = (centavos_1 - (centavos_1 % 200)) / 200;
    centavos_1 = centavos_1 % 200;
    billetes_de_100 = (centavos_1 - (centavos_1 % 100)) / 100;
    centavos_1 = centavos_1 % 100;
    billetes_de_50 = (centavos_1 - (centavos_1 % 50)) / 50;
    centavos_1 = centavos_1 % 50;
    billetes_de_20 = (centavos_1 - (centavos_1 % 20)) / 20;
    centavos_1 = centavos_1 % 20;
    billetes_de_10 = (centavos_1 - (centavos_1 % 10)) / 10;
    centavos_1 = centavos_1 % 10;
    monedas_de_5 = (centavos_1 - (centavos_1 % 5)) / 5;
    centavos_1 = centavos_1 % 5;
    monedas_de_1 = (centavos_1 - (centavos_1 % 1)) / 1;
    centavos_1 = centavos_1 % 1;

    centavos_50 = (centavos_1 - (centavos_1 % 0.50)) / 0.50;
    centavos_1 = centavos_1 % 0.50;
    centavos_25 = (centavos_1 - (centavos_1 % 0.25)) / 0.25;
    centavos_1 = centavos_1 % 0.25;
    centavos_10 = (centavos_1 - (centavos_1 % 0.10)) / 0.10;
    centavos_1 = centavos_1 % 0.10;

    let obj = [];


    //una vez obtenido la cantidad por denominacion comparamos la variables si son mayores que cero para hacer si la agregar al arreglo que contendra el detalle de billete a entregar
    //se realiza la misma operacion por cada denomiacion
    if (parseInt(billetes_de_1000) > 0) {
      obj.push({
        billete: 1000,
        cantidad: billetes_de_1000,
      });
    }
    if (parseInt(billetes_de_500) > 0) {
      obj.push({
        billete: 500,
        cantidad: billetes_de_500,
      });
    }
    if (parseInt(billetes_de_200) > 0) {
      obj.push({
        billete: 200,
        cantidad: billetes_de_200,
      });
    }
    if (parseInt(billetes_de_100) > 0) {
      obj.push({
        billete: 100,
        cantidad: billetes_de_100,
      });
    }
    if (parseInt(billetes_de_50) > 0) {
      obj.push({
        billete: 50,
        cantidad: billetes_de_50,
      });
    }
    if (parseInt(billetes_de_20) > 0) {
      obj.push({
        billete: 20,
        cantidad: billetes_de_20,
      });
    }
    if (parseInt(billetes_de_10) > 0) {
      obj.push({
        billete: 10,
        cantidad: billetes_de_10,
      });
    }
    if (parseInt(monedas_de_5) > 0) {
      obj.push({
        billete: 5,
        cantidad: monedas_de_5,
      });
    }
    if (parseInt(monedas_de_1) > 0) {
      obj.push({
        billete: 1,
        cantidad: monedas_de_1,
      });
    }

    if (parseFloat(centavos_50) > 0) {
      obj.push({
        billete: 0.50,
        cantidad: centavos_50,
      });
    }

    if (parseFloat(centavos_25) > 0) {
      obj.push({
        billete: 0.25,
        cantidad: centavos_25,
      });
    }

    if (parseFloat(centavos_10) > 0) {
      obj.push({
        billete: 0.10,
        cantidad:  centavos_10,
      });
    }

    return obj;
  }

  get Total() {
    return this.total;
  }

  set Total(val) {
    this.total = val;
  }
}
