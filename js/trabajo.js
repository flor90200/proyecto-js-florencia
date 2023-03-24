
function clima (posicion){
  let lat = posicion.coords.latitude;
  let long = posicion.coords.longitude;
  let key = "92486cc876e2409257aa951843e0bda7"

  fetch (`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}&units=metric&lang=es`)
  .then(response=>response.json())
  .then(data=>{
    document.header.innerHTML = `
    <header class="banner">
    <div class="logo" id="div_tiempo">
    <img src="./img/logo.jpg" alt="flower style logo">
                            <p>${data.name}</p>
                            <p>Temp:${data.main.temp}</p>
                            <p>Clima:${data.weather[0].description}</p>
                            </div>
                            </header>
    `
  })
}

async function clima (posicion){
  let lat = posicion.coords.latitude;
  let long = posicion.coords.longitude;
  let key = "92486cc876e2409257aa951843e0bda7"

  fetch (`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}&units=metric&lang=es`)
  .then(response=>response.json())
  .then(data=>{
    let div_tiempo= document.getElementById("div_tiempo");
    div_tiempo.document.header.innerHTML = `
    <header class="banner">
    <div class="logo" id="div_tiempo">
    <img src="./img/logo.jpg" alt="flower style logo">
                            <p>${data.name}</p>
                            <p>Temperatura:${data.main.temp} °C</p>
                            <p>Clima:${data.weather[0].description}</p>
                            </div>
                            </header>
                            
    `
  })
}

navigator.geolocation.getCurrentPosition(clima);
class Productos {
  constructor(id, nombre_pestañas, nombre_volumen, imgSrc, precio, ) {
    this.id = id;
    this.nombre_pestañas = nombre_pestañas;
    this.nombre_volumen = nombre_volumen;
    this.imgSrc = imgSrc;
    this.precio = precio;
  }
}


let lista_productos = [];

lista_productos.push(
  new Productos(
    "Extensiones de Pestañas",
    "Clasicas",
    "PxP",
    "./img/clasicas.jpg",
    2800
  )
);
lista_productos.push(
  new Productos(
    "Extensiones de Pestañas",
    "Volumen 2D",
    "2D",
    "./img/dos-de.jpg",
    3000
  )
);
lista_productos.push(
  new Productos(
    "Extensiones de Pestañas",
    "Volumen 3D",
    "3D",
    "./img/tres-de.jpg",
    3200
  )
);
lista_productos.push(
  new Productos(
  "Extensiones de Pestañas",
   "Volumen 4D",
   "4D", 
   "./img/pestañas.jpg",
   3400)
);
lista_productos.push(
  new Productos(
    "Extensiones de Pestañas",
    "Volumen 5D",
    "5D",
    "./img/cinco-de.jpg",
    3700
  )
);
lista_productos.push(
  new Productos(
    "Extensiones de Pestañas",
    "Volumen Ruso",
    "Ruso",
    "./img/volumen-ruso.jpg",
    4000
  )
);
lista_productos.push(
  new Productos(
    "Pestañas",
    "Mega Volumen",
    "Mega",
    "./img/mega.jpg",
    4500
  )
);
lista_productos.push(
  new Productos(
    "Lifting",
    "lifting",
    "+ henna",
    "./img/lifting.jpg",
    2500
  )
);
lista_productos.push(
  new Productos(
    "Lifting",
    "lifting",
    "+ Henna + Botox",
    "./img/lifting.jpg",
    2600
  )
);
lista_productos.push(
  new Productos(
    "Perfilado",
    "Perfilado de cejas",
    "de cejas",
    "./img/logo.jpg",
    800
  )
);
lista_productos.push(
  new Productos(
    "Laminado",
    "laminado de cejas",
    "+ henna + botox",
    "./img/logo.jpg",
    2400
  )
);
lista_productos.push(
  new Productos(
    "Remocion",
    "remocion del producto",
    "Remocion",
    "./img/logo.jpg",
    600
  )
);
lista_productos.push(
  new Productos(
    "Color",
    "Un poco de color a tus extensiones",
    "Color",
    "./img/logo.jpg",
    300
  )
);
lista_productos.push(
  new Productos(
    "Strass",
    "strass para decorar",
    "Brillos",
    "./img/logo.jpg",
    200
  )
);




// RENDER PRODUCTOS

let productos_agregar = document.querySelector(".productos");

function renderizarProductos() {
  lista_productos.forEach((producto) => {
    productos_agregar.innerHTML += `
    <div class='card'>
    <img src='${producto.imgSrc}' class='card-img-top card_img' alt='imagen ${producto.nombre}'>
    <div class='card_body'>
      <h4 class='card_title_pestañas'>${producto.nombre_pestañas}</h4>
      <h5 class='card_title_volumen'>${producto.nombre_volumen}</h5>
      <h5 class='card_precio'>${producto.precio}$</h5>
      <h6 id='card_id'>${producto.id}</h6>
      <button class='btn_agregar_carrito'>AGREGAR AL CARRITO</button>
    </div>
  </div>
    `;
  });

}

  renderizarProductos();




// CARRITO

let btn_agregar = document.querySelectorAll(".btn_agregar_carrito");

for (let btn of btn_agregar) {
  btn.addEventListener("click", agregar_a_carrito);
}

// AGREGAR A CARRITO

let carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];

