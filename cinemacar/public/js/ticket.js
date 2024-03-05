
let ENTRADAS = [
    {nombre:'Entrada General', tickets: 0, precio: 3, id: 'general'},
    {nombre:'Entrada Niños', tickets: 0, precio: 1, id: 'chicos'},
    {nombre:'Pack Familia', tickets: 0, precio: 8, id: 'familia'},
    {nombre:'Entrada Jubilados', tickets: 0, precio: 2, id: 'viejos'},
    {nombre:'Parking General', tickets: 0, precio: 3, id: 'parking'},
    {nombre:'Parking VIP Estándar', tickets: 0, precio: 5, id: 'vip'},
    {nombre:'Parking VIP SUV', tickets: 0, precio: 8, id: 'suv'}
]

const BOTONES_MOSTRAR = document.querySelectorAll(".BOTONES-MOSTRAR");
const CONTENEDOR_CARRITO_DESKTOP = document.getElementById('contenedor-productos-desktop');
const BOTON_ASIDE_DESKTOP = document.getElementById('aside-carrito-desktop');
const SECCION_LOGIN = document.getElementById('seccionLogin');
const ASIDE_INFO_PELICULA = document.getElementById('contenedorInfo');
const seccionHorario = document.getElementById('seccionHorario');
const seccionLugar = document.getElementById('seccionLugar');
const seccionPrecio = document.getElementById('seccionPrecio');
const seccionInfo = document.getElementById('seccionInfo');

//Si el usuario a iniciado sesion muestra la info del usuario sino le indica que inicie sesion.
function sesionInfo(){

    const datosLocalStorage = JSON.parse(localStorage.getItem('sesionIniciada'));
    
    let div = document.createElement('div');
    
    if(datosLocalStorage){
        
        div.innerHTML = `
        <div>
            <h3 class="text-2xl pb-4 font-bold">Bienvenido ${datosLocalStorage.nombre}!</h3>
            <p class="text-navy-150">¡Gracias por formar parte de CinemaFan!</p>                        
            <p class="text-navy-150">Como socio, disfrutas de un 20% de descuento en toda nuestra cartelera!</p>
        </div>       
        `

    }else{
        div.innerHTML = `
        <div>
            <h3 class="text-2xl pb-4 font-bold">Ya eres miembro de CinemaFan?</h3>
            <p class="text-navy-150">Inicia sesión para reservar y acceder a nuestras exclusivas ofertas y descuentos.</p>                        
        </div>
        <div><a href="./login.html" class="flex flex-wrap justify-center md:justify-end items-center gap-2"><span class="material-symbols-outlined rounded-full p-1 grad text-navy-50 text-center">person</span><p>Inicia Sesion</p></a></div>
        `
    }

    SECCION_LOGIN.appendChild(div);

}

function toasty(text){
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "error",
        title: text
      });
}

function mostrarContenido(param){
    BOTONES_MOSTRAR.forEach(seccion => seccion.classList.contains('hidden') ? '' : seccion.classList.add('hidden'));
    param.classList.remove('hidden');
}

const INFO_FUNCION = document.getElementById('contenedorInfo');

let datosFuncion = {
    dia:'',
    horario:''
}

let localStorag = JSON.parse(localStorage.getItem('movie'));

