
let PRODUCTOS = '';
const URL_PRODUCTOS = '../js/productos.json';

fetch(URL_PRODUCTOS)
    .then(res => res.json())
    .then(data =>{
        PRODUCTOS = data.map(producto =>{
            const precioFinal = calcularPrecioFinal(producto);
            return { ...producto, precioFinal };
        });
        
        iniciarCandy();
    })
.catch(error => console.log('error al cargar los productos', error));


/* mobile */
const CONTENEDOR_PRODUCTOS = document.getElementById('productos');
const CONTENEDOR_CARRITO_MOBILE = document.getElementById('contenedor-productos-mobile');
const CANTIDAD_PRODUCTO_MOBILE = document.getElementById('cantidad-producto-mobile');
const MOSTRAR_CARRITO_MOBILE = document.getElementById('mostrar-carrito-mobile');
const CONTENEDOR_PRECIO_MOBILE = document.getElementById('contenedor-precios-mobile');
const CONTENEDOR_TOTAL_MOBILE = document.getElementById('contenedor-total-mobile');
const BOTON_PRECIOS_MOBILE = document.getElementById('boton-precios-mobile');
/* desktop */
const CONTENEDOR_CARRITO_DESKTOP = document.getElementById('contenedor-productos-desktop');
const CONTENEDOR_PRECIO_DESKTOP = document.getElementById('contenedor-precios-desktop');
const CONTENEDOR_TOTAL_DESKTOP = document.getElementById('contenedor-total-desktop');
const BOTON_ASIDE_DESKTOP = document.getElementById('aside-carrito-desktop');
const FILTRO_DESKTOP = document.getElementById('filtroAside');

const BOTON_VERTODO = document.getElementById('botonReset');
const CATEGORIAS = document.getElementById('categorias');
const ORDENAR = document.getElementById('ordenar');


const SESION_INICIADA = JSON.parse(localStorage.getItem('sesionIniciada'));
let localStorag = JSON.parse(localStorage.getItem('movie'));

