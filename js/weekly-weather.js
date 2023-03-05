// aqui hacemos todo lo mismo que en currentWeather, pero esta vez para obtener el pronostico de los proximos 5 dias de la semana

import { getWeeklyWeather } from './services/weather.js'
import { getLatLon } from './geolocation.js'
import { formatWeekList } from './utils/format-data.js'

function configweeklyWeather() {

}

export default async function weeklyWeather() {
    const { lat, lon, isError } = await getLatLon()
    if (isError) return console.log('Ah ocurrido un error al intentar ubicarte')
    const { isError: weeklyWeatherError, data: weather } = await getWeeklyWeather(lat, lon)
    if (weeklyWeatherError) return console.log('Ha ocurrido un error al intentar traer el pronóstico del clima!')
    const weekList = formatWeekList(weather.list)
    configweeklyWeather(weather)
}