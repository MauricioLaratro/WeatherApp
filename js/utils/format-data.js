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
// Utilizamos el objeto con la propiedad Math.floor para que redondee el numero de la temperatura y no nos de decimales. (Floor siempre redondea hacia abajo)
export function formatTemp(value) {
    return `${Math.floor(value)}°`
}