function mostrarNombreyPeliSeleccionada (){

    const CONTENEDOR_IMG = document.getElementById('contenedorImg');
    const CONTENEDOR_NOMBRE = document.getElementById('contenedorNombre');

    if (!localStorag) {
        localStorag = []; // Si localStorag es null, asignar un array vacío
    }
    if(Object.keys(localStorag).length > 0){

        CONTENEDOR_IMG.innerHTML = '';
        CONTENEDOR_NOMBRE.innerHTML = '';
    
        if(localStorag.img){
            const img = document.createElement("img");
            img.className = "w-40 h-52";
            img.src = `https://image.tmdb.org/t/p/w500/${localStorag.img}`;
            img.alt = `poster promocional de ${localStorag.title}`;

            CONTENEDOR_IMG.appendChild(img);
        }else{            
            const img = document.createElement("img");
            img.className = "w-40 h-52";
            img.src = `../asset/img/wallex.png`;
            img.alt = `img de relleno`;

            CONTENEDOR_IMG.appendChild(img);
        }
        
        if(localStorag.title){
            const p = document.createElement('h1');
            p.textContent = `${localStorag.title}`

            CONTENEDOR_NOMBRE.appendChild(p);
        }else{            
            const a = document.createElement('a');
            a.className = "underline underline-offset-2"
            a.textContent = 'SELECCIONE UNA PELICULA'
            a.href = "../index.html#inicioCartelera"

            CONTENEDOR_NOMBRE.appendChild(a);
        }
    }else{

        const img = document.createElement("img");
        img.className = "w-40 h-52";
        img.src = `../asset/img/wallex.png`;
        img.alt = `img de relleno`;
        console.log('ELSE IMG')
        CONTENEDOR_IMG.appendChild(img);
        
        const a = document.createElement('a');
        a.className = "underline underline-offset-2"
        a.textContent = 'SELECCIONE UNA PELICULA'
        a.href = "../index.html#inicioCartelera"

        CONTENEDOR_NOMBRE.appendChild(a);
    }
}
function mostrarNombreyPeliSeleccionadaMobile (){
    
    const CONTENEDOR_IMG_MOBILE = document.getElementById('contenedorImgMobile');
    const CONTENEDOR_NOMBRE_MOBILE = document.getElementById('contenedorNombreMobile');

    let localStorag = JSON.parse(localStorage.getItem('movie'));
    if (!localStorag) {
        localStorag = []; // Si localStorag es null, asignar un array vacío
    }
    if(Object.keys(localStorag).length > 0){

        CONTENEDOR_IMG_MOBILE.innerHTML = '';
        CONTENEDOR_NOMBRE_MOBILE.innerHTML = '';
    
        if(localStorag.img){
            const img = document.createElement("img");
            img.className = "w-40 h-52";
            img.src = `https://image.tmdb.org/t/p/w500/${localStorag.img}`;
            img.alt = `poster promocional de ${localStorag.title}`;

            CONTENEDOR_IMG_MOBILE.appendChild(img);
        }else{            
            const img = document.createElement("img");
            img.className = "w-40 h-52";
            img.src = `../asset/img/wallex.png`;
            img.alt = `img de relleno`;

            CONTENEDOR_IMG_MOBILE.appendChild(img);
        }
        
        if(localStorag.title){
            const p = document.createElement('h1');
            p.textContent = `${localStorag.title}`

            CONTENEDOR_NOMBRE_MOBILE.appendChild(p);
        }else{            
            const a = document.createElement('a');
            a.className = "underline underline-offset-2"
            a.textContent = 'SELECCIONE UNA PELICULA'
            a.href = "../index.html#inicioCartelera"

            CONTENEDOR_NOMBRE_MOBILE.appendChild(a);
        }
    }else{

        const img = document.createElement("img");
        img.className = "w-40 h-52";
        img.src = `../asset/img/wallex.png`;
        img.alt = `img de relleno`;
        console.log('ELSE IMG')
        CONTENEDOR_IMG_MOBILE.appendChild(img);
        
        const a = document.createElement('a');
        a.className = "underline underline-offset-2"
        a.textContent = 'SELECCIONE UNA PELICULA'
        a.href = "../index.html#inicioCartelera"

        CONTENEDOR_NOMBRE_MOBILE.appendChild(a);
    }
}

function guardarDatos (){

    const FECHA_FUNCIONES = document.getElementById('fechasFunciones');
    const HORARIO_FUNCIONES = document.getElementById('horariosFunciones');

    datosFuncion.dia = FECHA_FUNCIONES.value;
    datosFuncion.horario = HORARIO_FUNCIONES.value;

    if (FECHA_FUNCIONES.value != "Seleccione Día..." && HORARIO_FUNCIONES.value != "Seleccione Función..."){
        const BTN = document.getElementById('horariosBtn');
        seccionHorario.classList.add('hidden');    
        BTN.innerHTML = "<p>Modificar</p>";
        seccionLugar.classList.remove('hidden');
    
        mostrarListadoHorarios();
    }else{
        toasty("Seleccione el dia y la Funcion para continuar");
    }    
}

