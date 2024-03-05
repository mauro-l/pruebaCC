
const SESION_INICIADA = JSON.parse(localStorage.getItem('sesionIniciada'));

//Si el usuario a iniciado sesion muestra la info del usuario sino le indica que inicie sesion.
function sesionInfo(){

    const SECCION_LOGIN = document.getElementById('seccionLogin')
    const SECCION_INVITADO = document.getElementById('seccionDatosUsuario');
    
    let div = document.createElement('div');

    if(SESION_INICIADA){
        
        div.innerHTML = `
        <div>
            <h3 class="text-2xl pb-4 font-bold">Bienvenido ${SESION_INICIADA.nombre}!</h3>
            <p class="text-navy-150">¡Gracias por formar parte de CinemaFan!</p>                        
            <p class="text-navy-150">Como socio, disfrutas de un 20% de descuento en toda nuestra cartelera!</p>
        </div>       
        `
        SECCION_INVITADO.classList.contains('hidden') ? console.log('') : SECCION_INVITADO.classList.add('hidden');

    }else{
        div.innerHTML = `
        <div>
            <h3 class="text-2xl pb-4 font-bold">Ya eres miembro de CinemaFan?</h3>
            <p class="text-navy-150">Inicia sesión para reservar y acceder a nuestras exclusivas ofertas y descuentos.</p>                        
        </div>
        <div><a href="./login.html" class="flex flex-wrap justify-center md:justify-end md:mt-4 items-center gap-2"><span class="material-symbols-outlined rounded-full p-1 grad text-navy-50 text-center">person</span><p>Inicia Sesion</p></a></div>
        `
        SECCION_INVITADO.classList.remove('hidden');
    }

    SECCION_LOGIN.appendChild(div);

}

const BOTON_ASIDE_DESKTOP = document.getElementById('aside-carrito-desktop');
const CONTENEDOR_CARRITO_DESKTOP = document.getElementById('contenedor-productos-desktop');    
let localStorag = JSON.parse(localStorage.getItem('movie'));
let candy = JSON.parse(localStorage.getItem('carrito'));

/*sumatorias totales de candy, tickets y final */
const totalCarrito = localStorag.boletos.reduce((acu, producto)=> acu + (producto.precio * producto.tickets), 0);
const productosCandy = candy ? candy.reduce((acu, producto)=> acu + (producto.precio * producto.cantidad), 1) : 0;
const sumaPrecioFinal = productosCandy > 0 ? (totalCarrito + productosCandy) : totalCarrito;
let descuentoPromo = undefined;

console.log(localStorag.title);

