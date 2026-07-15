import React, { useState } from "react";
import { X, AlertTriangle, HelpCircle, CheckCircle2, Plus } from "lucide-react";
import "../estilos/modales.css";

function ModalAgregar({ categorias, onCerrar, onAgregar }) {
    const [paso, setPaso] = useState("formulario");
    const [errorInterno, setErrorInterno] = useState("");

    const [titulo, setTitulo] = useState("");
    const [precio, setPrecio] = useState("");
    const [stock, setStock] = useState("");
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
    const [imagen, setImagen] = useState(null);

        function manejarValidacion() {
            const tituloLimpio = titulo.trim();
            const precioNumero = Number(precio);
            const stockNumero = Number(stock);

            if (
                tituloLimpio === "" ||
                precio === "" ||
                stock === "" ||
                categoriaSeleccionada === ""
            ) {
                setErrorInterno("Todos los campos son obligatorios.");
                return;
            }

            if (tituloLimpio.length < 3) {
                setErrorInterno("El nombre debe tener al menos 3 caracteres.");
                return;
            }

            if (tituloLimpio.length > 80) {
                setErrorInterno("El nombre no puede tener más de 80 caracteres.");
                return;
            }

            if (!Number.isFinite(precioNumero) || precioNumero <= 0) {
                setErrorInterno("El precio debe ser mayor que cero.");
                return;
            }

            if (precioNumero > 1000000) {
                setErrorInterno("El precio ingresado es demasiado alto.");
                return;
            }

            if (!Number.isInteger(stockNumero) || stockNumero < 0) {
                setErrorInterno("El stock debe ser un número entero mayor o igual a cero.");
                return;
            }

            if (stockNumero > 100000) {
                setErrorInterno("El stock ingresado es demasiado alto.");
                return;
            }

            setErrorInterno("");
            setPaso("confirmando");
        }

    async function manejarConfirmacionReal() {
        try {
            const nuevoProducto = {
                title: titulo.trim(),
                price: Number(precio),
                stock: Number(stock),
                category: categoriaSeleccionada,
                thumbnail: imagen ? URL.createObjectURL(imagen) : "https://via.placeholder.com/150"
            };
            
            await onAgregar(nuevoProducto);
            setPaso("exito");
        } catch (error) {
            setErrorInterno(error.message || "Hubo un error al guardar el producto.");
            setPaso("formulario");
        }
    }

    return (
        <div className="modal-overlay">
            <div className="modal-contenedor">
                
            
                {paso === "formulario" && (
                    <>
                        <div className="modal-cabecera">
                            <h3>Agregar Nuevo Producto</h3>
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
                                <label htmlFor="titulo">Nombre del producto</label>
                                <input
                                    id="titulo"
                                    type="text"
                                    className="input-modal"
                                    placeholder="Ej. Máscara de pestañas"
                                    value={titulo}
                                    onChange={(e) => setTitulo(e.target.value)}
                                />
                            </div>

                            <div className="fila-formulario-doble">
                                <div className="grupo-formulario">
                                    <label htmlFor="precio">Precio ($)</label>
                                    <input
                                        id="precio"
                                        type="number"
                                        min="0.01"
                                        step="0.01"
                                        max="1000000"
                                        className="input-modal"
                                        value={precio}
                                        onChange={(evento) => setPrecio(evento.target.value)}
                                    />
                                </div>

                                <div className="grupo-formulario">
                                    <label htmlFor="stock">Stock / Existencias</label>
                                    <input
                                    id="stock"
                                    type="number"
                                    min="0"
                                    step="1"
                                    max="100000"
                                    className="input-modal"
                                    value={stock}
                                    onChange={(evento) => setStock(evento.target.value)}
                                />
                                </div>
                            </div>

                            <div className="grupo-formulario">
                            <label htmlFor="categoria">Categoría</label>
                            <select
                                id="categoria"
                                className="input-modal select-modal"
                                value={categoriaSeleccionada}
                                onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                            >
                                <option value="">-- Selecciona una categoría --</option>
                                {categorias.map((cat, index) => (
                                    <option key={index} value={cat.slug}>
                                        {cat.name} 
                                    </option>
                                ))}
                            </select>
                        </div>
                        </div>

                                                    <div className="grupo-formulario">
                            <label htmlFor="imagen-file">Imagen del producto</label>
                            <input
                                id="imagen-file"
                                type="file"
                                accept="image/*" 
                                className="input-modal input-file-modal"
                                onChange={(e) => setImagen(e.target.files[0])} 
                            />
                            {imagen && (
                                <p className="archivo-seleccionado">
                                     Archivo seleccionado: <strong>{imagen.name}</strong>
                                </p>
                            )}
                        </div>

                        

                        <div className="modal-pie">
                            <button className="btn-modal-cancelar" type="button" onClick={onCerrar}>
                                Cancelar
                            </button>
                            <button className="btn-modal-guardar" type="button" onClick={manejarValidacion}>
                                Registrar producto
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
                            <h3>¿Registrar este producto?</h3>
                            <p>¿Seguro que deseas agregar <strong>{titulo}</strong> al inventario del sistema?</p>
                        </div>
                        <div className="modal-pie centrar-botones">
                            <button className="btn-modal-cancelar" type="button" onClick={() => setPaso("formulario")}>
                                No, revisar datos
                            </button>
                            <button className="btn-modal-guardar" type="button" onClick={manejarConfirmacionReal}>
                                Sí, registrar
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
                            <h3>¡Creado correctamente!</h3>
                            <p>El nuevo producto se ha dado de alta con éxito en el sistema.</p>
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

export default ModalAgregar;