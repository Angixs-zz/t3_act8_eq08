import { useState } from "react";
import { LogOut, ChevronDown, Menu } from "lucide-react";
import "../estilos/navbar.css";

function NavBar({
    usuario,
    cerrarSesion,
    alternarSidebar,
    sidebarAbierto
}) {
    const [mostrarMenu, setMostrarMenu] = useState(false);

    function alternarMenuUsuario() {
        setMostrarMenu(function (estadoActual) {
            return !estadoActual;
        });
    }

    return (
        <header className="navbar">
            <div className="navbar-zona-izquierda">
                <button
                    type="button"
                    className="navbar-boton-menu"
                    onClick={alternarSidebar}
                    title={
                        sidebarAbierto
                            ? "Ocultar menú"
                            : "Mostrar menú"
                    }
                >
                    <Menu size={22} />
                </button>
            </div>

            <div className="navbar-usuario-contenedor">
                <div
                    className="navbar-usuario"
                    onClick={alternarMenuUsuario}
                >
                    <div className="navbar-datos">
                        <p className="navbar-nombre">
                            {usuario?.firstName} {usuario?.lastName}
                        </p>

                        <p className="navbar-cargo">
                            Administrador
                        </p>
                    </div>

                    <img
                        src={usuario?.image}
                        alt="Foto del usuario"
                        className="navbar-foto"
                    />

                    <ChevronDown
                        size={16}
                        className={
                            mostrarMenu
                                ? "navbar-flecha rotar"
                                : "navbar-flecha"
                        }
                    />
                </div>

                {mostrarMenu && (
                    <div className="navbar-dropdown">
                        <button
                            type="button"
                            className="boton-cerrar-sesion"
                            onClick={cerrarSesion}
                        >
                            <span className="sidebar-icono">
                                <LogOut size={18} />
                            </span>

                            Cerrar sesión
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}

export default NavBar;