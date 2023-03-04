// TENER EN CUENTA: cada vez que usamos $element, $el, callback o cualquier otra palabra por defecto como parametro de una function a la hora de declararla, es porque es problable que luego al llamarla la utilicemos en diferentes elementos o con diferentes callbacks(otras function) como parametro.


import currentWeather from './current-weather.js'
import { ViewportSize, ViewportSizeInApp } from './utils/viewport.js'
// Ademas de poder importar todo el modulo como lo hacermos con currentWeather o importar solo algunas functions como lo hacemos en la que le sigue. tambien podemos importar directamente un archivo y lo que hara esto es ejecturas directamente todo lo que este en este archivo (esto se llama SIDE EFECT), como lo haremos en la siguiente linea...
import './tabs.js'

const $allApp = document.querySelector('#allApp')
const $app = document.querySelector('#app')
const $loading = document.querySelector('#loading')
ViewportSize($allApp)
ViewportSize($loading)
ViewportSizeInApp($app)
currentWeather()