function mostrarResumenCompra(){
    
    if(localStorag){

        CONTENEDOR_RESUMEN_LIST = document.querySelectorAll('.CONTENEDOR_RESUMEN');

        CONTENEDOR_RESUMEN_LIST.forEach(contenedor => {

            const divImg = document.createElement('div');
            divImg.className = "flex flex-1 justify-center";
            
            if(localStorag.img){
                const img = document.createElement("img");
                img.className = "w-40 h-52";
                img.src = `https://image.tmdb.org/t/p/w500/${localStorag.img}`;
                img.alt = `poster promocional de ${localStorag.title}`;
                
                divImg.appendChild(img);
            }else{
                
                const div = document.createElement('div');
                div.innerHTML = `<a href="../index.html" id="textoAdvertenciaMobile" class="underline underline-offset-2 cursor-pointer">SELECCIONE <br> UNA <br> PELICULA</a>`

                divImg.appendChild(div);
            }
        

            /* contenedor texto */

            const innerDiv = document.createElement('div');
            innerDiv.className = "flex flex-col flex-1 md:flex-wrap md:content-center"
        
            /* nombre de la pelicula */ 

            const nombreDiv = document.createElement('div');
            nombreDiv.className = "font-semibold"

            const p = document.createElement('h1');
            p.textContent = `${localStorag.title}`
        
            nombreDiv.appendChild(p);
    
            /* horario y fecha de la funcion */

            const horarioDiv = document.createElement('div');
            horarioDiv.className = "mt-1 text-navy-50/70 text-sm";

            const { funcion } = localStorag;
            
            let horario = document.createElement("p");
            horario.textContent = `${funcion.dia} ${funcion.horario} hs`;
            horarioDiv.appendChild(horario);
    
            /* parking */
    
            const lugarDiv = document.createElement('div');
            lugarDiv.className = "mt-1 text-navy-50/70 text-sm";

            const parking = localStorag.boletos.find ((ticket) => ticket.nombre.includes("Parking"))
        
            let parkings = document.createElement("p");
            parkings.textContent = parking.nombre;
            lugarDiv.appendChild(parkings);
            
            /*cantidad boletos */

            const boletoDiv = document.createElement('div');
            boletoDiv.className = "mt-2";

            const BOLETOS = localStorag.boletos.filter(boleto => !boleto.nombre.includes("Parking"));
    
            BOLETOS.forEach(producto =>{
                
                if(producto.tickets > 0){
    
                    let boletosDiv = document.createElement("div");
                    boletosDiv.className = "flex items-center justify-between gap-4 text-navy-50/70"
                
                    boletosDiv.innerHTML = `                
                    <h2 class="text-sm">${producto.nombre} ${producto.tickets > 1 ? `x ${producto.tickets}`: ''}</h2>
                    `    
                    boletoDiv.appendChild(boletosDiv);
                }
            })

            /* se unen los div al contenedor texto */

            innerDiv.appendChild(nombreDiv);
            innerDiv.appendChild(horarioDiv);
            innerDiv.appendChild(lugarDiv);
            innerDiv.appendChild(boletoDiv);
            
            /* se unifican al div principal */
             contenedor.appendChild(divImg);
             contenedor.appendChild(innerDiv);

        })
    }else if(localStorag.title === undefined){
        console.log('else', localStorag.title);
        CONTENEDOR_IMG_MOBILE.innerHTML='';

        const div = document.createElement('div');
        div.innerHTML = `<a href="../index.html" id="textoAdvertenciaMobile">SELECCIONE <br> UNA <br> PELICULA</a>`

        CONTENEDOR_IMG_MOBILE.appendChild(div);
    }
}

function mostrarListadoResumen(){
    CONTENEDOR_CARRITO_DESKTOP.innerHTML = '';

    localStorag.boletos.forEach(producto =>{
            
        if(producto.tickets > 0){

            let div = document.createElement("div");
            div.className = "flex items-center my-1 justify-between gap-4"
    
            div.innerHTML = `    
            <div class="flex justify-between w-full border-b border-dashed border-navy-100/70">
                <h2>${producto.nombre} ${producto.tickets > 1 ? `x ${producto.tickets}`: ''}</h2>
                <h3>US$ ${(producto.precio * producto.tickets).toFixed(2)}</h3>
            </div>
            `    
            CONTENEDOR_CARRITO_DESKTOP.appendChild(div);
        }
    })

    if(candy && candy.length > 0){
        
        candy.forEach(producto =>{
            let div = document.createElement("div");
            div.className = "flex items-center my-1 justify-between gap-4"

            div.innerHTML = `
            <div class="flex justify-between w-full border-b border-dashed border-navy-100/70">
                <h2>${producto.nombre} ${producto.cantidad > 1 ? `x ${producto.cantidad}`: ''}</h2>
                <h3>US$ ${(producto.precio * producto.cantidad).toFixed(2)}</h3>
            </div>
            `
            CONTENEDOR_CARRITO_DESKTOP.appendChild(div);
        })

        let div = document.createElement("div");
        div.className = "flex items-center my-1 justify-between gap-4"
        
        div.innerHTML = `
        <div class="flex justify-between w-full border-b border-dashed border-navy-100/70">
            <h2>Cargo por servicio</h2>
            <h3>US$ ${(1).toFixed(2)}</h3>
        </div>
        `
        CONTENEDOR_CARRITO_DESKTOP.appendChild(div);
    }
}

