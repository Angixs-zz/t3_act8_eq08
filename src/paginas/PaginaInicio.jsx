import { useEffect, useState } from "react";
import { obtenerProductos } from "../servicios/servicioProductos";
import { Package, AlertTriangle } from "lucide-react";
import "../estilos/inicio.css"; 

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
            <Package size={20} />
        </div>
        <p>Total de productos</p>
                <h2>
            {cargando ? "..." : error ? "--" : productos.length}
        </h2>
    </article>

    <article className="tarjeta-estadistica">
        <div className="tarjeta-icono icono-alerta">
            <AlertTriangle size={20} />
        </div>
        <p>Productos con poco stock</p>
        <h2>
            {cargando ? "..." : error !== "" ? "--" : productosPocoStock.length}
        </h2>
    </article>
</div>
           <section className="registros-recientes">
    <div className="encabezado-registros">
        <h2>Productos recientes</h2>
        <button type="button">Ver todos</button>
    </div>

    <div className="tabla-recientes">
        {/* El encabezado siempre se queda visible para mantener la estructura */}
        <div className="fila encabezado-tabla">
            <span>PRODUCTO</span>
            <span>CATEGORÍA</span>
            <span>PRECIO</span>
            <span>STOCK</span>
        </div>

        {cargando && (
            <div className="fila-mensaje-tabla cargando">
                <span>Cargando los productos más recientes del servidor...</span>
            </div>
        )}

        {!cargando && error !== "" && (
            <div className="fila-mensaje-tabla error">
                <span> Error al conectar con el servidor: {error}</span>
            </div>
        )}

        {!cargando && error === "" && productosRecientes.length === 0 && (
            <div className="fila-mensaje-tabla vacio">
                <span>No se encontraron productos registrados en la tienda.</span>
            </div>
        )}

        {!cargando && error === "" && productosRecientes.map(function (producto) {
            return (
                <div className="fila fila-registro" key={producto.id}>
                    <div className="datos-producto">
                        <img
                            className="imagen-producto-inicio"
                            src={producto.thumbnail}
                            alt={producto.title}
                        />
                        <div>
                            <strong>{producto.title}</strong>
                            <small>ID: {producto.id}</small>
                        </div>
                    </div>

                    <span>{producto.category}</span>
                    <span>${producto.price.toFixed(2)}</span>

                    <span className={obtenerClaseEstado(producto.stock)}>
                        {obtenerEstadoStock(producto.stock)}
                    </span>
                </div>
            );
        })}
    </div>
</section>
</section>
    );
}

export default PaginaInicio;