// creamos un diccionario, que lo que hace es identificar elementos, en este caso segun el id que nos da la web API externa que usamos para obtener el clima actual dinamicamente, lo transformamos en numeros y esos numeros los transformamos en un string con el tipo de clima.

export const weatherConditionsCodes = {
    2: 'rainy',
    3: 'drizzle',
    5: 'rainy',
    6: 'snow',
    7: 'cloudy',
    8: 'clean',
}