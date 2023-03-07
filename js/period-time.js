
import { createDOM } from "./utils/dom.js"
import { formatDate, formatTemp, formatHumidity, formatWindSpeed } from "./utils//format-data.js"

// function para crear la plantilla de los 8 pronosticos diarios
export function getPeriodTimeTemplate(config, panelIndex, weatherIndex){
    const $tabPanel = document.getElementById(`dayWeather-${panelIndex}`)
    const $atmosphericVar = createDOM(getAtmosphericVarTemplate(config, panelIndex, weatherIndex))
    $tabPanel.append($atmosphericVar)

    return `
    <li class="dayWeather-item ${ weatherIndex === 0 ? 'is-selected' : '' } " data-weatherItem="tp${panelIndex}-w${weatherIndex}">
        <span class="dayWeather-time">${config.date}</span>
        <img class="dayWeather-icon" height="48" width="48" src="https://openweathermap.org/img/wn/${config.icon}@2x.png" alt="${config.description}" rain="">
        <span class="dayWeather-temp">${config.temp}</span>
    </li>`
}


export function getAtmosphericVarTemplate(config, panelIndex, weatherIndex){
    return `
    <div id="atmosphericVar-tp${panelIndex}-w${weatherIndex}" class="dayWeather-atmosphericVar ${ weatherIndex !== 0 ? 'is-hidden' : '' } ">
        <div class="atmosphericVar">
            <span>Máx: <strong id="atmosphericVarMax-${panelIndex}">${config.tempMax}</strong></span>
            <span>Mín: <strong id="atmosphericVarMin-${panelIndex}">${config.tempMin}</strong></span>
        </div>
        <div class="atmosphericVar">
            <span>Viento: <strong id="atmosphericVarSpeedWind-${panelIndex}">${config.windSpeed}</strong></span>
            <span>Humedad: <strong id="atmosphericVarHumidity-${panelIndex}">${config.humidity}</strong></span>
        </div>
    </div>`
}


// Reutilizamos la function de createDOM para renderizar el string de la plantilla de periodTimeTemplate y volverlo finalmente un elemento html.
export function createPeriodTime(weather, panelIndex, weatherIndex) {
    const dateOptions = {
        hour: 'numeric',
        hour12: true,
    }
    const temp = formatTemp(weather.main.temp)
    const date = formatDate(new Date(weather.dt * 1000), dateOptions)
    const tempMax = formatTemp(weather.main.temp_max)
    const tempMin = formatTemp(weather.main.temp_min)
    const humidity = formatHumidity(weather.main.humidity)
    const windSpeed = formatWindSpeed(weather.wind.speed)
    const config = {
        temp,
        tempMax,
        tempMin,
        humidity,
        windSpeed,
        date,
        icon: weather.weather[0].icon,
        description: weather.weather[0].description,
    }
    return createDOM(getPeriodTimeTemplate(config, panelIndex, weatherIndex))
}