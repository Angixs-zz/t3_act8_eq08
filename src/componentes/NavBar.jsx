import React, { useState } from "react";
import { LogOut, ChevronDown } from "lucide-react"; 
import "../estilos/navbar.css"; // Asegúrate de vincular tu archivo CSS aquí

function NavBar({ usuario, cerrarSesion }) {
    // Estado para controlar si el menú de cerrar sesión está visible
    const [mostrarMenu, setMostrarMenu] = useState(false);

    function alternarMenu() {
        setMostrarMenu(!mostrarMenu);
    }

    return (
        <header className="navbar">
            <div className="navbar-espaciador"></div>

            <div className="navbar-usuario-contenedor">
                <div className="navbar-usuario" onClick={alternarMenu}>
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
                    
                    <ChevronDown size={16} className={`navbar-flecha ${mostrarMenu ? 'rotar' : ''}`} />
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