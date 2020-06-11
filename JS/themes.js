const btnElegir = document.querySelector('desplegable');

btnElegir.addEventListener('click',() => {
  document.body.classList.toggle('dark');
  btnElegir.classList.toggle('active');
});