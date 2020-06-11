//Datos para consumir la API
const apikey = 'aantJ1Lvuxc538iYiNLcdeBhZY6hLAjs';
const sugeridos = ["Jonathan Van Ness", "Sailor Mercury", "Gliter", "Unicorns"]
let url;

//Sugerencias
//Se realiza el get de los Guifos sugeridos usando un arralist
sugeridos.forEach(element => {
  url = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${element}`
  fetch(url).then(respuesta1 => {
    return respuesta1.json();
  }).then(json => {
    const urlImagen = json.data[1].images.fixed_width.url;
    //console.log(urlImagen);
    const title = json.data[1].title;
    var titleAjustado = "";
    let arrayTitle = title.split(" ");
    for (let i = 0; i <= 3; i++) {
      if (arrayTitle[i] !== "GIF" && arrayTitle[i] !== "by" && arrayTitle[i] !== undefined) {
        titleAjustado += arrayTitle[i] + " ";
      }
    }

    resultados1HTML = `<div class="sugerencias">
    <div class="titulo-sugerencias">
      <h3 class="title">#${titleAjustado.trim()}</h3>
      <button name="eliminar"><img src="./Images/button3.svg" alt="Quitar sugerencia"></button>
    </div>
    <li class="flex-item">
        <img class="imagen-sugeridos" src="${urlImagen}" alt="${title}"><button name='buscar-mas' value='${titleAjustado.trim()}' class="btnVerMas">Ver Mas...</button></li>`;
      
    document.getElementById("contenedor-sugerencias").innerHTML += resultados1HTML;
  }).catch(error => {
    //console.error(error.message);
    console.error('se verifica el error ' + error.message);
  });
});


/// Tendencias

function searchTrending() {
  const path = `https://api.giphy.com/v1/gifs/trending?api_key=${apikey}`
  const contenedor = document.getElementById("resultados-tendencias");

  fetch(path).then(function (res) {
    return res.json()
  }).then(function (json) {

    //el json.data.forEach obtiene cada uno de los elementos del resultado
    json.data.forEach(element => {

      titleGif = element.title
      urlGif = element.images.fixed_width.url
      liTag = `<li class="flex-item"><img src="${urlGif}" alt="${titleGif}" /></li>`
      contenedor.innerHTML += liTag

    });

  })
    .catch(error => {
      //console.error(error.message);
      console.log('Error tendencias: ' + error.message);
    });
}
searchTrending();

//buscador


const searchForm = document.getElementById('search-form')
const searchInput = document.getElementById('search-input')
const resultadosEl = document.getElementById('results')


searchForm.addEventListener('submit', function (e) {
  e.preventDefault()
  const q = searchInput.value
  search(q)
})

function search(q) {
  const path = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${q}`
  const contenedor = document.getElementById("resultados-busqueda");
  //Se usa para remover todos los elements antes de la busqueda si no aparecen los de la busqueda anterior
  //haz la prueba comentariando esta linea y haz varias busquedas para que veas lo que sucede
  contenedor.innerHTML = "";

  fetch(path).then(function (res) {
    return res.json()
  }).then(function (json) {

    json.data.forEach(element => {

      titleGif = element.title
      urlGif = element.images.fixed_width.url
      liTag = `<li class="flex-item"><img src="${urlGif}" alt="${titleGif}" /></li>`
      contenedor.innerHTML += liTag

    });

  })
}

//Sugeridos dinamicos
const sugge1 = document.getElementById('suggestion1');
const sugge2 = document.getElementById('suggestion2');
const sugge3 = document.getElementById('suggestion3');
const sugges = document.getElementsByClassName('suge');
const submit = document.getElementById('input-submit');




//Funcion boton "Ver mas" y "X"
const suge = document.getElementById('sugerencias');
suge.addEventListener('click', (e) => {
  if (e.target.name === "buscar") {
    search(e.target.value);
    contenedor.innerHTML = e.target.value;
    window.location.href = '#seccion_tendencias';
  }
  else if (e.target.alt === "Eliminar Sugerencia") {
    const son = e.target;
    const father = son.parentNode.parentNode;
    father.parentNode.remove(father);
  }
})


searchForm.addEventListener('keyup', () => {
  q = searchInput.value;
  //submit.classList.add('input');  
  const path = `http://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${q}&limit=3`
  fetch(path).then(function (res) {
    return res.json()
  }).then(function (json) {
    for (i = 0; i <= 2; i++) {
      if (json.data[i] !== undefined) {
        let title = json.data[i].title;
        let tag = '';
        let arrayTitle = title.split(" ");
        for (let i = 0; i <= 3; i++) {
          if (arrayTitle[i] !== "GIF" && arrayTitle[i] !== "by" && arrayTitle[i] !== undefined) {
            arrayTitle[i] = arrayTitle[i];
            tag += arrayTitle[i] + " "
          }
        }
        sugges[i].innerHTML = tag;
        sugges[i].value = tag;
      }
    };
  });
});

const panelSugerencia = document.querySelector('#sugerencia');
const tituloSugerencia = document.getElementById('titulo-tendencia');

panelSugerencia.addEventListener('click', (e) => {
  mostrarSugerencias(e);
});
//

const contenedorSugerencias = document.getElementById('contenedor-sugerencias');
contenedorSugerencias.addEventListener('click', (e) => {

  if (e.target.name === "buscar-mas") {
    mostrarSugerencias(e);
  } else if (e.target.alt === "Eliminar sugerencia") {
    const hijo = e.target;
    const padre = hijo.parentNode.parentNode;
    padre.parentNode.remove(padre);
  }
});

function mostrarSugerencias(e) {

  if ((e.target.id === "sugerencia")) {
    return;
  }

  valorBusqueda = e.target.value;
  tituloSugerencia.innerHTML = valorBusqueda;
  const contenedorTendencias = document.getElementById("resultados-tendencias");
  contenedorTendencias.innerHTML = "";

  url = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${valorBusqueda}`
  fetch(url).then(respuesta1 => {
    return respuesta1.json();
  }).then(json => {
    var resultadoConsulta = json.data;
    resultadoConsulta.forEach(element => {
      //console.log(element);
      const urlImagen = element.images.fixed_width.url;
      const title = element.title;
      resultados1HTML =`
       <li class="flex-item">
        <img class="imagen-sugeridos" src="${urlImagen}" alt="${title}"></li>`;
      contenedorTendencias.innerHTML += resultados1HTML;
    });
  }).catch(error => {
    console.error('se verifica el error ' + error.message);
  });
}
