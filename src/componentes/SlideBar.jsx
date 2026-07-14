import { Home, Package, X } from "lucide-react";
import logoImg from "../assets/logoabarrotes.jpg";
import "../estilos/sidebar.css";

function SlideBar({
    paginaActual,
    cambiarPagina,
    sidebarAbierto,
    cerrarSidebar
}) {
    function irAInicio() {
        cambiarPagina("inicio");
    }

    function irARegistros() {
        cambiarPagina("registros");
    }

    return (
        <aside
            className={
                sidebarAbierto
                    ? "sidebar sidebar-abierto"
                    : "sidebar sidebar-oculto"
            }
        >
            <div className="sidebar-contenido-superior">
                <div className="sidebar-encabezado">
                    <div className="sidebar-logo-contenedor">
                        <img
                            src={logoImg}
                            alt="Logo El Mandadito"
                            className="sidebar-logo-img"
                        />
                    </div>

                    <div className="sidebar-info-tienda">
                        <h2>El Mandadito</h2>
                        <p>Tienda de productos variados</p>
                    </div>

                    <button
                        type="button"
                        className="sidebar-boton-cerrar"
                        onClick={cerrarSidebar}
                        title="Ocultar menú"
                    >
                        <X size={20} />
                    </button>
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
                        <span className="sidebar-icono">
                            <Home size={18} />
                        </span>

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
                        <span className="sidebar-icono">
                            <Package size={18} />
                        </span>

                        Productos
                    </button>
                </nav>
            </div>
        </aside>
    );
}

export default SlideBar;