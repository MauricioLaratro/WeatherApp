// La diferencia entre querySelector y querySelectorAll, es que querySelector solo hace referecnia a la primer coincidencia que encuentre, en cambioquerySelectorAll trae todas las coincidencias que encuentre.
// almacenamos el container de tabs y todos los tabs en variables.
const $tabContainer = document.querySelector('#tabs')
const $tabList = $tabContainer.querySelectorAll('.tab')
// almacenamos un nuevo objeto de fecha en la constante today
const today = new Date()
// almacenamos la fecha actual que obtenemos con today.getDay() (que es un method propio de los objetos de fecha). Dentro de un let weekday. (Lo hacemos dentro de let porque en la function que lo vamos a utilizar, le vamos a dar nuevos valores)
let weekday = today.getDay()
// almacenamos un array que dentro de este guardamos los nombres de los dias de la semana, para luego matchearlos, en la arrow function del forEach de $tabList, con los numeros que obtenemos de weekday.
const week= [
    'Domingo',
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sabado',
]
// function para que cada vez que se recorra un tab abajo en el forEach, se le sume 1, asi avanzan los dias en cada tab y tambien le ponemos una condicional de que si llega a 6 vuelva a 0, porque solo hay dias de 0 al 6.
function nextDay(day) {
    if (day === 6) {
        return 0
    }
    return day + 1
}

// recocrremos el tabList, ya querySelectorAll nos devuelve un nodeList y a los nodeList se les puede aplicar el method .forEach y dentro del arrow function que recibr como parametro. cambiamos el textContent de todos los tabs
// como week es un array, podemos consultar sus elementos almacenados con numeros. Y como weekday, nos esta devolviendo un numero, podemos hacer lo siguiente: week[weekday] para que corresponda con el nombre del dia actual
// con weekday = nextDay(weekday) estamos redeclarando week day, con la function de nextDay y utilizando el mismo weekday como parametro (es decir el dia actual que es weekday)
// Dentro del if establecemos que el primer elemento que esta indexado dentro de tabList (es decir el index 0) que seria el dia actual, en vez de decir el nombre que le asignamos al numero que le corresponda al dia actual, diga "Hoy". Retornamos false, para que detenga la ejecucion de toda la arrow fucntion en ese momento, luego cuando itere por los siguientes dias, como no van a ser el 0 indexado. se ejecutara lo que sigue debajo del if y seguiran teniendo los nombres de los dias que les corresponden.
// en el evento que agregamos es de la fuction de handleSelectTabClick, aprovechando que ya estamos iterando los tabs aca, lo metemos dentro de este forEach.
$tabList.forEach(($tab, index) => {
    $tab.addEventListener('click', handleSelectTabClick)
    if (index === 0) {
        $tab.textContent = 'Hoy'
        weekday = nextDay(weekday)
        return false
    }
    $tab.textContent = week[weekday]
    weekday = nextDay(weekday)
})

// esta function es para que al tocar en los dias de la semana de arriba, cambie el tab de los climas segun las horas de ese dia. Y lo hacemos almacenando en constantes, el event.target (que es el elemento que al dar click detona el evento). Tambien almacenamos el id de ese elemento detonante y ese id lo enlazamos en tabPanel, haciendo que coincida el numero de aria-labelledby=n que tinen los tabPanel en html, con el numero de id del tab seleccionado. Una vez que coinciden lo que hace la function es quitarle el atributo hidden a esa coincidencia encontrada. por lo que se mostrara el tabPanel deseado. Ademas le damos el atributo hidden a los tabs que no estan seleccionados.
// en esta function tambien le quitamos el atributo "aria-selected" a una vez que cambiamos de tab y le asignamos ese aria-selected al tab al que hicimos click. Para asi saber a que dia corresponden los tabs que estamos viendo actualmente.
function handleSelectTabClick(event) {
    const $tabSelected = event.target
    const $tabActive = document.querySelector('.tab[aria-selected="true"]')
    $tabActive.removeAttribute('aria-selected')
    $tabSelected.setAttribute('aria-selected', true)

    const id = $tabSelected.id
    const $tabPanel = document.querySelector(`[aria-labelledby=${id}]`)
    const $tabPanelSelected = document.querySelector(`.tabPanel:not([hidden])`)
    $tabPanel.hidden = false
    $tabPanelSelected.hidden = true
}