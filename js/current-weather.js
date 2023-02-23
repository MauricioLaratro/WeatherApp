import weather from '../data/current-weather.js'
import { formatDate, formatTemp } from './utils/format-data.js'


// Function para obtener la ciudad donde se encuentra y escribirla en $elemento html.
function setCurrentCity($element, city){
    $element.textContent = city
}

// function para obtener la fecha desde formatDate en la carpeta utils y algo mas que no estoy entendiendo...
function setCurrentDate($element){
    const date = new Date()
    const formattedDate = formatDate(date)
    $element.textContent = formattedDate
}

// function para configurar la temperatura actual.
function setCurrentTemp($element, temp) {

    $element.textContent = formatTemp(temp)
}


//funcion para situar los datos obtenidos, en los elementos html correspondiente
function configCurrentWeather(weather){

    // function para situar los datos sobre la fecha actual, en el elemento html correspondiente.
    const $currentWeatherDate = document.querySelector('#current-weather-date')
    setCurrentDate($currentWeatherDate)
    
    // utilizamos $ solo para saber que estamos haciendo referencia a un DOM element (es una convencion personal de Leonidas)
    // function para situar los datos sobre la ciudad actual, en el elemento html correspondiente.
    const $currentWeatherCity = document.querySelector('#current-weather-city')
    const city = weather.name
    setCurrentCity($currentWeatherCity, city)

    // function para situar los datos sobre la temperatura actual, en el elemento html correspondiente.
    const $currentWeatherTemp = document.querySelector('#current-weather-temp')
    // obtenemos la temperatura actual desde nuestros datos dummies en /data y lo almacenamos en la constante temp.
    const temp = weather.main.temp
    setCurrentTemp($currentWeatherTemp, temp)

    
}

// Exportamos la configuracion global que hicimos hasta ahora, al index.js ya que esto forma parte de un modulo js, es necesito exportarlo y alli importarlo para que funcionen los scripts.
export default function currentWeather(){
    configCurrentWeather(weather)
}