function agregar_a_carrito(e) {
  let button = e.target;
  let idProducto = button.parentElement.querySelector("#card_id").textContent;
  let nombreProductoPestañas = button.parentElement.querySelector(
    ".card_title_pestañas").textContent;
    Toa_agregar_prod();
  let nombreProductoVolumen =
    button.parentElement.querySelector(".card_title_volumen").textContent;
  let precioProducto =
    button.parentElement.querySelector(".card_precio").textContent;
  let imagenProducto =
    button.parentElement.parentElement.querySelector("img").src;

  let producto_carrito = {
    idProducto: idProducto,
    nombre_pestañas: nombreProductoPestañas,
    nombre_volumen: nombreProductoVolumen,
    precio: precioProducto,
    cantidad: 1,
    img: imagenProducto,
  };


  aumentar_producto(producto_carrito);
}

// TOTAL CARRITO

const carrito_total = () => {
  const valor_total = document.getElementById("carrito_precio_total");

  let total_a_pagar = 0;
  carrito.forEach((producto) => {
    const precio = parseInt(producto.precio);
    const cantidad = parseInt(producto.cantidad);
    total_a_pagar += precio * cantidad;
    

  });
  valor_total.innerHTML = `$${total_a_pagar}`;
  sessionStorage.setItem("carrito", JSON.stringify(carrito));
};

// TOASTIFIES:

function Toa_agregar_prod (){

Toastify({
  text: "Agregado ❤",
  className: "alerta_agregado",
  style: {
    background: "linear-gradient(to right, #A94BDF, #FB06DF)",
  }
}).showToast();
};

function Toa_eliminar_prod (){

  Toastify({
    text: "Eliminado ❌",
    className: "alerta_eliminado",
    style: {
      background: "linear-gradient(to right, #000000, #5C0F18)",
    }
  }).showToast();
  };

// AGREGAR A CARRITO 

function aumentar_producto(producto_carrito) {
  const inputProductoUnidades = document.getElementsByClassName("input_unidades");
  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].idProducto === producto_carrito.idProducto) {
      carrito[i].cantidad++;
      const inputValorNuevoUnidades = inputProductoUnidades[i];
      inputValorNuevoUnidades.value++;
      carrito_total();
      return null;
    }
  }
  carrito.push(producto_carrito);
  render_carrito();
}



// RENDER 

function render_carrito() {
  let tabla = document.getElementById("carrito-items");
  tabla.innerHTML = ``;

  for (let producto of carrito) {
    let fila = document.createElement("tr");
    fila.innerHTML = `<td><img src="${producto.img}" width="80px">
                      <p class="id_producto">${producto.idProducto}</p></td>
                      <td><p class="nombre_producto_pestañas">${producto.nombre_pestañas}</p></td>
                      <td><p class="nombre_producto_volumen">${producto.nombre_volumen}</p></td>
                      <td>
                      <input type="number" min="1" class="input_unidades" value=${producto.cantidad}></td>
                      <td class="prod_carrito_precio">${producto.precio}</td>
                      <button class="btn btn-danger button btn_borrar_elemento">ELIMINAR</button>`;

    tabla.append(fila);
    carrito_total();
  }



  const btn_input = document.querySelectorAll(".input_unidades");



  for (let btn of btn_input) {
    btn.addEventListener("change", sumaCantidad);
  }

  function sumaCantidad(e) {

    const sumaInput = e.target;
    const idProd = sumaInput.parentElement.parentElement.querySelector(".id_producto").textContent;

    carrito.forEach((item) => {
      if(item.idProducto === idProd) {
        sumaInput.value < 1 ? sumaInput.value = 1 : sumaInput.value;
        item.cantidad = sumaInput.value;
        carrito_total();
      }
        });
      }


  // BORRAR ELEMENTOS

  let btn_borrar_elemento = document.querySelectorAll(".btn_borrar_elemento");

  for (let btn of btn_borrar_elemento) {
    btn.addEventListener("click", eliminar_producto);
  }

  function eliminar_producto(e) {
    let padre = e.target.parentNode;
    let producto_eliminar = padre.querySelector(".id_producto").textContent;

    for (let i = 0; i < carrito.length; i++) {
      if (carrito[i].idProducto === producto_eliminar) {
        carrito.splice(i, 1);
        padre.remove();
        Toa_eliminar_prod();
        carrito_total();
      }
    }
  }

  carrito_total();
}



let btn_pagar = document.querySelector('.btn-pagar');

btn_pagar.addEventListener('click', () => {


  let  total_a_pagar = document.getElementById('carrito_precio_total').textContent.replace("$", "" );
  
  if (total_a_pagar > 0) {
  
    Swal.fire({
      imageUrl: "./img/logo.jpg",
      title: "Gracias por su compra 😍",
      background:"#E8A2E2",
      imageWidth: "100px",
      confirmButtonText: 'Continuar',
      showClass: {
        popup: 'animate__animated animate__flipInY'
      },
      hideClass: {
        popup: 'animate__animated animate__flipOutY'
      }
    })

    window.sessionStorage.clear()
}
else {

  Swal.fire({
    imageUrl: "./img/logo.jpg",
    text: 'No hay productos seleccionados ❌',
    Size: "300px",
    imageWidth: "100px",
    background:"#E8A2E2",
    confirmButtonText: 'Continuar',
    showClass: {
      popup: 'animate__animated animate__fadeIn'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeInDown'
    }
  })

}
});





