let productos = JSON.parse(localStorage.getItem("productos")) || [];

const form = document.getElementById("formProducto");
const tabla = document.getElementById("tablaProductos");
const btnCancelar = document.getElementById("btnCancelar");

// ------------------ EVENTO GUARDAR ------------------

form.addEventListener("submit", function(e){
    e.preventDefault();

    const id = document.getElementById("idProducto").value;
    const nombre = document.getElementById("nombre").value;
    const marca = document.getElementById("marca").value;
    const precio = document.getElementById("precio").value;
    const cantidad = document.getElementById("cantidad").value;

    if(id){
        const producto = productos.find(p => p.id == id);

        producto.nombre = nombre;
        producto.marca = marca;
        producto.precio = precio;
        producto.cantidad = cantidad;
    }else{
        const nuevoProducto = {
            id: Date.now(),
            nombre: nombre,
            marca: marca,
            precio: precio,
            cantidad: cantidad
        };
        productos.push(nuevoProducto);
    }

    guardar();
    mostrar();
    limpiarFormulario();
});

// ------------------ BOTON CANCELAR ------------------

btnCancelar.addEventListener("click", limpiarFormulario);

// ------------------ FUNCIONES ------------------

function mostrar(){
    tabla.innerHTML = "";

    productos.forEach(p => {
        tabla.innerHTML += `
            <tr>
                <td>${p.nombre}</td>
                <td>${p.marca}</td>
                <td>${p.precio}</td>
                <td>${p.cantidad}</td>
                <td>
                    <button onclick="editar(${p.id})">Editar</button>
                    <button onclick="eliminar(${p.id})">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

function editar(id){
    const producto = productos.find(p => p.id == id);

    document.getElementById("idProducto").value = producto.id;
    document.getElementById("nombre").value = producto.nombre;
    document.getElementById("marca").value = producto.marca;
    document.getElementById("precio").value = producto.precio;
    document.getElementById("cantidad").value = producto.cantidad;
}

function eliminar(id){
    productos = productos.filter(p => p.id != id);
    guardar();
    mostrar();
}

function guardar(){
    localStorage.setItem("productos", JSON.stringify(productos));
}

function limpiarFormulario(){
    form.reset();
    document.getElementById("idProducto").value = "";
}

// ------------------ MOSTRAR AL CARGAR ------------------

mostrar();
