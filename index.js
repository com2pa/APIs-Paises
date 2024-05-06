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
let climas=[]

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
// console.log(cambiar);

searchInput.addEventListener('input', async e => {
  // Toda la logica del desafio va dentro del evento del input.
  buscador= e.target.value.toLowerCase()
  
  
  let tecto = countries.filter(element => element.name.common.toLowerCase().startsWith(buscador));
  console.log(tecto,buscador);
  
  let paises =''

  tecto.forEach(element => {
    if(tecto.length >10){
      paises = `
        <p>${info}</p>
      `
      container.innerHTML=paises
      
    }else if(tecto.length === 1 ){
      container.classList.remove('container')
      container.classList.add('container-1')
        paises +=`
        
          <div clas="container-cart-1">
            <img  class="banderas" src="${element.flags.svg}">           
          </div>
          <div class="descripcion"> 
                <h3 class="titulo-1">${element.name.common}</h3>
                <span>${element.capital}</span>
                <span>${element.population}</span>
                <span>${element.region}</span>
                <span>${element.timezones}</span>
                <span>${element.continents}</span>
          </div>      
        
        
        `


    }else if(tecto.length >= 4 ){
    container.classList.remove('container-1')
    container.classList.add('container')
     paises+=`
          <div clas="conta-cart">
            <div class="titi">    
              <img  class="banderas" src="${element.flags.svg}">
                        
              <h3 class="titulo">${element.name.common}</h3>                
            </div>
          </div> 
     `  
    }else if(tecto.length >= 2){
      container.classList.remove('container-1')
    container.classList.add('container')
     paises+=`
          <div clas="conta-cart">
            <div class="titi">    
              <img  class="banderas" src="${element.flags.svg}">
                        
              <h3 class="titulo">${element.name.common}</h3>                
            </div>
          </div> 
     `  
    }
    
  
  })
  container.innerHTML=paises
  

});
      


      setInterval(()=>{  //intenvalo algo que se va repetir que se le especifique en esta funcion
        title.classList.toggle('color');// muestra la clase y la quita
    },1000)//1seg = 1000 mil


// https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=c83b5222e37b63209d213e758dfbaae0
// c83b5222e37b63209d213e758dfbaae0

const getClima= async () => {
    try{
      const response1 = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=c83b5222e37b63209d213e758dfbaae0`)
      

      // console.log(response1);
      //   //se crea un if donde preguntamos si el status es diferente a 200 
      if(response1.status === 200){
      // Transformo la respuesta a JSON
        const datos1 = await response1.json()
        console.log(datos1);  
      
      datos1 = climas;          
      
     
      }else if(response1.status === 401){
        console.log('colocaste la llave mal');
      }else if(response1.status === 404){
          console.log('no se encontro el pais buscado');
      }else if(response1.status == 400){
          console.log('ocurrio un error');
      }else{
          console.log('hubo un error no se que paso !');
      }





    
  } catch(error) {
    console.log(error.message);
  }

}

getClima();