// //Crear Guifos

const imagen = document.getElementById('imagen');
const video = document.getElementById('video');
const btnGrabar = document.getElementById('btnGrabar');
const btnListo = document.getElementById('btnListo');
const btnComenzar = document.getElementById('btnComenzar');
const btnCopiarEnlace = document.getElementById('btnCopiarEnlace');
//capturo el boton subir tal como se ha hecho con los otros botones
const btnSubir = document.getElementById('btnSubir');
video.style.display = "none";
var recorder;
const apikey = 'aantJ1Lvuxc538iYiNLcdeBhZY6hLAjs';
var urlGiphy;

btnComenzar.addEventListener('click', () => {
    video.style.display="block";
    
    navigator.mediaDevices.getUserMedia({
        video: true
    }).then(function(stream) {
        video.srcObject = stream;
        video.play();
        recorder = RecordRTC(stream, {
            type: 'gif',
            framRate: 1,
            quality: 10,
            hidden: 240,
        });        
    })
});

btnGrabar.addEventListener('click', () => {
    recorder.startRecording();
})

btnListo.addEventListener('click', () => {
    recorder.stopRecording(function() {
        video.style.display="none";
        imagen.style.display="block";
        blob = recorder.getBlob();
        imagen.src = URL.createObjectURL(blob);
        //voy a guardar el blob donde se lee el gif en el local storage        
        localStorage.setItem('gif', JSON.stringify(blob));
    });
});

//capturo el evento click del boton subir
btnSubir.addEventListener('click', (e) =>{    
    let form = new FormData();
    form.append('file', blob, 'MyGif.gif')    
    const url = `http://upload.giphy.com/v1/gifs`
    form.append('api_key', apikey)

    fetch(url,{
        method:'POST',
        body: form,
    })
    .then(res=>res.json())
    .then(datar=>{
        let idgif = datar.data.id;
        let urlgif = `http://api.giphy.com/v1/gifs/${idgif}?api_key=${apikey}`
        fetch(urlgif)
        .then(res => res.json())
        .then(json =>{
            urlGiphy = json.data.url;
            //let urlImage = json.data.images.fixed_width.url;
            
            //newGif.setAttribute('src', urlImage);            
            //añadirGif(urlImage);
        })
    })
});

btnDescargar.addEventListener('click', ()=>{
    recorder.save();
});

btnCopiarEnlace.addEventListener('click', ()=>{
    let aux = document.createElement("input");
    aux.setAttribute('value', urlGiphy);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand('copy');
    document.body.removeChild(aux);
})

// function getStreamAndRecord() {
//     navigator.mediaDevices.getUserMedia({
//         video: true
//     }).then(function (stream) {
//         video.srcObject = stream;
//         video.play();
//         let recorder = RecordRTC(stream, {
//             type: 'gif',
//             framRate: 1,
//             quality: 100,
//             hidden: 240,
//         })
//         btnGrabar.addEventListener('click', () => {
//             recorder.startRecording();
//         })
//         btnListo.addEventListener('click', () => {
//             recorder.stopRecording(() => {
//                 imagen.src = URL.createObjectURL(recorder.getBlob())
//                 //  console.log(imagen.src);
//                 // var giftStore = {
//                 //                 items: [],
//                 //               };
//                 //               giftStore.items.push({ name: video.name, url: video.gifUrl });

//                 window.localStorage.setItem("GIF_PAGE_KEY", imagen.src);
//             })

//         })
//     })
// }





//getStreamAndRecord();


// comenzarGif.addEventListener('click', (e) => {
//     video.style.display = "block";
// })

//Botones y sus eventos
//Boton Comenzar
// comenzarGif.addEventListener('click', (e) =>{
//     vista1.style.display="none";
//     vista2.style.display="block";
//     video.style.display="block";
//     imagen.style.display="none";
//     navigator.mediaDevices.getUserMedia({
//         video: true
//     }).then(function(stream){
//         video.srcObject = stream;
//         video.play();
//         recorder = RecordRTC(stream,{
//             type: 'gif',
//             framRate: 1,
//             quality: 10,
//             hidden: 240,
//         });
//     })

// });

//Boton capturar
// btnCapturar.addEventListener('click',(e) =>{
//     if(e.target.id !== "btnCapturar"){
//         opciones1.style.display="none";
//         opciones2.style.display="flex";
//         recorder.startRecording();
//         segundos = 0;
//         minutos = 0;
//         timer= setInterval(()=>{

//         })
//     }
// })

//   var image = document.querySelector("img");

//   function captureCamera(callback) {
//     navigator.mediaDevices
//       .getUserMedia({ video: true })
//       .then(function (camera) {
//         callback(camera);
//       })
//       .catch(function (error) {
//         alert("Unable to capture your camera. Please check console logs.");
//         console.log(error);
//       });
//   }
//   function stopRecordingCallback() {
//     document.querySelector("h1").innerHTML =
//       "Gif recording stopped: " + bytesToSize(recorder.getBlob().size);
//       const toPost = {
//         apikey: "aantJ1Lvuxc538iYiNLcdeBhZY6hLAjs",
//         username : 'Jean_Grey_Lamprea',
// //        file: URL.createObjectURL(recorder.getBlob()),
//         file: (recorder.getBlob()),
//       };
//       fetch("https://upload.giphy.com/v1/gifs?api_key=aantJ1Lvuxc538iYiNLcdeBhZY6hLAjs", {
//         method: "POST", // or 'PUT'
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(toPost),
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           console.log("Success:", data);

//           var giftStore = {
//             items: [],
//           };

//           var value = window.localStorage.getItem("GIF_PAGE_KEY");
//           if (value !== null || value !== undefined) {
//             var gifStore = JSON.parse(
//               window.localStorage.getItem("GIF_PAGE_KEY")
//             );
//           }

//           giftStore.items.push({ name: data.name, url: data.gifUrl });

//           window.localStorage.setItem("GIF_PAGE_KEY", gifStore);
//         })
//         .catch((error) => {
//           console.error("Error:", error);
//         });   

//     recorder.camera.stop();
//     recorder.destroy();
//     recorder = null;
//   }

//   var recorder; // globally accessible

//   document.getElementById("btnCapturar").onclick = function () {
//     this.disabled = true;
//     captureCamera(function (camera) {
//       document.querySelector("h1").innerHTML =
//         "Waiting for Gif Recorder to start...";
//       recorder = RecordRTC(camera, {
//         type: "gif",
//         frameRate: 1,
//         quality: 10,
//         width: 360,
//         hidden: 240,
//         onGifRecordingStarted: function () {
//           document.querySelector("h1").innerHTML = "Gif recording started.";
//         },
//         onGifPreview: function (gifURL) {
//           image.src = gifURL;
//         },
//       });

//       recorder.startRecording();

//       // release camera on stopRecording
//       recorder.camera = camera;

//       document.getElementById("btnCancelar").disabled = false;
//     });
//   };

//   document.getElementById("btnCancelar").onclick = function () {
//     this.disabled = true;
//     //recorder.stopRecording(stopRecordingCallback);
//   };
