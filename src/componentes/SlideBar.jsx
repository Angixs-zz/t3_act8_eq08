function SlideBar({ cambiarPagina, paginaActual }) {
    return (
        <aside className="sidebar">
            <h2 className="sidebar-titulo">Sistema</h2>

            <nav className="sidebar-menu">
                <button
                    type="button"
                    className={
                        paginaActual === "inicio"
                            ? "sidebar-opcion activa"
                            : "sidebar-opcion"
                    }
                    onClick={function () {
                        cambiarPagina("inicio");
                    }}
                >
                    Inicio
                </button>

                <button
                    type="button"
                    className={
                        paginaActual === "registros"
                            ? "sidebar-opcion activa"
                            : "sidebar-opcion"
                    }
                    onClick={function () {
                        cambiarPagina("registros");
                    }}
                >
                    Registros
                </button>
            </nav>
        </aside>
    );
}

export default SlideBar;