//Gif guardados en el local storage

const gifsN1 = document.getElementById('misgif');

let gifsGuardados = localStorage.getItem('gif');
let misgif = JSON.parse(gifsGuardados);
if(misgif !==null){
  misgif.forEach(element => {
    gifHTML = `<div class="misGuifos"><img src="${element}" alt="Gif subido"></div>`
    gifsN1.innerHTML += gifHTML;
  })
} else{
misgif = [];
}