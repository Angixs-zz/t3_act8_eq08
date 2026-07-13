function SlideBar({
    paginaActual,
    cambiarPagina,
    cerrarSesion
}) {
    function irAInicio() {
        cambiarPagina("inicio");
    }

    function irARegistros() {
        cambiarPagina("registros");
    }

    return (
        <aside className="sidebar">
            <div>
                <div className="sidebar-encabezado">
                    <div className="sidebar-logo">
                        LOGO
                    </div>

                    <div>
                        <h2>El mandadito</h2>
                        <p>Tienda de productos variados</p>
                    </div>
                </div>

                <nav className="sidebar-menu">
                    <button
                        type="button"
                        className={
                            paginaActual === "inicio"
                                ? "sidebar-opcion activa"
                                : "sidebar-opcion"
                        }
                        onClick={irAInicio}
                    >
                        <span className="sidebar-icono">I</span>
                        Inicio
                    </button>

                    <button
                        type="button"
                        className={
                            paginaActual === "registros"
                                ? "sidebar-opcion activa"
                                : "sidebar-opcion"
                        }
                        onClick={irARegistros}
                    >
                        <span className="sidebar-icono">I</span>
                        Productos
                    </button>
                </nav>
            </div>

            <button
                type="button"
                className="boton-cerrar-sesion"
                onClick={cerrarSesion}
            >
                <span>↪</span>
                Cerrar sesión
            </button>
        </aside>
    );
}

export default SlideBar;