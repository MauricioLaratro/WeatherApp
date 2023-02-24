

// function para saber si geolocation esta disponible o no en el navegador.
function geolocationSupport() {
    if ('geolocation' in navigator){
        return true
    }
    return false

    // tambien se puede hacer esto de una manera resumida de una sola linea de codigo con:
    // return 'geolocation' in navigator    ya que esto tambien devulve un Boolean (true or false).
}


// function para obtener la ubicacion actual
// con el if implementamos que si no(!) hay soporte de geolocation, devolvemos el new Error que hemos creado. De lo contrario, es decir que si hay soporte, se pasara esa validacion y se ejecutara el siguiente codigo que es donde obtenemos la geolocation por su metodo .getCurrentPosition().
export function getCurrentPosition() {
    if (!geolocationSupport()) throw new Error('No hay soporte de geolocalización en tu navegador')

    navigator.geolocation.getCurrentPosition((position) =>{
        const lat = position.coords.latitude
        const lon = position.coords.longitude
    })
}