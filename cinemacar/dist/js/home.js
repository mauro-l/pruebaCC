
let apiMovie = [];

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MmI3YjMxNTBkNWNiYWYwZTMyYWQ2MGQyN2FhYzVlZSIsInN1YiI6IjY1ODM3Mzk4ODU4Njc4NTU4M2Y2ODg3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RlQWrjAw6VX4e-NHaFohLD4CpaLFCj23so2ksR42_i4'
    }
  };

fetch('https://api.themoviedb.org/3/movie/now_playing?language=es-ES&page=1&region=AR', options)
  .then(response => response.json())
  .then(data =>{
    apiMovie = data.results.slice(0, 9);
    mostrarPeliculaEnCartelera(apiMovie);
    slider();
  } )
  .catch(err => console.error(err));

const MENU_INFO = document.getElementById('infoDetalles');
const CONTENEDOR_CARTELERA = document.getElementById('contenedorCartelera');
const CONTENEDOR_SLIDER = document.getElementById('contenedorSlider');

const listaGeneros = [
    {"id": 28, name: "Acción"},
    {"id": 12, name: "Aventura"},
    {"id": 16, name: "Animación"},
    {"id": 35, name: "Comedia"},
    {"id": 80, name: "Crimen"},
    {"id": 99, name: "Documental"},
    {"id": 18, name: "Drama"},
    {"id": 10751, name: "Familia"},
    {"id": 14, name: "Fantasía"},
    {"id": 36, name: "Historia"},
    {"id": 27, name: "Terror"},
    {"id": 10402, name: "Música"},
    {"id": 9648, name: "Misterio"},
    {"id": 10749, name: "Romance"},
    {"id": 878, name: "Ciencia ficción"},
    {"id": 10770, name: "Película de TV"},
    {"id": 53, name: "Suspense"},
    {"id": 10752, name: "Bélica"},
    {"id": 37, name: "Western"}
];

function mostrarPeliculaEnCartelera(movies){

    CONTENEDOR_CARTELERA.innerHTML = '';

    movies.forEach(movie =>{
        const MOVIE_ID = movie.id;
        const TITULO = movie.title;
        const POSTER_CARD = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

        const div = document.createElement('div');
        div.className= "w-60 relative mx-auto cursor-pointer";

        div.innerHTML= `
                    <div onclick="infoPelicula('${MOVIE_ID}')">
                        <img src='${POSTER_CARD}' class="object-cover w-full h-full " alt="${'caratula de la pelicula ' + TITULO}">
                        <p class="text-card"><span class="material-symbols-outlined px-3">play_circle</span>${TITULO}</p>
                    </div>
                    `

        CONTENEDOR_CARTELERA.appendChild(div);

        sliderPosterPromocional(movie);
    })
}

function sliderPosterPromocional(param){

    let generos = [];

    param.genre_ids.forEach((generosAPI) => {
        const generosEncontrados = listaGeneros.find((genero)=> genero.id === generosAPI);
        if (generosEncontrados) {
            generos.push(generosEncontrados.name);
        }
    });

    const generosRecorte = generos.slice(0, 2);
    const generosMobile = generosRecorte.join(", ");

    const div = document.createElement("div");
    div.className = "swiper-slide relative";

    const img = document.createElement("img");
    img.className = "object-cover w-full h-full";
    img.src = `https://image.tmdb.org/t/p/original/${param.backdrop_path}`;
    img.alt = `poster promocional de ${param.title}`;

    const innerDiv = document.createElement("div");
    //innerDiv.className = "hidden absolute text-start md:flex flex-col gap-3 p-6 text-white/80 top-1/3 left-28 w-4/5 bg-[#1702026b]";
    innerDiv.className = "absolute text-start flex flex-col md:gap-3 md:p-6 text-white/80 md:top-1/3 md:left-28 w-4/5 bg-[#1702026b]";

    const generosSlider = generos.join(' ');
    const genre = document.createElement("h5");
    genre.className = "text-white/50 text-sm font-bold hidden md:block uppercase";
    genre.textContent = `${generosSlider}`;
    
    const genreMobile = document.createElement("h5");
    genreMobile.className = "text-white/50 text-xs font-bold md:hidden";
    genreMobile.textContent = `${generosMobile}`;

    const title = document.createElement("h2");
    title.className = "md:text-6xl text-2xl font-semibold";
    title.textContent = `${param.title}`;

    const subtitle = document.createElement("p");
    subtitle.className = "text-xs md:text-base  mb-2";
    subtitle.textContent = `${param.original_title}`;

    const link = document.createElement("div");
    const linkButton = document.createElement("button");
    linkButton.onclick = function(){infoPelicula(`c${param.id}`)};
    linkButton.className = "boton hidden md:block";
    linkButton.textContent = "VER MAS";
    link.appendChild(linkButton);

    innerDiv.appendChild(genre);
    innerDiv.appendChild(genreMobile);
    innerDiv.appendChild(title);
    innerDiv.appendChild(subtitle);
    innerDiv.appendChild(link);

    div.appendChild(img);
    div.appendChild(innerDiv);

    const contenedorSlider = document.getElementById("contenedorSlider");
    contenedorSlider.appendChild(div); 
}