function mostrarPreciosDesktop(){
    /* sumatoria parcial */
        
    const SUBTOTAL = document.getElementById('subtotalFinal');

    SUBTOTAL.textContent = '';
    
    SUBTOTAL.textContent = `US$ ${sumaPrecioFinal.toFixed(2)}`;

    /* descuentos */ 

    if(SESION_INICIADA && SESION_INICIADA.newslestter){
        const DESCUENTOS_SOCIOS = document.getElementById('descSocios');
        DESCUENTOS_SOCIOS.classList.remove('hidden');
        
        let div = document.createElement("div");
        div.className = "flex items-center m-2 justify-between gap-4"
    
        div.innerHTML = `    
        <div class="flex justify-between w-full text-green-400">
            <h2>Descuentos socios</h2>
            <h3>20%</h3>
        </div>
        `    
        CONTENEDOR_PRECIOS_MOBILE.appendChild(div);

        const descuentoSocios = totalCarrito * 0.20;
        sumaPrecioFinal = sumaPrecioFinal - descuentoSocios;
    }
    
    /* sumatoria total */
    const TOTAL_ACUMULADO = document.getElementById('totalFinal');
    
    TOTAL_ACUMULADO.textContent ='';

    TOTAL_ACUMULADO.textContent = `US$ ${ descuentoPromo ? (sumaPrecioFinal - descuentoPromo).toFixed(2) : sumaPrecioFinal.toFixed(2)}`;
}

function aplicarDescuento(){

    const CODIGO = document.getElementById('code');
    console.log('aplicar descuento')
    if(CODIGO.value === "GO TO SHOP"){
        const CODIGO_PROMO = document.getElementById('codPromo');
        CODIGO_PROMO.classList.remove('hidden');

        descuentoPromo = productosCandy * 0.80;

        mostrarPreciosDesktop();
        mostrarResumenMobile();
        
        const PRECIO_TOTAL_FINAL = document.getElementById('precioTotalFinal');

        PRECIO_TOTAL_FINAL.textContent = `US$ ${(sumaPrecioFinal - descuentoPromo).toFixed(2)}`

        Swal.fire({
            title: "Descuento aplicado",
            text: "80% de descuento aplicado al Candy",
            icon: "success",
            timer: 1500,
            timerProgressBar: true
        });
    }
}
/* SECCION MOBILE */

const CONTENEDOR_PRECIOS_MOBILE = document.getElementById('contenedor-precios-mobile');
const CONTENEDOR_TOTAL_MOBILE = document.getElementById('contenedor-total-mobile');
const CONTENEDOR_CANDY_MOBILE = document.getElementById('contenedor-candy-mobile');

/* Pestaña mobile para ver si hay productos en el carrito de candy los muestra en pantalla */
function mostrarResumenCandy(){    

    if(candy && candy.length > 0){
        CONTENEDOR_CANDY_MOBILE.innerHTML = '';

        candy.forEach(producto =>{
            let div = document.createElement("div");
            div.className = "flex items-center m-1 justify-between gap-4 text-sm"

            div.innerHTML = `
            <div class="flex justify-between w-full">
                <h2>${producto.nombre} ${producto.cantidad > 1 ? `x ${producto.cantidad}`: ''}</h2>
                <h3>US$ ${(producto.precio * producto.cantidad).toFixed(2)}</h3>
            </div>
            `
            CONTENEDOR_CANDY_MOBILE.appendChild(div);
        })
        
        let div = document.createElement("div");
        div.className = "flex items-center m-1 justify-between gap-4 text-sm"
        
        div.innerHTML = `
        <div class="flex justify-between w-full">
            <h2>Cargo por servicio</h2>
            <h3>US$ ${(1).toFixed(2)}</h3>
        </div>
        `
        CONTENEDOR_CANDY_MOBILE.appendChild(div);
    }
}

/* muestra en el contenedor mobile el resumen de boletos */
function mostrarResumenMobile(){
    
    CONTENEDOR_PRECIOS_MOBILE.innerHTML = '';

    localStorag.boletos.forEach(producto =>{
            
        if(producto.tickets > 0){

            let div = document.createElement("div");
            div.className = "flex items-center m-2 justify-between gap-4"
    
            div.innerHTML = `    
            <div class="flex justify-between w-full">
                <h2>${producto.nombre} ${producto.tickets > 1 ? `x ${producto.tickets}`: ''}</h2>
                <h3>US$ ${(producto.precio * producto.tickets).toFixed(2)}</h3>
            </div>
            `    
            CONTENEDOR_PRECIOS_MOBILE.appendChild(div);
        }
    })

    if(candy && candy.length > 0){
        
        let div = document.createElement("div");
            div.className = "flex items-center m-2 justify-between gap-4"
    
            div.innerHTML = `    
            <div class="flex justify-between w-full">
                <h2>Productos candy ${candy.length > 1 ? `x ${candy.length}`: ''}</h2>
                <h3>US$ ${(productosCandy).toFixed(2)}</h3>
            </div>
            `    
        CONTENEDOR_PRECIOS_MOBILE.appendChild(div);
    }

    if(descuentoPromo){
        let div = document.createElement("div");
            div.className = "flex items-center m-2 justify-between gap-4"
    
            div.innerHTML = `    
            <div class="flex justify-between w-full text-green-400">
                <h2>Codigo promocional</h2>
                <h3>80%</h3>
            </div>
            `    
        CONTENEDOR_PRECIOS_MOBILE.appendChild(div);
    }
}

