import { useEffect, useState } from "react";
import {
    obtenerProductos,
    obtenerCategorias,
    eliminarProducto
} from "../servicios/servicioProductos";
import Paginacion from "../componentes/Paginacion";
import FiltrosProductos from "../componentes/FiltrosProductos";
import TablaProductos from "../componentes/TablaProductos";

function PaginaRegistros() {
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");
    const [busqueda, setBusqueda] = useState("");
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
    const [productoEditar, setProductoEditar] = useState(null);
    const [productoEliminar, setProductoEliminar] = useState(null);
    const parametrosIniciales = new URLSearchParams(
        window.location.search
    );

    const paginaInicial =
        Number(parametrosIniciales.get("page")) || 1;

    const limiteInicial =
        Number(parametrosIniciales.get("limit")) || 10;

    const [paginaActual, setPaginaActual] = useState(
        paginaInicial
    );

    const [limite, setLimite] = useState(
        limiteInicial
    );

    useEffect(function () {
        async function cargarDatos() {
            try {
                setCargando(true);
                setError("");

                const productosObtenidos = await obtenerProductos();
                const categoriasObtenidas = await obtenerCategorias();

                setProductos(productosObtenidos);
                setCategorias(categoriasObtenidas);
            } catch (error) {
                setError(error.message);
            } finally {
                setCargando(false);
            }
        }

        cargarDatos();
    }, []);

    useEffect(function () {
        function manejarNavegacion() {
            const parametros = new URLSearchParams(
                window.location.search
            );

            const nuevaPagina =
                Number(parametros.get("page")) || 1;

            const nuevoLimite =
                Number(parametros.get("limit")) || 10;

            setPaginaActual(nuevaPagina);
            setLimite(nuevoLimite);
        }

        window.addEventListener(
            "popstate",
            manejarNavegacion
        );

        return function () {
            window.removeEventListener(
                "popstate",
                manejarNavegacion
            );
        };
    }, []);

    const productosFiltrados = productos.filter(function (producto) {
        const coincideBusqueda = producto.title
            .toLowerCase()
            .includes(busqueda.toLowerCase());

        const coincideCategoria =
            categoriaSeleccionada === "" ||
            producto.category === categoriaSeleccionada;

        return coincideBusqueda && coincideCategoria;
    });

    const totalPaginas = Math.ceil(
        productosFiltrados.length / limite
    );

    useEffect(function () {
        if (cargando || error !== "") {
            return;
        }

        const ultimaPagina =
            totalPaginas > 0 ? totalPaginas : 1;

        let paginaCorregida = paginaActual;

        if (paginaActual < 1) {
            paginaCorregida = 1;
        }

        if (paginaActual > ultimaPagina) {
            paginaCorregida = ultimaPagina;
        }

        if (paginaCorregida !== paginaActual) {
            const temporizador = setTimeout(function () {
                setPaginaActual(paginaCorregida);

                const url = new URL(window.location.href);

                url.searchParams.set(
                    "page",
                    paginaCorregida
                );

                url.searchParams.set(
                    "limit",
                    limite
                );

                window.history.replaceState(
                    {},
                    "",
                    url
                );
            }, 0);

            return function () {
                clearTimeout(temporizador);
            };
        }
    }, [
        paginaActual,
        totalPaginas,
        limite,
        cargando,
        error
    ]);

    if (cargando) {
        return (
            <section>
                <h1>Gestión de productos</h1>
                <p>Cargando productos...</p>
            </section>
        );
    }

    if (error !== "") {
        return (
            <section>
                <h1>Gestión de productos</h1>
                <p>{error}</p>
            </section>
        );
    }

    const indiceInicial = (paginaActual - 1) * limite;
    const indiceFinal = indiceInicial + limite;

    const productosPagina = productosFiltrados.slice(
        indiceInicial,
        indiceFinal
    );

    function actualizarUrl(nuevaPagina, nuevoLimite) {
        const url = new URL(window.location.href);

        url.searchParams.set("page", nuevaPagina);
        url.searchParams.set("limit", nuevoLimite);

        window.history.pushState({}, "", url);
    }

    function paginaAnterior() {
        if (paginaActual > 1) {
            const nuevaPagina = paginaActual - 1;

            setPaginaActual(nuevaPagina);
            actualizarUrl(nuevaPagina, limite);
        }
    }

    function paginaSiguiente() {
        if (paginaActual < totalPaginas) {
            const nuevaPagina = paginaActual + 1;

            setPaginaActual(nuevaPagina);
            actualizarUrl(nuevaPagina, limite);
        }
    }

    function cambiarLimite(evento) {
        const nuevoLimite = Number(evento.target.value);

        setLimite(nuevoLimite);
        setPaginaActual(1);
        actualizarUrl(1, nuevoLimite);
    }

    function cambiarBusqueda(evento) {
        setBusqueda(evento.target.value);
        setPaginaActual(1);
        actualizarUrl(1, limite);
    }

    function cambiarCategoria(evento) {
        setCategoriaSeleccionada(evento.target.value);
        setPaginaActual(1);
        actualizarUrl(1, limite);
    }

    function seleccionarProductoEditar(producto) {
        setProductoEditar(producto);
    }

    function seleccionarProductoEliminar(producto) {
        setProductoEliminar(producto);
    }

    async function confirmarEliminacion() {
        if (productoEliminar === null) {
            return;
        }

        const confirmar = window.confirm(
            "¿Seguro que deseas eliminar el producto " +
            productoEliminar.title +
            "?"
        );

        if (!confirmar) {
            return;
        }

        try {
            await eliminarProducto(productoEliminar.id);

            setProductos(function (productosActuales) {
                return productosActuales.filter(function (producto) {
                    return producto.id !== productoEliminar.id;
                });
            });

            setProductoEliminar(null);

            alert("El producto se eliminó correctamente.");
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <section>
            <h1>Gestión de productos</h1>

            <FiltrosProductos
                busqueda={busqueda}
                categoriaSeleccionada={categoriaSeleccionada}
                categorias={categorias}
                cambiarBusqueda={cambiarBusqueda}
                cambiarCategoria={cambiarCategoria}
            />

            <p>
                Productos encontrados: {productosFiltrados.length}
            </p>

            <TablaProductos
                productos={productosPagina}
                seleccionarEditar={seleccionarProductoEditar}
                seleccionarEliminar={seleccionarProductoEliminar}
            />

            {productoEditar !== null && (
                <p>
                    Producto seleccionado para editar:{" "}
                    {productoEditar.title}
                </p>
            )}

            {productoEliminar !== null && (
                <div>
                    <p>
                        Producto seleccionado para eliminar:{" "}
                        {productoEliminar.title}
                    </p>

                    <button
                        type="button"
                        onClick={confirmarEliminacion}
                    >
                        Confirmar eliminación
                    </button>

                    <button
                        type="button"
                        onClick={function () {
                            setProductoEliminar(null);
                        }}
                    >
                        Cancelar
                    </button>
                </div>
            )}

            <Paginacion
                paginaActual={paginaActual}
                totalPaginas={totalPaginas}
                limite={limite}
                paginaAnterior={paginaAnterior}
                paginaSiguiente={paginaSiguiente}
                cambiarLimite={cambiarLimite}
            />

            <p>
                Productos mostrados: {productosPagina.length}
            </p>
        </section>
    );
}

export default PaginaRegistros;