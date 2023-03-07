// function donde almacenamos en "viewportBlockSize" el height que obtenemos con getViewport, que es un numero, al cual lo ponemos dentro de un template literal y le agregamos "px" para que establezaca ese blocksize en el elemento correspondiente.
export function setViewportSize($element) {
    const viewportBlockSize = getViewport()
    $element.style.blockSize = `${viewportBlockSize}px`
}

// function creada por mi mismo, ya que cambie lo que abarca el container app y agregue all-app container global y tuve que dar un alto fijo a weekly, entonces para que funcione bien el vh en celulares, debo agregar esta fuction tambien, que utilizar el height actual de la web y le resta el tamaño de weekly. Para asi darle el tamaño idea a app, que solo contiene el background y no envuelve a weekly.
export function setViewportSizeInApp($element) {
    const viewportBlockSize = getViewport()
    $element.style.MaxBlockSize = `calc(${viewportBlockSize}px - var(--weeaklyBlockSize))`
}


// function que sirve para obtener el Height alctual de la web.
export function getViewport() {
    return window.innerHeight
}

// function que sirve para que cambie de manera dinamica el height actual de la web, si es que cambia.
export function onViewportResize(callback) {
    window.addEventListener('resize', callback)
}


// export function offViewportResize(callback) {
//     window.removeEventListener('resize', callback)
// }

// function en la que llamamos a setViewportSize, para que establezca el height al elemento correspondiente. Tambien llamamos a onViewportResize con (() => setViewportSize($element)) como callback en su parametro, para que el heigth se asigne de manera dinamica, por si es que este cambia.
export function ViewportSize($element) {
    setViewportSize($element)

    onViewportResize(() => setViewportSize($element))
}
export function ViewportSizeInApp($element) {
    setViewportSizeInApp($element)

    onViewportResize(() => setViewportSizeInApp($element))
}