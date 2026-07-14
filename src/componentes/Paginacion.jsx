import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; 
import "../estilos/registros.css";

function Paginacion({
    paginaActual,
    totalPaginas,
    limite,
    paginaAnterior,
    paginaSiguiente,
    cambiarLimite
}) {
    const ultimaPagina = totalPaginas > 0 ? totalPaginas : 1;

    return (
        <div className="contenedor-paginacion">
            <div className="selector-limite">
                <label htmlFor="limite">Registros por página:</label>
                <select
                    id="limite"
                    className="select-limite-registros"
                    value={limite}
                    onChange={cambiarLimite}
                >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="40">40</option>
                    <option value="50">50</option>
                </select>
            </div>

            <div className="bloque-botones-paginacion">
                <button
                    type="button"
                    className="btn-paginacion"
                    onClick={paginaAnterior}
                    disabled={paginaActual === 1}
                    title="Página anterior"
                >
                    <ChevronLeft size={18} />
                    <span>Anterior</span>
                </button>

                <div className="info-paginacion">
                    Página <span>{paginaActual}</span> de <span>{ultimaPagina}</span>
                </div>

                <button
                    type="button"
                    className="btn-paginacion"
                    onClick={paginaSiguiente}
                    disabled={paginaActual === ultimaPagina || totalPaginas === 0}
                    title="Página siguiente"
                >
                    <span>Siguiente</span>
                    <ChevronRight size={18} />
                </button>
            </div>
        </div>
    );
}

export default Paginacion;