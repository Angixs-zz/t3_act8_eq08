import { useEffect, useState } from "react";
import { obtenerProductos } from "../servicios/servicioProductos";

function PaginaInicio() {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    useEffect(function () {
        cargarProductos();
    }, []);

    async function cargarProductos() {
        try {
            setCargando(true);
            setError("");

            const productosObtenidos = await obtenerProductos();

            setProductos(productosObtenidos);
        } catch (error) {
            setError(error.message);
        } finally {
            setCargando(false);
        }
    }

    const productosRecientes = productos.slice(0, 5);

    const productosPocoStock = productos.filter(function (producto) {
        return producto.stock <= 10;
    });

    function obtenerEstadoStock(stock) {
        if (stock === 0) {
            return "Agotado";
        }

        if (stock <= 10) {
            return "Poco stock";
        }

        return "Disponible";
    }

    function obtenerClaseEstado(stock) {
        if (stock === 0) {
            return "estado-agotado";
        }

        if (stock <= 10) {
            return "estado-poco-stock";
        }

        return "estado-disponible";
    }

    return (
        <section className="pagina-inicio">
            <div className="encabezado-pagina">
                <h1>Administración de tienda</h1>

                <p>
                    Bienvenido al sistema de administración de El Mandadito.
                    Aquí tienes un resumen del inventario actual.
                </p>
            </div>

            <div className="tarjetas-estadisticas">
                <article className="tarjeta-estadistica">
                    <div className="tarjeta-icono">
                        📦
                    </div>

                    <p>Total de productos</p>
                    <h2>{productos.length}</h2>
                </article>

                <article className="tarjeta-estadistica">
                    <div className="tarjeta-icono">
                        ⚠️
                    </div>

                    <p>Productos con poco stock</p>
                    <h2>{productosPocoStock.length}</h2>
                </article>
            </div>

            <section className="registros-recientes">
                <div className="encabezado-registros">
                    <h2>Productos recientes</h2>

                    <button type="button">
                        Ver todos
                    </button>
                </div>

                {cargando && (
                    <p className="mensaje-tabla">
                        Cargando productos...
                    </p>
                )}

                {error !== "" && (
                    <p className="mensaje-error">
                        {error}
                    </p>
                )}

                {!cargando && error === "" && (
                    <div className="tabla-recientes">
                        <div className="fila encabezado-tabla">
                            <span>PRODUCTO</span>
                            <span>CATEGORÍA</span>
                            <span>PRECIO</span>
                            <span>STOCK</span>
                        </div>

                        {productosRecientes.map(function (producto) {
                            return (
                                <div
                                    className="fila fila-registro"
                                    key={producto.id}
                                >
                                    <div className="datos-producto">
                                        <img
                                            className="imagen-producto-inicio"
                                            src={producto.thumbnail}
                                            alt={producto.title}
                                        />

                                        <div>
                                            <strong>
                                                {producto.title}
                                            </strong>

                                            <small>
                                                ID: {producto.id}
                                            </small>
                                        </div>
                                    </div>

                                    <span>
                                        {producto.category}
                                    </span>

                                    <span>
                                        ${producto.price.toFixed(2)}
                                    </span>

                                    <span
                                        className={obtenerClaseEstado(
                                            producto.stock
                                        )}
                                    >
                                        {obtenerEstadoStock(
                                            producto.stock
                                        )}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>
        </section>
    );
}

export default PaginaInicio;