import React from "react";
import { AlertTriangle } from "lucide-react";
import { PackageX } from "lucide-react";
import { Pencil, Trash2 } from "lucide-react";
import "../estilos/registros.css";

function TablaProductos({
    productos,
    seleccionarEditar,
    seleccionarEliminar,
    cargando,
    error
    }) 
    {


    if (cargando) {
        return (
            <div className="tabla-mensaje-estado cargando">
                <div className="spinner-carga"></div>
                <p>Obteniendo datos del inventario... Por favor, espere.</p>
            </div>
        );
    }

 if (error) {
    return (
        <div className="tabla-mensaje-estado error">
            <AlertTriangle size={32} className="icono-error-lucide" />
            
            <div className="contenido-error">
                <h4>Error al obtener los datos</h4>
                <p>{error}</p>
            </div>
        </div>
    );
}

  if (productos.length === 0) {
    return (
        <div className="tabla-mensaje-estado vacia">
            <PackageX size={32} className="icono-vacio-lucide" />
            <p>No se encontraron productos disponibles en el sistema.</p>
        </div>
    );
}
    
    
    
    
    
    
    
    
    
    
    
   

    return (
        <div className="tabla-contenedor">
            <table className="tabla-registros">
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
                                <td className="td-imagen">
                                    <img
                                        src={producto.thumbnail}
                                        alt={producto.title}
                                        className="producto-miniatura"
                                        width="50"
                                    />
                                </td>

                                <td className="td-titulo font-bold">{producto.title}</td>
                                <td>
                                    <span className="badge-categoria">
                                        {producto.category}
                                    </span>
                                </td>
                                <td className="td-precio">${producto.price}</td>
                                <td className="td-stock">{producto.stock} u.</td>

                               <td className="td-acciones">
                            {/* Envolvemos los botones en este contenedor */}
                            <div className="contenedor-botones-acciones">
                                <button
                                    type="button"
                                    className="btn-accion btn-editar"
                                    title="Editar producto"
                                    onClick={function () {
                                        seleccionarEditar(producto);
                                    }}
                                >
                                    <Pencil size={16} strokeWidth={2} className="icono-btn" />
                                    <span>Editar</span>
                                </button>

                                <button
                                    type="button"
                                    className="btn-accion btn-eliminar"
                                    title="Eliminar producto"
                                    onClick={function () {
                                        seleccionarEliminar(producto);
                                    }}
                                >
                                    <Trash2 size={16} strokeWidth={2} className="icono-btn" />
                                    <span>Eliminar</span>
                                </button>
                            </div>
                        </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default TablaProductos;