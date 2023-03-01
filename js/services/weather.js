import { BASE_API, API_KEY } from '../constants.js'


// Estamos obteniendo la info de la ubicacion actual, utilizando fetch en el api de current weather, lo almacenamos dentro de una async function y lo exportamos al js principal del modulo, tambien le indicamos que la promesa que va a devolver esta async function espere con el await.
// agregamos &units=metric al final de la url de la api para que transforme los ° kelvin en ° centigrados.
export async function getCurrentWeather(lat, lon){
    const response = await fetch(`${BASE_API}weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    if (!response.ok) return {
        isError: true,
        data: null
    }
    // response que es la info que nos traemos, viene por defecto en formato json, por lo tanto tiene el method .json activado, este method devuelve una promisse
    // lo que tendremos en data sera la info dentro del mismo objeto en formato .json, que teniamos al consultar la web api directamente en el navegador.
    const data = await response.json()
    // retornamos el mismo objeto que arriba, pero le damos false al error ya que habremos pasado la anterior validacion y devolvemos el objeto data.
    return {
        isError: false,
        data: data
    }
}