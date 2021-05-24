//&Definición de variables
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

//#funcion para mostrar los resultados
const mostrar = (articulos) => {
    //console.log(articulos.results);
    articulos.forEach(articulo => {
        resultados += `<tr>
                            <td>${articulo.id}</td>
                            <td>${articulo.name}</td>
                            <td>${articulo.username}</td>
                            <td>${articulo.email}</td>
                            <td class="text-center">
                                <a class="btnEditar btn btn-primary">Editar</a>
                                <a class="btnBorrar btn btn-danger">Borrar</a> </td>
                        </tr>
                    `
    })
    contenedor.innerHTML = resultados

}

//#Procedimiento Mostrar
fetch(url)
    .then(response => response.json())
    .then(data => mostrar(data))
    .catch(error => console.log(error))

//& Funcion on
const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e)
        }
    })
}

//&Procedimiento Borrar
on(document, 'click', '.btnBorrar', e => {
    const fila = e.target.closest('tr')
    const id = fila.firstElementChild.innerHTML
    alertify.confirm("Estas seguro de eliminar este registro?",
        function () {
            fetch(url + id, {
                method: 'DELETE'
            })
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    }
                    throw 'Error en la peticion'
                })
                .then(data => {
                    fila.remove()
                    console.log('Dato borrado: ' + url + id);
                })
                .catch(error => {
                    console.log(error);
                })
            alertify.success('Borrado')

        },
        function () {
            alertify.error('Cancelado')
        })
})

//&Procedimiento Editar

let idForm = 0

on(document, 'click', '.btnEditar', e => {
    //caputrar la fila
    const fila = e.target.closest('tr');
    //Capturar los datos
    const idForm = fila.children[0].innerHTML,
        descripcionForm = fila.children[1].innerHTML,
        precioForm = fila.children[2].innerHTML,
        stockForm = fila.children[3].innerHTML;
    //Se envian los datos al input
    descripcion.value = descripcionForm
    precio.value = precioForm
    stock.value = stockForm

    opcion = 'editar'
    modalArticulo.show()
})
