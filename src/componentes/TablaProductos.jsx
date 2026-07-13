function TablaProductos({ productos }) {
    if (productos.length === 0) {
        return (
            <p>
                No se encontraron productos.
            </p>
        );
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Imagen</th>
                    <th>Producto</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Acciones</th>
                </tr>
            </thead>

            <tbody>
                {productos.map(function (producto) {
                    return (
                        <tr key={producto.id}>
                            <td>
                                <img
                                    src={producto.thumbnail}
                                    alt={producto.title}
                                    width="50"
                                />
                            </td>

                            <td>{producto.title}</td>
                            <td>{producto.category}</td>
                            <td>${producto.price}</td>
                            <td>{producto.stock}</td>

                            <td>
                                <button type="button">
                                    Editar
                                </button>

                                <button type="button">
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default TablaProductos;