function mostrarListadoHorarios (){
    const CONTENEDOR_HORARIO_DESKTOP = document.getElementById('contenedorHorario');
    const CONTENEDOR_HORARIO_MOBILE = document.getElementById('contenedorHorarioMobile');

    /* DESKTOP */
    CONTENEDOR_HORARIO_DESKTOP.innerHTML = '';
    
    let p = document.createElement("p");
    p.textContent = `${datosFuncion.dia} ${datosFuncion.horario} hs`;
    CONTENEDOR_HORARIO_DESKTOP.appendChild(p);

    /* MOBILE */
    CONTENEDOR_HORARIO_MOBILE.innerHTML = '';
    
    let div = document.createElement("p");
    div.textContent = `${datosFuncion.dia} ${datosFuncion.horario} hs`;
    CONTENEDOR_HORARIO_MOBILE.appendChild(div);
}


let datosLugar;

/* CAPTURA EL LUGAR SELECCIONADO POR EL USUARIO Y LO GUARDA EN LA VARIABLE DATOSLUGAR */ 
function guardarLugar(nombre, precio, id){
    datosLugar = {nombre: nombre, precio: precio, id: id};
    
    const BTN = document.getElementById('lugarBtn');
    seccionLugar.classList.add('hidden');
    BTN.innerHTML = "<p>Modificar</p>";
    seccionPrecio.classList.remove('hidden');

    const LUGAR = ENTRADAS.findIndex((elemento) => elemento.nombre === datosLugar.nombre);
    let count = 0;
    ENTRADAS.forEach(element => {
        count++;

        if (element.tickets > 0 && ['parking', 'vip', 'suv'].includes(element.id)) {
            console.log('borra ticket')
            ENTRADAS[count -1].tickets = 0;
        }
    });

    ENTRADAS[LUGAR].tickets ++;
    mostrarResumenCompra();
    mostarListadoLugar();
    actualizarCantidadProductos();
}

function mostrarLeyendaTickets(){
    const todosTicketsEnCero = ENTRADAS.every(producto => producto.tickets === 0);
    if(todosTicketsEnCero){
        let div = document.createElement("div");
        div.innerHTML = '<h2 class="text-center text-navy-150 mt-2">Los boletos que selecciones aparecerán aquí</h2>';
        CONTENEDOR_CARRITO_DESKTOP.appendChild(div);
        BOTON_ASIDE_DESKTOP.classList.add('hidden');
    }
}

/* CAPTURA LOS BOLETOS SELECCIONADO POR EL USUARIO Y LO GUARDA EN EL ARRAY ENTRADAS */ 
function guardarTickets(){
    const GENERAL = document.getElementById('general').value;
    const CHICOS = document.getElementById('chicos').value;
    const FAMILIA = document.getElementById('familia').value;
    const JUBILADOS = document.getElementById('viejos').value;

    ENTRADAS[0].tickets = parseInt(GENERAL);
    ENTRADAS[1].tickets = parseInt(CHICOS);
    ENTRADAS[2].tickets = parseInt(FAMILIA);
    ENTRADAS[3].tickets = parseInt(JUBILADOS);

    const BTN = document.getElementById('ticketBtn');
    seccionPrecio.classList.add('hidden');
    BTN.innerHTML = "<p>Modificar</p>";
    seccionInfo.classList.remove('hidden');

    mostrarResumenCompra();
    actualizarCantidadProductos();
}

