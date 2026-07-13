function Paginacion({
    paginaActual,
    totalPaginas,
    limite,
    paginaAnterior,
    paginaSiguiente,
    cambiarLimite
}) {
    return (
        <div className="paginacion">
            <div className="selector-limite">
                <label htmlFor="limite">
                    Registros por página
                </label>

                <select
                    id="limite"
                    value={limite}
                    onChange={cambiarLimite}
                >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="40">40</option>
                    <option value="50">50</option>
                </select>
            </div>

            <div className="controles-paginacion">
                <button
                    type="button"
                    onClick={paginaAnterior}
                    disabled={paginaActual === 1}
                >
                    Anterior
                </button>

                <span>
                    Página {paginaActual} de {totalPaginas}
                </span>

                <button
                    type="button"
                    onClick={paginaSiguiente}
                    disabled={
                        paginaActual === totalPaginas ||
                        totalPaginas === 0
                    }
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
}

export default Paginacion;