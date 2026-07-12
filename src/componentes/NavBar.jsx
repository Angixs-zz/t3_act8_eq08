function NavBar({ usuario, cerrarSesion }) {
    return (
        <header className="navbar">
            <div className="navbar-usuario">
                <img
                    src={usuario.image}
                    alt="Foto del usuario"
                    className="navbar-imagen"
                />

                <div>
                    <p className="navbar-nombre">
                        {usuario.firstName} {usuario.lastName}
                    </p>

                    <p className="navbar-correo">
                        {usuario.email}
                    </p>
                </div>
            </div>

            <button
                type="button"
                className="boton-cerrar-sesion"
                onClick={cerrarSesion}
            >
                Cerrar sesión
            </button>
        </header>
    );
}

export default NavBar;