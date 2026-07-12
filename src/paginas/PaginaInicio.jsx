function PaginaInicio({ usuario }) {
    return (
        <section className="pagina-inicio">
            <div className="bienvenida-inicio">
                <p className="etiqueta-inicio">
                    Panel principal
                </p>

                <h1>
                    Bienvenido, {usuario.firstName}
                </h1>

                <p>
                    Desde este sistema podrás consultar y administrar
                    los productos registrados.
                </p>
            </div>

            <div className="tarjetas-inicio">
                <article className="tarjeta-inicio">
                    <h2>Productos</h2>

                    <p>
                        Consulta los productos disponibles en el sistema.
                    </p>
                </article>

                <article className="tarjeta-inicio">
                    <h2>Administración</h2>

                    <p>
                        Agrega, edita y elimina registros mediante la API.
                    </p>
                </article>

                <article className="tarjeta-inicio">
                    <h2>Equipo 08</h2>

                    <p>
                        Proyecto colaborativo desarrollado con React.
                    </p>
                </article>
            </div>
        </section>
    );
}

export default PaginaInicio;