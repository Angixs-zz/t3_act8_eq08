const URL_PRODUCTOS = "https://dummyjson.com/products?limit=0";
const URL_CATEGORIAS = "https://dummyjson.com/products/categories";

export async function obtenerProductos() {
    const respuesta = await fetch(URL_PRODUCTOS);

    if (!respuesta.ok) {
        throw new Error("No se pudieron obtener los productos");
    }

    const datos = await respuesta.json();

    return datos.products;
}


export async function obtenerCategorias() {
    const respuesta = await fetch(URL_CATEGORIAS);

    if (!respuesta.ok) {
        throw new Error("No se pudieron obtener las categorías");
    }

    const categorias = await respuesta.json();

    return categorias;
}

export async function agregarProducto(datosProducto) {
    const respuesta = await fetch(
        "https://dummyjson.com/products/add",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datosProducto)
        }
    );

    if (!respuesta.ok) {
        throw new Error("No se pudo agregar el producto");
    }

    const productoCreado = await respuesta.json();

    return productoCreado;
}

export async function editarProducto(idProducto, datosProducto) {
    const respuesta = await fetch(
        `https://dummyjson.com/products/${idProducto}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datosProducto)
        }
    );

    if (!respuesta.ok) {
        throw new Error("No se pudo editar el producto");
    }

    const productoEditado = await respuesta.json();

    return productoEditado;
}

export async function eliminarProducto(idProducto) {
    const respuesta = await fetch(
        `https://dummyjson.com/products/${idProducto}`,
        {
            method: "DELETE"
        }
    );

    if (!respuesta.ok) {
        throw new Error("No se pudo eliminar el producto");
    }

    const productoEliminado = await respuesta.json();

    return productoEliminado;
}