function infoPelicula(id) {

    let verificado = id;

    if(verificado.charAt(0) === "c"){
        verificado = verificado.substring(1);
    }

    fetch(`https://api.themoviedb.org/3/movie/${verificado}?language=es-ES`, options)
    .then(response => response.json())
    .then(data =>{
        crearContenidoModal(data);
    } )
    .catch(err => console.error(err));
}

function crearContenidoModal(movie){

    POSTER_PATCH = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`;
    
    MENU_INFO.innerHTML = '';
    MENU_INFO.classList.remove('hidden');

    const horas = Math.floor(movie.runtime / 60);
    const minutos = movie.runtime % 60;

    let generos = "";
    
    movie.genres.forEach((genero, index) => {        
        generos += genero.name;        
        if (index < movie.genres.length - 1) {
            generos += ", ";
        }
    });

    MENU_INFO.innerHTML = `
                        <button onclick="cerrarModal()" class="flex justify-end w-full pb-5 px-5">
                            <span class="material-symbols-outlined">close</span>
                        </button>
                        <picture>
                            <img class="rounded-lg" src="${POSTER_PATCH}" alt="imagen promocional de ${movie.title}">
                        </picture>
                        <br>
                        <h2 class="text-xl font-semibold">${movie.title}</h2>
                        <br>
                        <div id="contenedor-productos-desktop" class="max-h-[70px] overflow-hidden">
                            <p>${movie.overview}</p>
                        </div>
                        <div class="flex justify-center items-center flex-wrap text-navy-50">
                            <button onclick="desplegarCarrito()" id="aside-carrito-desktop" class="flex justify-center items-center flex-wrap"><span class="material-symbols-outlined text-navy-150">keyboard_double_arrow_down</span></button>
                        </div>
                        <p class="my-2"><strong>Duración: </strong>${horas}h ${minutos}m</p>
                        <p class="my-2"><strong>Género: </strong>${generos}</p>
                        <p id="direccion" class="my-2"></p>
                        <p class="my-2"><strong>Calificación:</strong>${movie.vote_average.toFixed(1)}</p>
                        <button onclick="comprarEntradas('${movie.poster_path}', '${movie.title}')" class="boton my-4">COMPRAR</button>
    `
    buscarDirectorPeli(movie.id);
}

function buscarDirectorPeli(id){
    
    const DIRECCION = document.getElementById('direccion');
    const span = document.createElement('span');
    
    let directores = false;
    const apiURL = `https://api.themoviedb.org/3/movie/${id}/credits?language=es-ES`;
    fetch(apiURL, options)
    .then(response => response.json())
    .then(data =>{
        data.crew.forEach((director)=>{
            if(director.job === "Director" && !directores){
               
                span.innerHTML= `<strong>Director: </strong>${director.name}`
            
                DIRECCION.appendChild(span);
                directores = true;
            }
        })
    })
    .catch(err => console.error('error al buscar director', err));
}

function cerrarModal(){
    MENU_INFO.classList.add('hidden');
}

function comprarEntradas(img, title){
    console.log(img);
    localStorage.setItem('movie', JSON.stringify({ title: title, img: img }));
    window.location.href = '/pages/tickets.html';
}

function desplegarCarrito(){

    const CONTENEDOR_CARRITO_DESKTOP = document.getElementById('contenedor-productos-desktop');
    const BOTON_ASIDE_DESKTOP = document.getElementById('aside-carrito-desktop');

    CONTENEDOR_CARRITO_DESKTOP.classList.toggle('max-h-[70px]');
    CONTENEDOR_CARRITO_DESKTOP.classList.toggle('overflow-hidden');
    
    if(CONTENEDOR_CARRITO_DESKTOP.classList.contains('max-h-[70px]' && 'overflow-hidden')){
        BOTON_ASIDE_DESKTOP.innerHTML= `<span class="material-symbols-outlined text-navy-150">keyboard_double_arrow_down</span>`;        
    }else{
        BOTON_ASIDE_DESKTOP.innerHTML=`<span class="material-symbols-outlined text-navy-150">keyboard_double_arrow_up</span>`;        
    }
}

function slider(){

    const swiper = new Swiper(".mySwiper2", {
      spaceBetween: 30,
      loop: true,
      centeredSlides: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      on: {
        autoplayTimeLeft(s, time, progress) {
          var progressCircle = document.getElementById("autoplay-progress").querySelector("circle");
          var progressContent = document.getElementById("autoplay-progress").querySelector("span");
          progressCircle.style.setProperty("--progress", 1 - progress);
          progressContent.textContent = `${Math.ceil(time / 1000)}s`;
        }
      }
    });
  }