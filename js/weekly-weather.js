// aqui hacemos todo lo mismo que en currentWeather, pero esta vez para obtener el pronostico de los proximos 5 dias de la semana

import { getWeeklyWeather } from './services/weather.js'
import { getLatLon } from './geolocation.js'
import { formatWeekList } from './utils/format-data.js'
import { createDOM } from './utils/dom.js'
import { createPeriodTime } from './period-time.js'
import draggable from './draggable.js'

// function para crear una plantilla de los tabs que vamos a crear desde js y pushearlos al DOM HTML. Le damos de parametro id, porque cuando la renderizamos en la function de configweeklyWeather utilizando el forEach tiene como parametro el index. entronces cada vez que lo recorra, va a sumar 1 al id y asi no van a ser 5 tabs iguales. si no que iran del 0 al 4 como deberia ser.
function tabPanelTemplate(id) {
    return `          
    <div class="tabPanel" tabindex="0" aria-labelledby="tab-${id}">
        <div class="dayWeather" id="dayWeather-${id}">
            <ul class="dayWeather-list" id="dayWeather-list-${id}">
                
            </ul>
        </div>
    </div>
    `
}

// function para quitarle el display a los tabs que no sean el primero.
function createTabPanel(id) {
    const $panel = createDOM(tabPanelTemplate(id))
    if (id > 0) {
        $panel.hidden = true
    }
    return $panel
}

// Almacenamos en $container, el elemento html en el que queremos agregar nuevos elementos pero desde el js. Luego recorremos weekList con un forEach y dentro utilizamos la function createDOM y dentro del parametro de esta function le pasamos lo que queremos que se agregue. Luego pusheamos eso que creamos, dentro del html con $container.append($element)
// En esta function tambien iteramos day, para darle las 8 predicciones diarias a cada dia de forma correspondiente.
function configweeklyWeather(weekList) {
    const $container = document.querySelector('.tabs')
    weekList.forEach((day, index) => {
        const $panel = createTabPanel(index)
        $container.append($panel)
        
        const $listTabPanel = document.querySelector(`#dayWeather-list-${index}`)

        day.forEach((weather, weatherIndex) => {
            const $periodTime = createPeriodTime(weather, index, weatherIndex)
            $listTabPanel.append($periodTime)
        })
    })
}

export default async function weeklyWeather() {
    const $container = document.querySelector('.weeklyWeather')

    const { lat, lon, isError } = await getLatLon()
    if (isError) return console.log('Ah ocurrido un error al intentar ubicarte')

    const { isError: weeklyWeatherError, data: weather } = await getWeeklyWeather(lat, lon)
    if (weeklyWeatherError) return console.log('Ha ocurrido un error al intentar traer el pronóstico del clima!')

    const weekList = formatWeekList(weather.list)
    configweeklyWeather(weekList)
    draggable($container)


    const $dayWeatherList = document.querySelectorAll('.dayWeather-item');

    $dayWeatherList.forEach(($dayWeather, index) => {
            $dayWeather.addEventListener('click', handleSelectedDayWeatherClick)
    })

    function handleSelectedDayWeatherClick(event) {
        const $dayWeatherSelected = event.currentTarget
        const $parentTarget = $dayWeatherSelected.parentElement
        const $dayWeatherActive = $parentTarget.querySelector('.dayWeather-item.is-selected')

        const partialId = $dayWeatherSelected.dataset.weatheritem
        const $atmosphericVarSelected = document.getElementById(`atmosphericVar-${partialId}`)
        const $grandParentTarget = $parentTarget.parentElement
        const $atmosphericVarActive = $grandParentTarget.querySelector('.dayWeather-atmosphericVar:not(.is-hidden)')

        if ($dayWeatherActive !== $dayWeatherSelected) {
            $dayWeatherActive.classList.remove('is-selected');
            $dayWeatherSelected.classList.toggle('is-selected');

            $atmosphericVarSelected.classList.remove('is-hidden');
            $atmosphericVarActive.classList.toggle('is-hidden');
        }

    }


}