import React from "react";
import { Search } from "lucide-react"; 
import "../estilos/registros.css";

function FiltrosProductos({
    busqueda,
    categoriaSeleccionada,
    categorias,
    cambiarBusqueda,
    cambiarCategoria
}) {
    return (
        <div className="barra-filtros-contenedor">
            <div className="grupo-input-busqueda">
                <label htmlFor="busqueda" className="etiqueta-filtro">
                    Buscar producto
                </label>
                <div className="input-con-icono">
                    <Search size={18} className="icono-lupa-busqueda" />
                    <input
                        id="busqueda"
                        type="text"
                        className="input-filtro-texto"
                        placeholder="Escribe el nombre de un producto..."
                        value={busqueda}
                        onChange={cambiarBusqueda}
                    />
                </div>
            </div>

            {/* Filtro por Categorías */}
            <div className="grupo-select-categoria">
                <label htmlFor="categoria" className="etiqueta-filtro">
                    Filtrar por categoría
                </label>
                <select
                    id="categoria"
                    className="select-filtro-opciones"
                    value={categoriaSeleccionada}
                    onChange={cambiarCategoria}
                >
                    <option value="">Todas las categorías</option>
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