import React from "react";
import { Home, Package, LogOut } from "lucide-react"; 
import logoImg from "../assets/logoabarrotes.jpg"; 
import "../estilos/sidebar.css"; 

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
            <div className="sidebar-contenido-superior">
                
                {/* Encabezado con clases alineadas al CSS */}
                <div className="sidebar-encabezado">
                    <div className="sidebar-logo-contenedor">
                        <img 
                            src={logoImg} 
                            alt="Logo El mandadito" 
                            className="sidebar-logo-img"
                        />
                    </div>

                    <div className="sidebar-info-tienda">
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