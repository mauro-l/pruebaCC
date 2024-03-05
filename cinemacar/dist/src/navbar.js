function menuHamburguesas(){
    const MENU_MOBILE = document.getElementById('mobileMenu');
    MENU_MOBILE.classList.toggle('hidden');
}

const SESION = document.getElementById('inicioSesionDinamico');
const BOTON_CERRAR_SESION = document.getElementById('btn-dropdown');
const rutaBase = window.location.pathname.includes("index.html") ? "./pages/" : "./";

let div = document.createElement('div');
div.className = `flex gap-3`;

const datosLocalStorage = JSON.parse(localStorage.getItem("sesionIniciada"));
if(datosLocalStorage){
    div.innerHTML = `
        <h2 class="items-center flex">${datosLocalStorage.nombre}</h2>
        <button onclick="dropdown()"><span class="material-symbols-outlined items-center flex">arrow_drop_down</span></button>
    `
    SESION.appendChild(div);
}else{
    div.innerHTML = `
        <h2><a href="${rutaBase}login.html">Login</a></h2>
        <span class="material-symbols-outlined">account_circle</span>
    `
    SESION.appendChild(div);
}

function dropdown(){
    BOTON_CERRAR_SESION.classList.toggle('hidden');
}
function cerrarSesion(){
    localStorage.removeItem("sesionIniciada");
    location.reload();
}

const LISTA_MENU = document.getElementById('listaMenu');

const sesionMobile = document.createElement("li");
const cerrarSesionMobile = document.createElement('li');
const primerElemento = LISTA_MENU.firstChild;

if(datosLocalStorage){
    sesionMobile.className = "flex flex-col";
    sesionMobile.innerHTML = `
    <li class="flex flex-col mb-4"><span class="material-symbols-outlined flex justify-center">account_circle</span><h2>${datosLocalStorage.nombre}</h2></li>
    `
    cerrarSesionMobile.innerHTML= `<button onclick="cerrarSesion()" class="mt-6"><p>Cerrar Sesion</p></button>`
    LISTA_MENU.insertBefore(sesionMobile, primerElemento);
    LISTA_MENU.appendChild(cerrarSesionMobile)
}else{
    sesionMobile.innerHTML = `<a href="${rutaBase}login.html">Login</a>`
    LISTA_MENU.appendChild(sesionMobile);
}

function mostrarFecha(){
    const fechaActual = new Date();

    const options = {
        weekday: 'long',
        month: 'short',
        day: '2-digit',
        year: 'numeric'
    };

    const fechaFormateada = fechaActual.toLocaleDateString('en-US', options);

    const FECHA_ACTUAL = document.getElementById('fecha');
    const fecha = document.createElement('h2');
    
    fecha.className = "uppercase"
    fecha.textContent = fechaFormateada;

    FECHA_ACTUAL.appendChild(fecha);

}

mostrarFecha();