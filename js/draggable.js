// almacenamos la configuracion por default de la function draggable
const defaultConfig = {
    open: true,
    debug: true,
    animatable: true,
}
// Function para volver arrastrable la seccion de weeklyWeather, a la cual le pasamos por parametro necesario un $element HTML y un parametro opcional que es cambiar la config default o dejarla como esta.
// Dentro del if lo que hacemos es volverlo una negacion, envolviendo la condicional entre () y agregando el !. Dentro de la condicional, decimos que $element es una instancia de un elemento HTML, como es una negacion, si no se da esa condicion se entrara al if y retornaremos el warning. Si el $element que le pasamos como parametro a la function SI es un elemento HTML, no se entrara al if y por lo tanto se ejecutara con normalidad.
export default function draggable($element, config = defaultConfig) {
    if (!($element instanceof HTMLElement)) {
        return console.warn(`Elemento invalido, se esperaba un HTMLElement y se recibio ${$element}`)
    }

    // variable global en la que almacenamos el la conf open
    let isOpen = config.open
    // variable que usamos para determinar si el elemento se esta arrastrando o no, por defecto no se encuentra arrastrandose.
    let isDragging = false
    // constante global en la que almacenamos el getBoundingClientRect del $element html.
    // getBoundingClientRect es una propiedad que nos trae informacion sobre los tamaños del elemento y demas.
    const elementRect = $element.getBoundingClientRect()
    // constante en la que almacenamos solamente el height de todos los datos que obtenemos de getBoundingClientRect
    const ELEMENT_BLOCK_SIZE = elementRect.height
    // constante en la que almacenamos cualquier elemento dentro de $element que tenga un atributo data-marker
    const $marker = $element.querySelector('[data-marker]')
    // const en la que almacenamos solo el height de $marker
    const MARKER_BLOCK_SIZE = $marker.getBoundingClientRect().height
    // constantes gobales para determinar de cuanto sera el margin negativo que recibira el elemento arrastrable, para que se oculte o se mueste.
    const VISIBLE_Y_POSITION = 0
    const HIDDEN_Y_POSITION = ELEMENT_BLOCK_SIZE - MARKER_BLOCK_SIZE
    // variable global en la que almacenamos alguna de las constantes que muestran u ocultan el elemento, por defecto esta visible.
    let widgetPosition = VISIBLE_Y_POSITION
    // Utilizamos el operador ternario "?" para decir que el valor true de isOpen es open() y el valor false es close()
    isOpen ? open() : close()

    // variable en la que almacenamos en que posicion inicia y.
    let startY = 0
    // Todos los eventos que necesitamos para esconder o mostrar la semana, tanto en pc como en mobile.
    $marker.addEventListener('click', handleClick)
    $marker.addEventListener('pointerdown', handlePointerDown)
    $marker.addEventListener('pointerup', handlePointerUp)
    $marker.addEventListener('pointerout', handlePointerOut)
    $marker.addEventListener('pointercancel', handlePointerCancel)
    $marker.addEventListener('pointermove', handlePointerMove)

    // todas las funciones para los eventos de mostrar o esconder la semana.
    function handleClick(event) {
        logger('CLICK')
        toggle()
    }
    function handlePointerDown(event) {
        logger('Pointer DOWN')
        startDrag(event)
    }
    function handlePointerUp() {
        logger('Pointer UP')
        dragEnd()
    }
    function handlePointerOut() {
        logger('Pointer OUT')
        dragEnd()
    }
    function handlePointerCancel() {
        logger('Pointer CANCEL')
        dragEnd()
    }
    function handlePointerMove(event) {
        logger('Pointer MOVE')
        drag(event)
    }

    // validacion para decir que si el elemento no se encuentra arrastrandose, valide una vez mas si no esta open que lo abra, del o contrario que lo cierre.
    function toggle() {
        if (!isDragging) {
            if (!isOpen) {
                return open()
            }
            return close()
        }
    }
    // validacion para que solo a los elementos que sean arrastrables, se le establezcan las configuraciones de la animacion de arrastrar.
    if (config.animatable) {
        setAnimations()
    }
    // funciton para determinar el tiempo que durara la animacion de bajar el elemento.
    function setAnimations() {
        $element.style.transition = 'margin-bottom .3s'
    }
    // funciton en la que se valida si el arrastrado al terminar no supera la mitad del elemento, simplemente lo vuelva a abrrir, osea que cancele el ocultamiento. Pero si si se supera ese limite, que esconda por completo el elemento.
    function bounce() {
        if (widgetPosition < ELEMENT_BLOCK_SIZE / 2) {
            return open()
        }
        return close()
    }
    // function que le pasamos a los eventos de soltar el arrastrado, para determinar que el arrastrado ah terminado.
    function dragEnd() {
        logger('DRAG END')
        isDragging = false
        bounce()
    }

    // functions de iniciar el arrastrado.
    function pageY(event) {
        return event.pageY || event.touches[0].pageY
    }
    function startDrag(event) {
        isDragging = true
        startY = pageY(event)
    }

    // function logger muestra los mensajes de info (que es similar a un console.log), pero solo si la functon de draggable esta en modo debug = true.
    function logger(message) {
        if (config.debug) {
            console.info(message)
        }
    }
    // function para determinar como se ve el elemento cuando esta visible
    function open() {
        logger('Abrir widget')
        isOpen = true
        widgetPosition = VISIBLE_Y_POSITION
        setWidgetPosition(widgetPosition)
    }
    // function para determinar como se ve el elemento cuando NO esta visible
    function close() {
        logger('Cerrar widget')
        isOpen = false
        widgetPosition = HIDDEN_Y_POSITION
        setWidgetPosition(widgetPosition)
    }
    // fucntion que asigna el valor de menos cuantos pixeles va a tener el margin-botton del elemento arrastrable.
    function setWidgetPosition(value) {
        $element.style.marginBottom = `-${value}px`
    }
    // function determinar que el movimiento se inicie con la diferencia de el inicio de Y y el movimiento de cursorY
    function drag(event) {
        const cursorY = pageY(event)
        const movementY = cursorY - startY
        // reasigname el valor de widgetPosition para que sea el widgetPosition inicial mas el movimiento que hayamos hecho en Y
        widgetPosition = widgetPosition + movementY
        // revalorizamos startY para que sea igual a cursorY que es el valor en donde deje de arrastrarlo, asi el evento no inicia siempre desde 0, osea desde arriba del todo.
        startY = cursorY
        // validacion para determinar que si widgetPosition es mayor que HIDDEN_Y_POSITION, es decir que nuestro arrastre esta siendo mayor que la posicion oculta del elemento, deje de arrastrar. Para darle un limite al arrastrado.
        if (widgetPosition > HIDDEN_Y_POSITION) {
            return false
        }
        setWidgetPosition(widgetPosition)
    }
}