function NavBar({ usuario }) {
    return (
        <header className="navbar">
            <div className="navbar-buscador">
                <span className="icono-busqueda">⌕</span>

                <input
                    type="text"
                    placeholder="Buscar expedientes o cursos..."
                />
            </div>

            <div className="navbar-usuario">
                <div className="navbar-datos">
                    <p className="navbar-nombre">
                        {usuario.firstName} {usuario.lastName}
                    </p>

                    <p className="navbar-cargo">
                        Administrador escolar
                    </p>
                </div>

                <img
                    src={usuario.image}
                    alt="Foto del usuario"
                    className="navbar-foto"
                />
            </div>
        </header>
    );
}

export default NavBar;