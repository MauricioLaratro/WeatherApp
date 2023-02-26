import weather from '../data/current-weather.js'
import { formatDate, formatTemp } from './utils/format-data.js'
import { weatherConditionsCodes } from './constants.js'
import { getCurrentPosition } from './geolocation.js'

// ingresamos al objeto weather que esta dentro de weather y seleccionamos su primer elemento (0) que es el objeto que contiene el id que indica el tipo de clima, que este es un number y con String lo transformamos a un string. Los strings tienen el metodo .chartAt que nos dice que caracter esta en la posicion que le pasamos entre los () en este caso es 0 porque necesitamos el primer caracter del id. Para hacer que coincida con los numeros de nuestro diccionario de weatherConditionsCodes y todo eso lo colocamos dentro de weatherConditionsCodes, para que haga la comparacion de numeros
// weatherConditionsCodes[String(weather.weather[0].id).charAt(0)]
// Todo esto lo que esta dentro de weatherConditionsCodes realmente lo pasamos como otra condicion dentro de setBackground

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
// function para obtener el background que corresponda al clima actual. pasandole los parametros del elemento html donde va el background, los datos del clima actual y los datos de si es de dia o de noche.
// creamos la constante weatherType a la que le asignamos nuestro diccionario de codigos de clima. Constante que luego agregamos al template literal para que cambie el tipo de clima dinamicamente, asi como cambia entre el dia y la noche de manera dinamica. Con los datos que obtenemos.
// la constante size se utiliza para determinar el tamaño de la pantalla en la que se esta utilizando la app. por medio del metodo .matchMedia del objeto window. Esto nos devulve un Boolean (true or false) y lo que necesitamos es un string que sea '@2x' o un string vacio, porque asi estan nombradas las imagenes de fondo, para utilizarlas en el template literal de backgroundImage, por eso utilizamos el operador ternario ? que es el unico operador que recibe 3 operando, en este caso el matchMedia, '@2x y ''. Ya que este determina que si el valor de matches es true, devolvera el primer valor o de lo contrario devolvera el segundo.
// El size lo cambiamos para pasar un tipo de imagen u otra, para no pasar una imagen con mucha densidad de pixeles a una pantalla que no lo soporta, es por cuestiones de rendimiento de la app.
function setBackground($element, conditionCode, solarStatus) {
    const weatherType = weatherConditionsCodes[conditionCode]
    const size = window.matchMedia('(-webkit-min-device-pixel-ratio: 2)').matches ? '@2x' : ''
    $element.style.backgroundImage = `url(./images/${solarStatus}-${weatherType}${size}.gif)`
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
    // Creamos la constante conditionCode, donde, ingresamos al objeto weather que esta dentro de weather y seleccionamos su primer elemento (0) que es el objeto que contiene el id que indica el tipo de clima, que este es un number y con String lo transformamos a un string. Los strings tienen el metodo .chartAt que nos dice que caracter esta en la posicion que le pasamos entre los () en este caso es 0 porque necesitamos el primer caracter del id. Para hacer que coincida con los numeros de nuestro diccionario de weatherConditionsCodes.
    const conditionCode = String(weather.weather[0].id).charAt(0)
    // llamamos a la funtion setBackground para colocarle los parametros que vamos a utilizar para setear el background, de forma dinamica.
    setBackground($app, conditionCode, solarStatus(sunriseTime, sunsetTime))
}

// Exportamos la configuracion global que hicimos hasta ahora, al index.js ya que esto forma parte de un modulo js, es necesito exportarlo y alli importarlo para que funcionen los scripts.
// Para ejecutar getCurrentPosition dentro de currentWeather, utilizamos el metodo .then de la promesa que realizamos en la function getCurrentPosition. Ya que, la obtencion de la ubicacion actual, es algo ASINCRONO, es decir no se ejecuta de manera inmediata al ejecutar la app. Es la mejor forma de poder utilizar los datos que obtenemos de getCurrentPosition fuera de su propia function. Ademas nos sirve por si queremos utilizar tambien un catch por si la ubicacion actual no puede ser obtenida por algun error.
export default function currentWeather(){
    getCurrentPosition()
    .then((data) =>{
        console.log('HEMOS TRIUNFADO', data)
    })
    // catch se ejecutara si por algun motivo .then no se pudo ejectura. contiene mismo que pusimos en reject en la promesa de getCurrentPosition.
    .catch((message) => {
        console.log(message)
    })
    configCurrentWeather(weather)
}
