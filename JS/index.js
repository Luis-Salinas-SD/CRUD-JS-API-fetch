//Definición de variables
const url = 'https://jsonplaceholder.typicode.com/users/'
const contenedor = document.querySelector('tbody')
let resultados = ''

const modalArticulo = new bootstrap.Modal(document.getElementById('modalArticulo'))
const formArticulo = document.querySelector('form')
const descripcion = document.getElementById('descripcion')
const precio = document.getElementById('precio')
const stock = document.getElementById('stock')
var opcion = ''

btnCrear.addEventListener('click', () => {
    descripcion.value = ''
    precio.value = ''
    stock.value = ''
    modalArticulo.show()
    opcion = 'crear'
})

//funcion para mostrar los resultados
const mostrar = (articulos) => {
    articulos.forEach(articulo => {
        resultados += `<tr>
                            <td>${articulo.id}</td>
                            <td>${articulo.name}</td>
                            <td>${articulo.name}</td>
                            <td>${articulo.name}</td>
                            <td class="text-center">
                                <a class="btnEditar btn btn-primary">Editar</a>
                                <a class="btnBorrar btn btn-danger">Borrar</a> </td>
                        </tr>
                    `
    })
    contenedor.innerHTML = resultados

}

//Procedimiento Mostrar
fetch(url)
    .then(response => response.json())
    .then(data => mostrar(data))
    .catch(error => console.log(error))


const on = (element, event, selector, handler) => {
    element.addEventListener(event, async e => {
        if (e.target.closest(selector)) {
            handler(e)
        }
    })
}

//Procedimiento Borrar
on(document, 'click', '.btnBorrar', e => {
    const fila = e.target.parentNode.parentNode
    const id = fila.firstElementChild.innerHTML
    alertify.confirm("This is a confirm dialog.",
        async function () {
            try {
                const resDelete = await fetch(url + id, {
                    method: 'DELETE',
                    headers: {
                        "Content-type": "application/json; charset=utf-8"
                    }
                })
                const post = await resDelete.json()
                console.log(post);
                //location.reload()
            } catch (error) {
                console.warn(error);
            }
        },
        function () {
            alertify.error('Cancel')
        })
})
