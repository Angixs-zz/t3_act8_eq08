function FiltrosProductos({
    busqueda,
    categoriaSeleccionada,
    categorias,
    cambiarBusqueda,
    cambiarCategoria
}) {
    return (
        <div className="filtros-productos">
            <div className="grupo-filtro">
                <label htmlFor="busqueda">
                    Buscar producto
                </label>

                <input
                    id="busqueda"
                    type="text"
                    placeholder="Buscar por nombre"
                    value={busqueda}
                    onChange={cambiarBusqueda}
                />
            </div>

            <div className="grupo-filtro">
                <label htmlFor="categoria">
                    Categoría
                </label>

                <select
                    id="categoria"
                    value={categoriaSeleccionada}
                    onChange={cambiarCategoria}
                >
                    <option value="">
                        Todas las categorías
                    </option>

                    {categorias.map(function (categoria) {
                        return (
                            <option
                                key={categoria.slug}
                                value={categoria.slug}
                            >
                                {categoria.name}
                            </option>
                        );
                    })}
                </select>
            </div>
        </div>
    );
}

export default FiltrosProductos;