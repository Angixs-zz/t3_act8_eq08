import React, { useState } from "react";
import NavBar from "../componentes/NavBar";
import SlideBar from "../componentes/SlideBar";
import PaginaInicio from "./PaginaInicio";
import "../estilos/sistema.css";
import PaginaRegistros from "./PaginaRegistros";

function PaginaSistema({ usuario, cerrarSesion }) {
    const [paginaActual, setPaginaActual] = useState("inicio");

    function cambiarPagina(nuevaPagina) {
        setPaginaActual(nuevaPagina);
    }

    function mostrarPagina() {
        if (paginaActual === "inicio") {
            return <PaginaInicio />;
        }

        if (paginaActual === "registros") {
            return <PaginaRegistros />;
        }

        return null;
    }

    return (
        <div className="sistema">
            <SlideBar
                paginaActual={paginaActual}
                cambiarPagina={cambiarPagina}
                cerrarSesion={cerrarSesion}
            />

            <div className="sistema-contenido">
                <NavBar 
                    usuario={usuario} 
                    cerrarSesion={cerrarSesion} 
                />

                <main className="contenido-principal">
                    {mostrarPagina()}
                </main>
            </div>
        </div>
    );
}

export default PaginaSistema;