/* ACTUALIZA LA INTERFAZ DEL CARRITO AGREGANDO LA SELECCION DE TICKETS DEL USUARIO EN UNA LISTA  */
function mostrarResumenCompra (){

    //desktop
    CONTENEDOR_CARRITO_DESKTOP.innerHTML = '';

    ENTRADAS.forEach(producto =>{
        
        if(producto.tickets > 0){

            let div = document.createElement("div");
            div.className = "flex items-center m-1 justify-between gap-4 text-sm"
    
            div.innerHTML = `            
            <div class="flex gap-4">
                <button onclick="eliminarTicket(${producto.id})"><span class="material-symbols-outlined">delete</span></button>
            </div>
    
            <div class="flex justify-between w-full">
                <h2>${producto.nombre} ${producto.tickets > 1 ? `x ${producto.tickets}`: ''}</h2>
                <h3>US$ ${(producto.precio * producto.tickets).toFixed(2)}</h3>
            </div>
            `
    
            CONTENEDOR_CARRITO_DESKTOP.appendChild(div);
            BOTON_ASIDE_DESKTOP.classList.remove('hidden');
        }
    })
    listadoBoletos();
    mostrarResumenCompraMobile();
    mostrarPreciosMobile();
}
function mostrarResumenCompraMobile (){
    
    const CONTENEDOR_CARRITO_MOBILE = document.getElementById('contenedor-productos-mobile');
    CONTENEDOR_CARRITO_MOBILE.innerHTML = '';

    ENTRADAS.forEach(producto =>{
            
        if(producto.tickets > 0){

            let div = document.createElement("div");
            div.className = "flex items-center m-1 justify-between gap-4 text-sm"
    
            div.innerHTML = `            
            <div class="flex gap-4">
                <button onclick="eliminarTicket(${producto.id})"><span class="material-symbols-outlined">delete</span></button>
            </div>
    
            <div class="flex justify-between w-full">
                <h2>${producto.nombre} ${producto.tickets > 1 ? `x ${producto.tickets}`: ''}</h2>
                <h3>US$ ${(producto.precio * producto.tickets).toFixed(2)}</h3>
            </div>
            `    
            CONTENEDOR_CARRITO_MOBILE.appendChild(div);
        }
    })

    mostrarPreciosMobile();
    mostrarPreciosDesktop();
}

function listadoBoletos (){

    const BOLETOS = ENTRADAS.slice(0, 4);
    const CONTENEDOR_BOLETOS = document.getElementById('contenedorBoleto');
    
    CONTENEDOR_BOLETOS.innerHTML = '';

    BOLETOS.forEach(producto =>{
        
        if(producto.tickets > 0){

            let div = document.createElement("div");
            div.className = "flex items-center justify-between gap-4 text-navy-50/70 text-sm"
    
            div.innerHTML = `                
            <h2>${producto.nombre} ${producto.tickets > 1 ? `x ${producto.tickets}`: ''}</h2>
            `    
            CONTENEDOR_BOLETOS.appendChild(div);
        }
    })
}

/* ACTUALIZA LA CANTIDAD DE TICKETS EN EL CARRITO MOBILE */
function actualizarCantidadProductos() {
    let sumaTickets = ENTRADAS.reduce((total, entrada) => total + entrada.tickets, 0);

    const CANTIDAD_PRODUCTO_MOBILE = document.getElementById('cantidad-producto-mobile');
    CANTIDAD_PRODUCTO_MOBILE.innerHTML = '';
    let div = document.createElement("div");
    div.innerHTML =` <h2>  ${sumaTickets} </h2> `
    CANTIDAD_PRODUCTO_MOBILE.appendChild(div);    
}

/* MUESTRA UN RESUMEN DE LA ELECCION DEL USUARIO */
function mostarListadoLugar(){
    
    const CONTENEDOR_LUGAR_DESKTOP = document.getElementById('contenedorLugar');
    const CONTENEDOR_LUGAR_MOBILE = document.getElementById('contenedorLugarMobile');
    
    /* MOBILE */    
    CONTENEDOR_LUGAR_MOBILE.innerHTML = '';
    
    if(datosLugar){
        let p = document.createElement("p");
        p.textContent = datosLugar.nombre;
        CONTENEDOR_LUGAR_MOBILE.appendChild(p);
    }
    
    /* DESKTOP */
    
    CONTENEDOR_LUGAR_DESKTOP.innerHTML = '';
    
    if(datosLugar){
        let p = document.createElement("p");
        p.textContent = datosLugar.nombre;
        CONTENEDOR_LUGAR_DESKTOP.appendChild(p);
    }
}

