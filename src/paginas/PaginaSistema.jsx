import { useState } from "react";
import NavBar from "../componentes/NavBar";
import Sidebar from "../componentes/Sidebar";
import PaginaInicio from "./PaginaInicio";
import PaginaRegistros from "./PaginaRegistros";
import "../estilos/sistema.css";

function PaginaSistema({ usuario, cerrarSesion }) {
    const [paginaActual, setPaginaActual] = useState("inicio");
    const [sidebarAbierto, setSidebarAbierto] = useState(true);

    function cambiarPagina(nuevaPagina) {
        setPaginaActual(nuevaPagina);
    }

    function alternarSidebar() {
        setSidebarAbierto(function (estadoActual) {
            return !estadoActual;
        });
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
            <Sidebar
                paginaActual={paginaActual}
                cambiarPagina={cambiarPagina}
                sidebarAbierto={sidebarAbierto}
                cerrarSidebar={alternarSidebar}
            />

            <div
                className={
                    sidebarAbierto
                        ? "sistema-contenido"
                        : "sistema-contenido sidebar-cerrado"
                }
            >
                <NavBar
                    usuario={usuario}
                    cerrarSesion={cerrarSesion}
                    alternarSidebar={alternarSidebar}
                    sidebarAbierto={sidebarAbierto}
                />

                <main className="contenido-principal">
                    {mostrarPagina()}
                </main>
            </div>
        </div>
    );
}

export default PaginaSistema;