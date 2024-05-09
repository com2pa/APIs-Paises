const searchInput = document.querySelector('#search');
const container = document.querySelector('.container');


const container_1=document.querySelector('.container-1')
const body = document.querySelector('.main');
const loader = document.querySelector('.loader');
const formContainer = document.querySelector('.form-container');
const title = document.querySelector('.title');

const texto=document.querySelector('#texto-container')


// Los paises descargados desde la api se guardan en el array de countries
// La api deberia pedirse solo una vez
// Usar este array para crear el filtrado
let countries = [];
let climas=[];
let nubes=[];
// https://api.openweathermap.org/data/2.5/weather?q=Venezuela&appid=c83b5222e37b63209d213e758dfbaae0
// https://api.openweathermap.org/data/2.5/weather?lat=10.48&lon=-66.87&appid=c83b5222e37b63209d213e758dfbaae0
// Funcion que pide todos los paises



const getCountries = async () => {
   try {
     // Llamo a la API Rest Countries  
    const response = await fetch('https://restcountries.com/v3.1/all')
    

      //se crea un if donde preguntamos si el status es diferente a 200 
      if(response.status === 200){
        // Transformo la respuesta a JSON
        const datos = await response.json()
       
        // Guardo el array de los paises recibido dentro de contries
       
        countries = datos;
        
        
        // Si el status es diferente a 200, lanzamos un error con el mensaje de la respuesta
        // const errorData = await response.json(); // Convertimos la respuesta de error a JSON para obtener el mensaje
        //throw  Error(data.message);
      }else if(response.status === 401){
        console.log('colocaste la llave mal');
      }else if(response.status === 404){
          console.log('no se encontro el pais buscado');
      }else if(response.status == 400){
          console.log('ocurrio un error');
      }else{
          console.log('hubo un error no se que paso !');
      }
  

  } catch (error) {
      //si el status es diferente a 200 
        //se crea un error
        console.log(error.message);
        // alert(error.message)
  }

  

}


getCountries();






let info=texto.parentElement.children[0].innerHTML

let cambiar = container.parentElement.children[1]




searchInput.addEventListener('input', async e => {
 e.preventDefault();
 container.innerHTML=`<div class="loader"></div>`
 
 // Toda la logica del desafio va dentro del evento del input.
 let buscador= e.target.value.toLowerCase()
//  console.log(buscador);

 
 let pais = countries.filter(element => element.name.common.toLowerCase().startsWith(buscador));
 console.log(pais);
  
  let paises=''

  //  
  if(pais.length === 1){
    const response1 = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${pais[0].name.common}&appid=c83b5222e37b63209d213e758dfbaae0&units=metric`)
    datos2 = await response1.json()
    nubes = datos2;
    console.log(nubes);
    container.classList.remove('container')
    container.classList.add('container-1')

    let celcius = datos2.main.temp;
    let icon = datos2.weather[0].icon;
        pais.forEach(countr =>{

          let bande = countr.flags.svg;
          let name = countr.name.common;
          let capital = countr.capital;
          let population = countr.population;
          let continents = countr.region;
          let timezones = countr.timezones;
          let region = countr.continents;
          
          

          paises = ` 
            <div clas="container-cart-1">
              <img  class="banderas" src="${bande}">
              <p id="climas"><img src="https://openweathermap.org/img/wn/${icon}@2x.png" class="nubess">  | ${celcius}° celcius</p>
            
            </div>
            <div class="descripcion"> 
                  <h3 class="titulo-1">${name}</h3>
                  <span>${capital}</span>
                  <span>${population}</span>
                  <span>${continents}</span>
                  <span>${timezones}</span>
                  <span>${region}</span>
            </div>
          ` 
        });  
    }else  if(pais.length < 10){

        container.classList.remove('container-1')
        container.classList.add('container')
    
        pais.forEach(element =>{
          let cart = document.createElement('div')
          cart.classList.add('conta-cart')
          
           paises  += `
            <div class="conta-cart">
              <div class="titi">    
                <img  class="banderas" src="${element.flags.svg}">
                          
                <h3 class="titulo">${element.name.common}</h3>                
              </div>
            </div>
          `
          container.append(cart)
          
        })

    }else if(searchInput.value ===''){
      container.classList.remove('container')
      container.classList.remove('container-1')      
    }else{
      paises  += `    <p>${info} existe mas de ${pais.length} paises</p>   `    
      
      
    }
   
  container.innerHTML = paises;
  // mostrando el dom

  
});

      setInterval(()=>{  //intenvalo algo que se va repetir que se le especifique en esta funcion
        title.classList.toggle('color');// muestra la clase y la quita
    },1000)//1seg = 1000 mil

