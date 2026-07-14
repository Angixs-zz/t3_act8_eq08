import React, { useState, useEffect } from "react";
import { Trash2, CheckCircle2 } from "lucide-react"; 
import "../estilos/modales.css";

function ModalEliminar({ producto, onCerrar, onConfirmar }) {
    // Controla qué pantalla mostrar: "confirmar" o "exito"
    const [paso, setPaso] = useState("confirmar");
    const [errorInterno, setErrorInterno] = useState("");

    useEffect(() => {
        if (producto) {
            setPaso("confirmar");
            setErrorInterno("");
        }
    }, [producto]);

    if (!producto) return null;

    async function manejarEliminacionReal() {
        try {
            await onConfirmar(); 
            setPaso("exito");    
        } catch (error) {
            setErrorInterno(error.message || "Hubo un error al eliminar el producto.");
        }
    }

    return (
        <div className="modal-overlay">
            <div className="modal-contenedor">
                
                {paso === "confirmar" && (
                    <>
                        <div className="modal-cabecera">
                            <h3>Eliminar Producto</h3>
                            <button className="btn-cerrar-modal" onClick={onCerrar}>✕</button>
                        </div>

                        <div className="modal-cuerpo alerta-interna">
                            <div className="icono-alerta-modal-svg rojo-eliminar">
                                <Trash2 size={54} strokeWidth={1.5} />
                            </div>
                            <h3>¿Eliminar este producto?</h3>
                            
                            {errorInterno && (
                                <div className="banner-error-interno" style={{ marginBottom: "12px" }}>
                                </div>
                            )}

                            <p>
                                Estás a punto de borrar permanentemente el producto:<br />
                                <strong>{producto.title}</strong>.<br />
                                Esta acción no se puede deshacer.
                            </p>
                        </div>
                        
                        <div className="modal-pie centrar-botones">
                            <button className="btn-modal-cancelar" type="button" onClick={onCerrar}>
                                No, cancelar
                            </button>
                            <button className="btn-modal-eliminar-confirmar" type="button" onClick={manejarEliminacionReal}>
                                Sí, eliminar
                            </button>
                        </div>
                    </>
                )}

                {paso === "exito" && (
                    <>
                        <div className="modal-cuerpo alerta-interna">
                            <div className="icono-alerta-modal-svg verde-exito">
                                <CheckCircle2 size={54} strokeWidth={1.5} />
                            </div>
                            <h3>¡Eliminado correctamente!</h3>
                            <p>El producto se ha removido con éxito del sistema.</p>
                        </div>
                        <div className="modal-pie centrar-botones">
                            <button className="btn-modal-ok-final" type="button" onClick={onCerrar}>
                                Entendido
                            </button>
                        </div>
                    </>
                )}

            </div>
        </div>
    );
}

export default ModalEliminar;