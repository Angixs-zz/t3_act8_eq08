import React, { useState, useEffect } from "react";
import { X, AlertTriangle, HelpCircle, CheckCircle2 } from "lucide-react"; 
import "../estilos/modales.css";

function ModalEditar({
    producto,
    tituloEditar,
    precioEditar,
    stockEditar,
    setTituloEditar,
    setPrecioEditar,
    setStockEditar,
    onCerrar,
    onGuardar
}) {
    const [paso, setPaso] = useState("formulario");
    const [errorInterno, setErrorInterno] = useState("");

   
useEffect(() => {
    if (producto) {
        setPaso("formulario");
        setErrorInterno("");
    }
}, [producto]);





    if (!producto) return null;

    function manejarValidacion() {
        if (tituloEditar.trim() === "" || precioEditar === "" || stockEditar === "") {
            setErrorInterno("Todos los campos son obligatorios.");
            return;
        }
        setErrorInterno("");
        setPaso("confirmando"); 
    }

    async function manejarConfirmacionReal() {
        try {
            await onGuardar(); 
            setPaso("exito");  
        } catch (error) {
            setErrorInterno(error.message || "Hubo un error al guardar.");
            setPaso("formulario"); 
        }
    }

    return (
        <div className="modal-overlay">
            <div className="modal-contenedor">
                
                {paso === "formulario" && (
                    <>
                        <div className="modal-cabecera">
                            <h3>Editar Producto</h3>
                            <button className="btn-cerrar-modal" onClick={onCerrar}>
                                <X size={20} />
                            </button>
                        </div>
                        
                        <div className="modal-cuerpo">
                            {errorInterno && (
                                <div className="banner-error-interno">
                                    <AlertTriangle size={18} className="icono-alerta-rojo" />
                                    <span>{errorInterno}</span>
                                </div>
                            )}

                            <div className="grupo-formulario">
                                <label htmlFor="tituloEditar">Nombre del producto</label>
                                <input
                                    id="tituloEditar"
                                    type="text"
                                    className="input-modal"
                                    value={tituloEditar}
                                    onChange={(e) => setTituloEditar(e.target.value)}
                                />
                            </div>

                            <div className="fila-formulario-doble">
                                <div className="grupo-formulario">
                                    <label htmlFor="precioEditar">Precio ($)</label>
                                    <input
                                        id="precioEditar"
                                        type="number"
                                        className="input-modal"
                                        value={precioEditar}
                                        onChange={(e) => setPrecioEditar(e.target.value)}
                                    />
                                </div>

                                <div className="grupo-formulario">
                                    <label htmlFor="stockEditar">Stock / Existencias</label>
                                    <input
                                        id="stockEditar"
                                        type="number"
                                        className="input-modal"
                                        value={stockEditar}
                                        onChange={(e) => setStockEditar(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="modal-pie">
                            <button className="btn-modal-cancelar" type="button" onClick={onCerrar}>
                                Cancelar
                            </button>
                            <button className="btn-modal-guardar" type="button" onClick={manejarValidacion}>
                                Guardar cambios
                            </button>
                        </div>
                    </>
                )}

                {paso === "confirmando" && (
                    <>
                        <div className="modal-cuerpo alerta-interna">
                            <div className="icono-alerta-modal-svg azul-info">
                                <HelpCircle size={54} strokeWidth={1.5} />
                            </div>
                            <h3>¿Guardar los cambios?</h3>
                            <p>¿Seguro que deseas aplicar las modificaciones realizadas a este producto?</p>
                        </div>
                        <div className="modal-pie centrar-botones">
                            <button className="btn-modal-cancelar" type="button" onClick={() => setPaso("formulario")}>
                                No, revisar datos
                            </button>
                            <button className="btn-modal-guardar" type="button" onClick={manejarConfirmacionReal}>
                                Sí, confirmar
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
                            <h3>¡Actualizado correctamente!</h3>
                            <p>El producto se ha modificado con éxito en el sistema.</p>
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

export default ModalEditar;