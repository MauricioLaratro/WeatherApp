//refactorizamos la funcion que utilizamos para formatear la fecha, ya que la vamos a necesitar en difentes casos y con fechas tambien diferentes.


// variable que indica el formato en el que se mostrara la fecha 
const defaultDateOptions = {
    day: 'numeric',
    weekday: 'long',
    month: 'long',
}

// A los parametros de las funciones se les puede poner un VALOR/ARGUMENTO POR DEFECTO, es decir que sea el valor por defecto a menos que se indique otro nuevo valor al invocar la function. Para eso utilizamos el options = defaultDateOptions, es decir asignamos la variable al argumento, lo que queda por defecto. (Podria ser cualquier otra variable o valor que deseemos).
// Funcion para obtener la fecha actual. La instancia new de intl.datetimeformat, es para formatear la fecha, indicamos que sera en español, le pasamos la variable config como segundo parametro y por ultimo utilizamos el METODO .format, que como parametro le pasamos la variable de la fecha. (Date es un objeto propio de js, solo lo almacenamos en la variagle date, para poder utilizarlo)
export function formatDate(date, options = defaultDateOptions) {
    return new Intl.DateTimeFormat('es', options).format(date)
}


// function para formatear la temperatura. solo le estamos agregando, con un template literal, el simbolo de los grados ° al numero obtenido de value.
// Utilizamos el objeto con la propiedad Math.floor para que redondee el numero de la temperatura y no nos de decimales. (Floor siempre redondea hacia abajo-)
export function formatTemp(value) {
    return `${Math.floor(value)}°`
}

export function formatHumidity(value) {
    return `${value}%`;
}

// multiplicamos el value por 3.6 porque la api nos da el valor de la velocidad del viento expresado en metros por segundo y nosotros lo necesitamos en km.
export function formatWindSpeed(value){
    return `${Math.round(value*3.6)} Km-h`;
}


// fuction para formatear los datos obtenidos por el forecast. Ya que vienen metido en un solo array de 40 elementos y lo que queremos es tenes un array, con otros 5 arrays dentro (1 array por cada dia de la semana a pronosticar) y dentro de cada uno de estos 5, tener 8 objectos, ya que el forecast nos devuelve el pronostico de cada 3 horas para cada dia, es decir 8 pronosticos en diferentes horas del dia.
// para conseguir esto, lo que hacemos almacenar en weekList(constante) y dayList(variable) arrays vacios que al iterar el array de 40 iremos introduciendo elementos y modificando dayList. Esto lo conseguimos al iterar el array de 40, con forEach. Donde lo primero que hacemos es pushear un item dentro de dayList por cada iteracion. Luego dentro de la condicional if, decimos que por cada iteracion le sumemos a index +1 hasta que al dividirlo por 8 su resto sea 0. Una vez cumplida esta condicion, pusheamos, ese dayList de 8 elementos que obtuvimos, detro de weekList y ademas reseteamos dayList para que quede en 0 y vuelva al principio de la iteracion. Por ultimo simplemente retornamos el weekList ya formateado.
export function formatWeekList(rawData) {
    // const weekList = [[], [], [], [], []]
    const weekList = []
    let dayList = []
    rawData.forEach((item, index) => {
        dayList.push(item)
        if ((index + 1) % 8 === 0) {
            weekList.push(dayList)
            dayList = []
        }
    })
    return weekList
}