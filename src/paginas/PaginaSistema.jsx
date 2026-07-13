import { useState } from "react";
import NavBar from "../componentes/NavBar";
import SlideBar from "../componentes/SlideBar";
import PaginaInicio from "./PaginaInicio";
import "../estilos/sistema.css";

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
            return (
                <section>
                    <h1>Gestión de estudiantes</h1>
                    <p>La tabla se integrará más adelante.</p>
                </section>
            );
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
                <NavBar usuario={usuario} />

                <main className="contenido-principal">
                    {mostrarPagina()}
                </main>
            </div>
        </div>
    );
}

export default PaginaSistema;