function mostrarNombreyPeliSeleccionada (){

    const CONTENEDOR_IMG = document.getElementById('contenedorImg');
    const CONTENEDOR_NOMBRE = document.getElementById('contenedorNombre');


    if(localStorag){
        CONTENEDOR_IMG.innerHTML = '';
        CONTENEDOR_NOMBRE.innerHTML = '';
    
        
        if(localStorag.img){
            const img = document.createElement("img");
            img.className = "w-40 h-52";
            img.src = `https://image.tmdb.org/t/p/w500/${localStorag.img}`;
            img.alt = `poster promocional de ${localStorag.title}`;
            console.log('IF IMG')
            CONTENEDOR_IMG.appendChild(img);
        }else{            
            const img = document.createElement("img");
            img.className = "w-40 h-52";
            img.src = `../asset/img/wallex.png`;
            img.alt = `img de relleno`;
            console.log('ELSE IMG')
            CONTENEDOR_IMG.appendChild(img);
        }
        
        if(localStorag.title){
            const p = document.createElement('h1');
            p.textContent = `${localStorag.title}`
            console.log('if title')
            CONTENEDOR_NOMBRE.appendChild(p);
        }else{            
            const p = document.createElement('h1');
            p.textContent = 'SELECCIONE UNA PELICULA'
            console.log('else title')
            CONTENEDOR_NOMBRE.appendChild(p);
        }

        /* horario y fecha de la funcion */

        const { funcion } = localStorag;

        if(localStorag.funcion){

            const CONTENEDOR_HORARIO_DESKTOP = document.getElementById('contenedorHorario');
        
            CONTENEDOR_HORARIO_DESKTOP.innerHTML = '';
            
            let horario = document.createElement("p");
            horario.textContent = `${funcion.dia} ${funcion.horario} hs`;
            CONTENEDOR_HORARIO_DESKTOP.appendChild(horario);

            /* parking */

            const parking = localStorag.boletos.find ((ticket) => ticket.nombre.includes("Parking"))

            const CONTENEDOR_LUGAR_DESKTOP = document.getElementById('contenedorLugar');
            CONTENEDOR_LUGAR_DESKTOP.innerHTML = '';
            
            let parkings = document.createElement("p");
            parkings.textContent = parking.nombre;
            CONTENEDOR_LUGAR_DESKTOP.appendChild(parkings);
            
            /*cantidad boletos */

            const CONTENEDOR_BOLETOS = document.getElementById('contenedorBoleto');
            const BOLETOS = localStorag.boletos.filter(boleto => !boleto.nombre.includes("Parking"));

            CONTENEDOR_BOLETOS.innerHTML = '';

            BOLETOS.forEach(producto =>{

                if(producto.tickets > 0){

                    let boletosDiv = document.createElement("div");
                    boletosDiv.className = "flex items-center justify-between gap-4 text-navy-50/50"
                
                    boletosDiv.innerHTML = `                
                    <h2>${producto.nombre} ${producto.tickets > 1 ? `x ${producto.tickets}`: ''}</h2>
                    `    
                    CONTENEDOR_BOLETOS.appendChild(boletosDiv);
                }
            })
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

function iniciarCandy(){
    
    const productoDescendente = (a, b) => a.precioFinal - b.precioFinal;
    const productoAscendente = (a, b) => b.precioFinal - a.precioFinal;

    /* resetea los filtros y muestra todos los productos */ 
    BOTON_VERTODO.addEventListener('click', ()=>{
        CATEGORIAS.selectedIndex = 0;
        cargarProductos(PRODUCTOS);

        if(!BOTON_VERTODO.classList.contains('boton-active')){
            BOTON_VERTODO.classList.add('boton-active');
            CATEGORIAS.classList.remove('bg-violet-700');
            CATEGORIAS.classList.remove('ring-4');
            ORDENAR.classList.remove('bg-violet-700');
            ORDENAR.classList.remove('ring-4');
        }
    })

    /* evento de escucha para los filtros */
    cargarProductos(PRODUCTOS);

    // evento de escucha para los filtros CATEGORIRIAS
    CATEGORIAS.addEventListener('change',()=>{

        // indicadores visuales
        if(ORDENAR.classList.contains('ring-4')){
            ORDENAR.selectedIndex = 0;
            ORDENAR.classList.remove('bg-violet-700');
            ORDENAR.classList.remove('ring-4');
        }

        const productosCategoria = PRODUCTOS.filter(productos => productos.categoria === CATEGORIAS.value);
        cargarProductos(productosCategoria);

        // indicadores visuales
        BOTON_VERTODO.classList.remove('boton-active');
        CATEGORIAS.classList.add('bg-violet-700');
        CATEGORIAS.classList.add('ring-4');
    })

    // evento de escucha para los filtros ORDENAR
    ORDENAR.addEventListener('change',()=>{

        if(CATEGORIAS.classList.contains('ring-4')){
            CATEGORIAS.selectedIndex = 0;
            CATEGORIAS.classList.remove('bg-violet-700');
            CATEGORIAS.classList.remove('ring-4');
        }

        if(ORDENAR.value === 'mayor'){

            const ordenAscendente = PRODUCTOS.slice().sort(productoAscendente);
            console.log('orden de mayor a menor' ,ordenAscendente);
            cargarProductos(ordenAscendente);

            BOTON_VERTODO.classList.remove('boton-active');
            ORDENAR.classList.add('bg-violet-700');
            ORDENAR.classList.add('ring-4');

        }else if(ORDENAR.value === 'menor'){

            const ordenDescendente = PRODUCTOS.slice().sort(productoDescendente);
            console.log('orden de menor a mayor', ordenDescendente);
            cargarProductos(ordenDescendente);

            BOTON_VERTODO.classList.remove('boton-active');
            ORDENAR.classList.add('bg-violet-700');
            ORDENAR.classList.add('ring-4');

        }else{
            cargarProductos(PRODUCTOS);

            BOTON_VERTODO.classList.remove('boton-active');
            ORDENAR.classList.add('bg-violet-700');
            ORDENAR.classList.add('ring-4');
        }
    })
}

//calcula el precio final de los productos que contienen descuentos.
function calcularPrecioFinal(param){

    let precioSinDescuento = param.precio;
    if (param.descuento) 
    {
        let descuentos = (100 - param.porcentajeDescuento) / 100;
        const precioFinal = precioSinDescuento * descuentos;

        return parseFloat(precioFinal.toFixed(2));
    }else
    {        
        const precioFinal = param.precio
        return precioFinal;
    }
}

/* funcion para mostrar todos los productos en la pantalla */
function cargarProductos(product) {

    /* CONTENEDOR_PRODUCTOS.innerHTML = ``; */
   
    const productosDesktop = 10;
    const productosMobile = 5;

    const productosPorPagina = window.innerWidth < 640 ? productosMobile : productosDesktop;

    let paginaActual = 1;

    let totalPaginas = Math.ceil(product.length / productosPorPagina);
    
    const CONTENEDOR_PAGINACION = document.getElementById('contenedorPaginacion')
    const PREV_BOTON = document.getElementById('prevBoton');
    const NEXT_BOTON = document.getElementById('nextBoton');
    
    /* se agregan los botones de la paginacion de forma dinamica */
    CONTENEDOR_PAGINACION.innerHTML = '';
    
    for (let i = 1; i <= totalPaginas; i++){
        const button = document.createElement('button');
        button.value = i;
        button.textContent = i;
        button.classList.add('pg-default');

        if(i===1){
            button.classList.remove('pg-default');
            button.classList.add('pg-active');
        }
        CONTENEDOR_PAGINACION.appendChild(button);
    }
    
    const PAGINACION = CONTENEDOR_PAGINACION.querySelectorAll('button');
    
    /* se agrega un evento de escucha a cada boton para obtener el valor del boton seleccionado y con eso se cambia de pagina y se coloca un indicador visual al boton seleccionado */
    PAGINACION.forEach(btn =>{
        
        btn.addEventListener('click', (e)=>{
            
            PAGINACION.forEach(boton => {
                if(boton.classList.contains('pg-active')){
                    boton.classList.remove('pg-active');
                    boton.classList.add('pg-default');
                }
            });
            
            btn.classList.remove('pg-default');
            btn.classList.add('pg-active');
            
            paginaActual = parseInt(btn.value);
            
            mostrarProductos(product, productosPorPagina, paginaActual);
        })
    });

    PREV_BOTON.addEventListener('click', () => {
        if (paginaActual > 1) {
            paginaActual = paginaActual - 1;
            const botonAnterior = PAGINACION[paginaActual - 1];
            botonAnterior.click();
        }
    });
      
    NEXT_BOTON.addEventListener('click', () => {
        if (paginaActual < PAGINACION.length) {
            PAGINACION[paginaActual].click();
        }        
    });        

    mostrarProductos(product, productosPorPagina, paginaActual);      
}

function mostrarProductos(product, productosPorPagina, paginaActual){

    CONTENEDOR_PRODUCTOS.innerHTML = ``;

    const inicio = (paginaActual - 1) * productosPorPagina;
    const fin = inicio + productosPorPagina;

    const PRODUCTOS_EN_PAGINA = product.slice(inicio, fin);

    PRODUCTOS_EN_PAGINA.forEach(producto =>{

        let div = document.createElement("div");
        div.className = `max-w-[320px] w-[250px] lg:basis-1/3 grow relative`;
        // div.className = `max-w-[320px] w-[250px] lg:basis-1/3 grow relative ${producto.promoSocios ? `order-first` : 'order-last'}`; esta linea ordenaba los productos dependiendo si contienen promo para socios colocandolo primeros pero trae error al momento de utilizar los filtros.

        div.innerHTML = `
        <h4 class="grad rounded-b-lg p-3 w-20 text-center text-white font-bold ml-4 ${producto.descuento ? 'absolute' : 'hidden'} ">${producto.promo}</h4>
        <div class="h-52 bg-navy-700 border-4 border-navy-300 rounded-t-xl flex">
            <img src=${producto.img} alt="imagen productos ${producto.nombre}" class="mx-auto w-48">
        </div>
        <div class="h-52 bg-navy-300 p-2 border-4 border-navy-300 rounded-b-xl text-white">
            <div class="h-2/3 mx-auto mt-1 px-4">
                <h2 class="text-2xl font-bold">${producto.nombre}</h2>
                <p>${producto.descripcion}</p>
            </div>
            <div class="h1/3 w-full flex justify-around items-center mt-1 border-dashed border-navy-150/50 border-t-2 pt-3">
                ${producto.descuento ? `<del class="text-base text-white/70">${producto.precio.toFixed(2)} US$</del> <h3 class="text-xl">${producto.precioFinal.toFixed(2)} US$</h3> ` : `<h3 class="text-xl">${producto.precio.toFixed(2)} US$</h3>`}
                <button ${!SESION_INICIADA && producto.promoSocios ? 'disabled' : ''} onclick="agregarAlCarrito('${producto.id}', '${producto.nombre}', ${producto.descuento? producto.precioFinal : producto.precio})" id="boton${producto.id}" class="boton boton-grad select-none AGREGAR-PRODUCTO">Add</button>
            </div>
        </div>`; 

        CONTENEDOR_PRODUCTOS.appendChild(div);
        
    })

    /* muestra en pantalla el texto de paginacion */
    const TEXTO_PAG = document.getElementById('textoPag');
    const divPag = document.createElement('div');

    let final = Math.min(fin, product.length);

    TEXTO_PAG.innerHTML = "";
    divPag.innerHTML = `
    <p class="text-sm text-gray-700">
    Mostrando
    <span class="font-medium">${inicio + 1}</span>
    a
    <span class="font-medium">${final}</span>
    de
    <span class="font-medium">${product.length}</span>
    resultados
    </p>
    `
    TEXTO_PAG.appendChild(divPag);
}

// agregar productos al localStorage
function agregarAlCarrito (id , nombre, precio) {
    
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const productoEnCarrito = carrito.find(producto => producto.id === id);

    if (productoEnCarrito)
    {
        productoEnCarrito.cantidad++;
    }else
    {
        carrito.push({id, nombre, precio, cantidad: 1});
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    console.log('carrito' + carrito);
    mostrarCarrito();
}


//imprimir carrito en html
function mostrarCarrito(){
    const carrito = JSON.parse(localStorage.getItem('carrito'));

    //Carga los productos que se encuentran en el localStorage y los muestra en pantalla 
    if(carrito && carrito.length > 0){
        CONTENEDOR_CARRITO_MOBILE.innerHTML = '';

        carrito.forEach(producto =>{
            let div = document.createElement("div");
            div.className = "flex items-center m-1 justify-between gap-4 text-sm"

            div.innerHTML = `
            
            <div class="flex gap-4">
                <button onclick="eliminarProducto(${producto.id})"><span class="material-symbols-outlined">delete</span></button>
            </div>

            <div id="listaProductos" class="flex justify-between w-full">
                <h2>${producto.nombre}</h2>
                <h3>US$ ${(producto.precio * producto.cantidad).toFixed(2)}</h3>
            </div>

            <div class="flex">
                <button onclick="restarProductos(${producto.id})" class="border-navy-100 border-solid border rounded-l-full px-2">-</button>
                <span class="border-navy-100 border-solid border-y px-2">${producto.cantidad < 10 ? '0' + producto.cantidad : '' + producto.cantidad }</span>
                <button onclick="sumarProductos(${producto.id})" class="border-navy-100 border-solid border rounded-r-full px-2">+</button>
            </div>
            `

            CONTENEDOR_CARRITO_MOBILE.appendChild(div);
        })
    }else if (carrito && carrito.length === 0){
        CONTENEDOR_CARRITO_MOBILE.innerHTML = '';
        let div = document.createElement("div");
        div.innerHTML = '<h2 class="text-center">¡Oops! Parece que tu carrito está vacio</h2>';
        CONTENEDOR_CARRITO_MOBILE.appendChild(div);
    }

    //Carga los productos y los muestra en la pantalla desktop
    if(carrito && carrito.length > 0){
        CONTENEDOR_CARRITO_DESKTOP.innerHTML = '';

        carrito.forEach(producto =>{
            let div = document.createElement("div");
            div.className = "flex items-center m-1 justify-between gap-4 text-sm"

            div.innerHTML = `
            
            <div class="flex gap-4">
                <button onclick="eliminarProducto(${producto.id})"><span class="material-symbols-outlined">delete</span></button>
            </div>

            <div id="listaProductos" class="flex justify-between w-full">
                <h2>${producto.nombre}</h2>
                <h3>US$ ${(producto.precio * producto.cantidad).toFixed(2)}</h3>
            </div>

            <div class="flex">
                <button onclick="restarProductos(${producto.id})" class="border-navy-100 border-solid border rounded-l-full px-2">-</button>
                <span class="border-navy-100 border-solid border-y px-2">${producto.cantidad < 10 ? '0' + producto.cantidad : '' + producto.cantidad }</span>
                <button onclick="sumarProductos(${producto.id})" class="border-navy-100 border-solid border rounded-r-full px-2">+</button>
            </div>
            `

            CONTENEDOR_CARRITO_DESKTOP.appendChild(div);
        })
    }else if (carrito && carrito.length === 0){
        CONTENEDOR_CARRITO_DESKTOP.innerHTML = '';
        let div = document.createElement("div");
        div.innerHTML = '<h2 class="text-center text-navy-150 mt-2">Los productos que agregues aparecerán aquí</h2>';
        CONTENEDOR_CARRITO_DESKTOP.appendChild(div);
    }

    mostrarPreciosMobile();
    mostrarPreciosDesktop();
    actualizarCantidadProductos();
}

/* funciones para sumar restar y eliminar productos en el carrito */

function restarProductos (id){
    let carrito = JSON.parse(localStorage.getItem('carrito'));

    if (carrito && carrito.length > 0){

        let productoIndex = carrito.findIndex(producto => producto.id == id);
        if (productoIndex !==-1 && carrito[productoIndex].cantidad > 0) {

            carrito[productoIndex].cantidad--;

            if (carrito[productoIndex].cantidad === 0){
                carrito.splice(productoIndex, 1);
            }

            localStorage.setItem('carrito', JSON.stringify(carrito));
            mostrarCarrito();
        }
    }    
}
function sumarProductos (id){
    let carrito = JSON.parse(localStorage.getItem('carrito'));
    let productoIndex = carrito.findIndex(producto => producto.id == id);
    if (productoIndex !==-1 && carrito[productoIndex].cantidad > 0) {
                
        carrito[productoIndex].cantidad++;

        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarCarrito();
    } 
}

function actualizarCantidadProductos() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];  
    
    CANTIDAD_PRODUCTO_MOBILE.innerHTML = '';
    let div = document.createElement("div");
    div.innerHTML =` <h2> ${carrito.length} </h2> `
    CANTIDAD_PRODUCTO_MOBILE.appendChild(div);    
}

function eliminarProducto(id){
    let carrito = JSON.parse(localStorage.getItem('carrito'));
    let productoIndex = carrito.findIndex(producto => producto.id == id);
    
    carrito.splice(productoIndex, 1);
        
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();        
}

function mostrarPreciosMobile(){
    const carrito = JSON.parse(localStorage.getItem('carrito'));
    const totalCarrito = carrito ? carrito.reduce((acu, producto)=> acu + (producto.precio * producto.cantidad), 0) : 0;

    CONTENEDOR_PRECIO_MOBILE.innerHTML = '';

    let div = document.createElement("div");
    div.className = "text-white bg-navy-300 border-y border-dashed border-navy-100 px-4 p-2"

    div.innerHTML =`
    <div class="text-white font-semibold p-1 flex justify-between">
        <h3>SUBTOTAL</h3>
        <h4>US$ ${totalCarrito.toFixed(2)}</h4>
    </div>
    <div class="text-white font-semibold p-1 flex justify-between">
        <h3>CARGO POR SERVICIO</h3>
        <h4>US$ 1.00</h4>
    </div>
    `

    CONTENEDOR_PRECIO_MOBILE.appendChild(div);
    CONTENEDOR_TOTAL_MOBILE.innerHTML ='';

    let total = document.createElement("div");
    total.className = "flex justify-between items-center text-white w-full px-4 pb-4"

    total.innerHTML = `
    <div class="text-xl w-1/2 font-semibold flex flex-wrap justify-around">
        <h3>TOTAL</h3>
        <h4>US$ ${totalCarrito > 1 ? (totalCarrito + 1).toFixed(2) : totalCarrito.toFixed(2)}</h4>
    </div>
    <div class="text-center w-1/2">
        <button onclick="advertenciaElijaPeli()" class="boton boton-grad">SIGUIENTE</button>
    </div>
    `
    //<button href="./checkout.html" class="boton boton-grad">COMPRAR</button>
    CONTENEDOR_TOTAL_MOBILE.appendChild(total);   
}

function advertenciaElijaPeli(){
    console.log(localStorag)
    if (localStorag && localStorag.funcion){
        window.location.href = "/pages/checkout.html";
    }
    if(!localStorag.title){
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
    if(!localStorag.funcion){
        Swal.fire({
            title: "Oops...",
            text: "Seleccione día y horario de la función para continuar",
            icon: "error",
            confirmButtonColor: "#7d78ff",
            confirmButtonText: "Conseguir entradas"
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "/pages/tickets.html";
            }
          }); 
    }    
}

function mostrarPreciosDesktop(){
    const carrito = JSON.parse(localStorage.getItem('carrito'));
    const totalCarrito = carrito? carrito.reduce((acu, producto)=> acu + (producto.precio * producto.cantidad), 0) : 0;

    CONTENEDOR_PRECIO_DESKTOP.innerHTML = '';

    let div = document.createElement("div");
    div.className = "text-white bg-navy-300 border-y border-dashed border-navy-100 p-4"

    div.innerHTML =`
    <div class="text-white font-semibold p-1 flex justify-between">
        <h3>SUBTOTAL</h3>
        <h4>US$ ${totalCarrito.toFixed(2)}</h4>
    </div>
    <div class="text-white font-semibold p-1 flex justify-between">
        <h3>CARGO POR SERVICIO</h3>
        <h4>US$ 1.00</h4>
    </div>
    `

    CONTENEDOR_PRECIO_DESKTOP.appendChild(div);
    CONTENEDOR_TOTAL_DESKTOP.innerHTML ='';

    let precioTotal = document.createElement("div");
    precioTotal.className = "text-3xl font-semibold flex justify-around"

    precioTotal.innerHTML = `
    <h3>TOTAL</h3>
    <h4>US$ ${totalCarrito > 1 ? (totalCarrito + 1).toFixed(2) : totalCarrito.toFixed(2)}</h4>
    `
    CONTENEDOR_TOTAL_DESKTOP.appendChild(precioTotal);

}

/* funciones para mostrar y ocultar cuando se hace click en algun boton */

BOTON_PRECIOS_MOBILE.addEventListener('click',(e)=>{
    e.preventDefault();

    CONTENEDOR_PRECIO_MOBILE.classList.toggle('hidden');
    botonPrecioMobile();
})

MOSTRAR_CARRITO_MOBILE.addEventListener('click', (e)=>{
    e.preventDefault();

    CONTENEDOR_CARRITO_MOBILE.classList.toggle('hidden');

})

function botonPrecioMobile(){

    if(CONTENEDOR_PRECIO_MOBILE.classList.contains('hidden')){
        BOTON_PRECIOS_MOBILE.innerHTML= `<span class="material-symbols-outlined">keyboard_double_arrow_up</span>`;
    }else{
        BOTON_PRECIOS_MOBILE.innerHTML=`<span class="material-symbols-outlined">keyboard_double_arrow_down</span>`;
    }
}

function desplegarCarrito(){
    CONTENEDOR_CARRITO_DESKTOP.classList.toggle('max-h-[100px]');
    CONTENEDOR_CARRITO_DESKTOP.classList.toggle('overflow-hidden');
    
    if(CONTENEDOR_CARRITO_DESKTOP.classList.contains('max-h-[100px]' && 'overflow-hidden')){
        BOTON_ASIDE_DESKTOP.innerHTML= `<span class="material-symbols-outlined">keyboard_double_arrow_down</span>`;        
    }else{
        BOTON_ASIDE_DESKTOP.innerHTML=`<span class="material-symbols-outlined">keyboard_double_arrow_up</span>`;        
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

mostrarNombreyPeliSeleccionada();
actualizarCantidadProductos();
mostrarCarrito();
botonPrecioMobile();