/* FUNCION PARA ELIMINAR LA SELECCION DEL USUARIO, LO ELIMINA TANTO VISUALMENTE COMO DE SUS RESPECTIVOS ARRAY */
function eliminarTicket(param){
    const BOLETOS = ENTRADAS.find(elemento => elemento.id === param.id);
    if(datosLugar && param.id === datosLugar.id){
        datosLugar = undefined;
    }
    param.value = 0;
    BOLETOS.tickets = 0;
    
    mostrarResumenCompra();
    mostrarLeyendaTickets();
    mostarListadoLugar();
    actualizarCantidadProductos();
}

function mapa(){
    Swal.fire({
        title: "Mapa del predio",
        imageUrl: "../asset/img/MAPA.png",
        imageWidth: 800,
        imageHeight: 300,
        imageAlt: "mapa del predio"
      });
}

/* SECCION MOBILE */

const MOSTRAR_CARRITO_MOBILE = document.getElementById('mostrar-carrito-mobile');
const CONTENEDOR_PRECIO_MOBILE = document.getElementById('contenedor-precios-mobile');
const CONTENEDOR_TOTAL_MOBILE = document.getElementById('contenedor-total-mobile');
const BOTON_PRECIOS_MOBILE = document.getElementById('boton-precios-mobile');

function desplegarCarrito(){
    CONTENEDOR_CARRITO_DESKTOP.classList.toggle('max-h-[70px]');
    CONTENEDOR_CARRITO_DESKTOP.classList.toggle('overflow-hidden');
    
    if(CONTENEDOR_CARRITO_DESKTOP.classList.contains('max-h-[70px]' && 'overflow-hidden')){
        BOTON_ASIDE_DESKTOP.innerHTML= `<span class="material-symbols-outlined text-navy-150">keyboard_double_arrow_down</span>`;        
    }else{
        BOTON_ASIDE_DESKTOP.innerHTML=`<span class="material-symbols-outlined text-navy-150">keyboard_double_arrow_up</span>`;        
    }
}

MOSTRAR_CARRITO_MOBILE.addEventListener('click', (e)=>{
    const CONTENEDOR_CARRITO_MOBILE = document.getElementById('contenedor-productos-mobile');
    e.preventDefault();

    CONTENEDOR_CARRITO_MOBILE.classList.toggle('hidden');

    let sumaTickets = ENTRADAS.reduce((total, entrada) => total + entrada.tickets, 0);
    if(sumaTickets === 0){
        CONTENEDOR_CARRITO_MOBILE.innerHTML = '';
        let div = document.createElement("div");
        div.innerHTML = '<h2 class="text-center">¡Oops! Parece que tu carrito está vacio</h2>';
        CONTENEDOR_CARRITO_MOBILE.appendChild(div);
    }
})

function mostrarPreciosMobile(){
    //const carrito = JSON.parse(localStorage.getItem('carrito'));
    const totalCarrito = ENTRADAS.reduce((acu, producto)=> acu + (producto.precio * producto.tickets), 0);

    CONTENEDOR_TOTAL_MOBILE.innerHTML ='';

    let total = document.createElement("div");
    total.className = "flex justify-between items-center text-white w-full px-4 pb-4"

    total.innerHTML = `
    <div class="text-xl w-1/2 font-semibold flex flex-wrap justify-around">
        <h3>TOTAL</h3>
        <h4>US$ ${totalCarrito.toFixed(2)}</h4>
    </div>
    <div class="text-center w-1/2">
        <button onclick="agregarAlLocalStorage()" class="boton boton-grad">COMPRAR</button>
    </div>
    `
    CONTENEDOR_TOTAL_MOBILE.appendChild(total);   
}
function mostrarPreciosDesktop(){
    /* sumatoria parcial */
    let sumaSubtotal = ENTRADAS.slice(-3);
    let sumaParking = sumaSubtotal.reduce((total, entrada) => total + (entrada.tickets * entrada.precio), 0);
    let sumaTickets = ENTRADAS.slice(0, 4).reduce((total, entrada) => total + (entrada.tickets * entrada.precio), 0);
    
    const PARKING_SUBTOTAL = document.getElementById('parkingSubtotal');
    const BOLETO_SUBTOTAL = document.getElementById('boletoSubtotal');

    PARKING_SUBTOTAL.textContent = '';
    BOLETO_SUBTOTAL.textContent = '';
    
    PARKING_SUBTOTAL.textContent = `US$ ${sumaParking.toFixed(2)}`;
    BOLETO_SUBTOTAL.textContent = `US$ ${sumaTickets.toFixed(2)}`;
    
    /* sumatoria total */
    const totalCarrito = ENTRADAS.reduce((acu, producto)=> acu + (producto.precio * producto.tickets), 0);
    
    const TOTAL_ACUMULADO = document.getElementById('totalFinal');
    
    TOTAL_ACUMULADO.textContent ='';

    TOTAL_ACUMULADO.textContent = `US$ ${totalCarrito.toFixed(2)}`;    
}