/* muestra en el contenedor fijo inferior mobile el resumen de precios */
function mostrarPreciosMobile(){

    console.log('acaaaa');
    CONTENEDOR_TOTAL_MOBILE.innerHTML ='';

    let total = document.createElement("div");
    total.className = "flex justify-between items-center text-white w-full p-4"

    total.innerHTML = `
    <div class="text-sm w-1/2 px-3">
        <button class="underline decoration-white" id="mostrar-carrito-mobile">VER RESUMEN <br> DE LA COMPRA</button>
    </div>
    <div class="text-xl w-1/2 font-semibold flex flex-wrap justify-around">
        <h3>TOTAL</h3>
        <h4 id="precioTotalFinal">US$ ${sumaPrecioFinal.toFixed(2)}</h4>
    </div>
    `
    console.log(total);
    CONTENEDOR_TOTAL_MOBILE.appendChild(total);
}

function actualizarCantidadProductos() {
    const CANTIDAD_PRODUCTO_MOBILE = document.getElementById('cantidad-producto-mobile');
    
    CANTIDAD_PRODUCTO_MOBILE.innerHTML = '';
    let div = document.createElement("div");
    div.innerHTML =` <h2> ${candy ? candy.length: 0} </h2> `
    CANTIDAD_PRODUCTO_MOBILE.appendChild(div);    
}
function desplegarCarrito(){
    CONTENEDOR_CARRITO_DESKTOP.classList.toggle('max-h-[70px]');
    CONTENEDOR_CARRITO_DESKTOP.classList.toggle('overflow-hidden');
    
    if(CONTENEDOR_CARRITO_DESKTOP.classList.contains('max-h-[70px]' && 'overflow-hidden')){
        BOTON_ASIDE_DESKTOP.innerHTML= `<span class="material-symbols-outlined text-navy-150">keyboard_double_arrow_down</span>`;        
    }else{
        BOTON_ASIDE_DESKTOP.innerHTML=`<span class="material-symbols-outlined text-navy-150">keyboard_double_arrow_up</span>`;        
    }
}

/* Agrega escucha de eventos a los botones mobile */
function agregarEventoCandy(){
    const MOSTRAR_CANDY_MOBILE = document.getElementById('mostrar-candy-mobile');
    MOSTRAR_CANDY_MOBILE.addEventListener('click', (e)=>{
        e.preventDefault();
    
        CONTENEDOR_CANDY_MOBILE.classList.toggle('hidden');
    })
}
function agregarEvento(){
    const MOSTRAR_CARRITO_MOBILE = document.getElementById('mostrar-carrito-mobile');
    MOSTRAR_CARRITO_MOBILE.addEventListener('click', (e)=>{
        e.preventDefault();
        console.log('click')
        CONTENEDOR_PRECIOS_MOBILE.classList.toggle('hidden');
    })
}

function finalizarCompra(){

    localStorage.removeItem('movie');
    localStorage.removeItem('carrito');
    localStorage.removeItem('')
    Swal.fire({
        title: "¡Gracias por tu compra!",
        icon: "success",
        timer: 1500,
        timerProgressBar: true
    });

    setTimeout(() => {
        window.location.href = "/pages/contacto.html";
    }, 1600);
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

sesionInfo();
mostrarPreciosDesktop();
mostrarResumenCompra();
mostrarListadoResumen();
mostrarResumenMobile();
mostrarPreciosMobile();
mostrarResumenCandy();
agregarEvento();
agregarEventoCandy();
actualizarCantidadProductos();