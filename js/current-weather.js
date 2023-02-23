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


// fucntion para obtener la info. si es de dia o de noche, dinamicamente.
function solarStatus(sunriseTime, sunsetTime) {
    // almacenamos la fecha actual, por eso Date() pasandola vacia, sin argumentos dentro de los () ya que de esta manera, indicara la fecha en la que se active la peticion. getHours() utilizamos para obtener solo las horas actuales, ya que no necesitamos toda la fecha completa. Luego tambien almacenamos .getHours de sunriseTime y sunsetTime.
    const currentHours = new Date().getHours()    
    const sunriseHours = sunriseTime.getHours()    
    const sunsetHours = sunsetTime.getHours()

    // validacion en la que indicamos que si currentHours es menor a la hora en la que sale el solo O... (||) currentHours es mayor a la hora en la que se esconde el sol. Quiero decir que es de noche. De lo contrario es de dia.
    if (currentHours < sunriseHours || currentHours > sunsetHours) {
        return 'night'
    }
    return 'morning'
}
// function para obtener el background que corresponda al clima actual.
function setBackground($element, solarStatus) {
    $element.style.backgroundImage = `url(./images/${solarStatus}-drizzle.jpg)`
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

    // almacenamos en constantes los valores de sunrise y sunsut del objeto sys que esta dentro de weather, para poder determinar la franja horaria en la que sale el sol y la franja horaria en la que se esconde. Y lo pasamos de numeros a fechas con "new Date". Tambien lo multiplicamos por 1.000 porque los valores de sunrise y sunset que otenemos de manera externa hacia weather, estan expresado en segundos y JavaScript los necesita en milisengundo, para devolvernos la hora correctamente.
    const sunriseTime = new Date (weather.sys.sunrise * 1000)
    const sunsetTime = new Date (weather.sys.sunset * 1000)
    // metodo para situar el background obtenido, al elemento html correspondiente.
    const $app = document.querySelector('#app')
    setBackground($app, solarStatus(sunriseTime, sunsetTime))
}

// Exportamos la configuracion global que hicimos hasta ahora, al index.js ya que esto forma parte de un modulo js, es necesito exportarlo y alli importarlo para que funcionen los scripts.
export default function currentWeather(){
    configCurrentWeather(weather)
}