function botonPrecioMobile(){

    if(CONTENEDOR_PRECIO_MOBILE.classList.contains('hidden')){
        BOTON_PRECIOS_MOBILE.innerHTML= `<span class="material-symbols-outlined">keyboard_double_arrow_up</span>`;
    }else{
        BOTON_PRECIOS_MOBILE.innerHTML=`<span class="material-symbols-outlined">keyboard_double_arrow_down</span>`;
    }
}

function flechaBtnMobile(){
    BOTON_PRECIOS_MOBILE.addEventListener('click',(e)=>{
        e.preventDefault();
    
        CONTENEDOR_PRECIO_MOBILE.classList.toggle('hidden');
        botonPrecioMobile();
    })
}

function agregarAlLocalStorage(){

    if (localStorag){
        if(datosFuncion.dia && datosFuncion.horario){
            if(datosLugar){
                const BOLETOS = ENTRADAS.slice(0, 4);
                console.log('boletos datos lugar: ', BOLETOS)
                const entradasConMasDeUnTicket = BOLETOS.some(entrada => entrada.tickets > 0);
                if(entradasConMasDeUnTicket)
                {
                    const boletosFinal = ENTRADAS.filter(entrada => entrada.tickets > 0);

                    let datosAnteriores = JSON.parse(localStorage.getItem('movie'));
                    datosAnteriores = { ...datosAnteriores, funcion: datosFuncion, boletos: boletosFinal };

                    localStorage.setItem('movie', JSON.stringify(datosAnteriores));
                    console.log(datosAnteriores);
                    window.location.href = '/pages/candy.html';
                }else{
                    toasty("Seleccione las entradas!!");
                    mostrarContenido(seccionPrecio);
                }
            }else{
                toasty("Seleccione el lugar para continuar");
                mostrarContenido(seccionLugar);
            }
        }else{
            toasty("Seleccione el dia y la Funcion para continuar");
            mostrarContenido(seccionHorario);
        }
    }else{
        advertenciaElijaPeli();
    }
}

function advertenciaElijaPeli(){
    
    if (!localStorag){
        Swal.fire({
          title: "Oops...",
          text: "Seleccione una película para continuar",
          icon: "error",
          confirmButtonColor: "#7d78ff",
          confirmButtonText: "Ir a cartelera"
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/index.html#inicioCartelera";
          }
        });
    }    
}

/* solucion parcial a la superposicion entre el carrito mobile y el carrito de precio final */
const elementToObserve = document.getElementById('elementToObserve');
function handleScroll() {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const triggerPoint = windowHeight * 0.25;
    
    if (scrollPosition > triggerPoint) {
        // Si el usuario ha scrollado más del 25%, haz el elemento visible
        elementToObserve.classList.remove('hidden');
    } else {
        // Si no, mantiene la opacidad en 0
        elementToObserve.classList.add('hidden');
    }
}
// Agrega un listener para el evento de scroll
window.addEventListener('scroll', handleScroll);
// Llama a handleScroll al cargar la página para manejar la posición inicial
handleScroll();

advertenciaElijaPeli();
mostrarNombreyPeliSeleccionada();
mostrarNombreyPeliSeleccionadaMobile();
actualizarCantidadProductos();
mostrarLeyendaTickets();
sesionInfo();
mostrarPreciosMobile();
mostrarPreciosDesktop();
botonPrecioMobile();
flechaBtnMobile();