// Utilizamos DOMParser, para que esta function nos sirva para renderizar elementos html desde el js. le pasamos por parametro "string" para que luego, en el lugar donde llamemos a esta function, solo le asignemos al parametro, lo que queramos renderizar. Por ejemplo un <h2>Hola mundo!</h2>.
// utilizamos .body.firstChild en el elemento que creamos con esta function. Por que solo vamos a querer ese elemento, no todo un archivo html nuevo, por lo tanto esto hace que nos devuelva el primer hijo de body, que va a ser el elemnto o contenedor que creemos.
export function createDOM(string) {
    const parser = new DOMParser()
    const HTML = parser.parseFromString(string, "text/html")
    return HTML.body.firstChild
    debugger
}