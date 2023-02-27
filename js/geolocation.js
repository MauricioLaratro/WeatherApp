

// function para saber si geolocation esta disponible o no en el navegador.
function geolocationSupport() {
    if ('geolocation' in navigator){
        return true
    }
    return false

    // tambien se puede hacer esto de una manera resumida de una sola linea de codigo con:
    // return 'geolocation' in navigator    ya que esto tambien devulve un Boolean (true or false).
}


const defaultOptions = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 1000000,
}


// function para obtener la ubicacion actual
// con el if implementamos que si no(!) hay soporte de geolocation, devolvemos el new Error que hemos creado. De lo contrario, es decir que si hay soporte, se pasara esa validacion y se ejecutara el siguiente codigo que es donde obtenemos la geolocation por su metodo .getCurrentPosition().
export function getCurrentPosition(options = defaultOptions) {
    if (!geolocationSupport()) throw new Error('No hay soporte de geolocalización en tu navegador')
    // Creamos una Promise para poder utilizar su metodo .then y asi para poder obtener lat y lon fuera de esta function, ya que esta function es asincrona, ya que debe esperar a obtener la informacion de geolocalizacion.
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) =>{
            const lat = position.coords.latitude
            const lon = position.coords.longitude
            resolve(position)
        },
        // Este es el segundo parametro de nuestra getCurrentPosition y es el reject, es decir lo que se va a activar, en caso de que no podamos obtener la ubicacion del usuario. (lo que deberia suceder en resolve)
        () => {
            reject('No hemos podido obtener tu ubicación!')
        }, 
        options)
    })
}
// esto es lo mismo que la function de arriba pero esta devuleve solo la lat y el lon, en cambio la de arriba devuelve todo el objeto que contiene mas cosas ademas de estas 2.
export async function getLatLon(options = defaultOptions) {
    try {
        const { coords: { latitude: lat, longitude: lon } } = await getCurrentPosition(options)
        return {lat, lon, isError: false }
    }   catch {
        return { isError: true, lat: null, lon: null }
    }
}