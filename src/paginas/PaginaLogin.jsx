import { useState } from "react";
import "../estilos/login.css";
import escudoUniversidad from "../assets/hero.png"; 

function PaginaLogin({ enviarLogin, cargando, error }) {
  // Estados locales completamente en español
  const [usuario, setUsuario] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [mostrarContrasenia, setMostrarContrasenia] = useState(false);
  const [errorValidacion, setErrorValidacion] = useState("");

  function manejarEnvio(evento) {
    evento.preventDefault();
    setErrorValidacion("");

    // Validación obligatoria en español
    if (usuario.trim() === "" || contrasenia.trim() === "") {
      setErrorValidacion("Por favor, rellene todos los campos.");
      return;
    }

    // Enviamos los datos al método del componente padre
    enviarLogin(usuario, contrasenia);
  }

  return (
    <div className="login-pantalla-completa">
      <div className="login-tarjeta-contenedor">
        
        {/* PARTE IZQUIERDA: Panel Azul con el Escudo */}
        <div className="login-panel-izquierdo">
          <div className="login-marco-escudo">
            <img src={escudoUniversidad} alt="Escudo Universitario" className="login-escudo-img" />
          </div>
        </div>

        {/* PARTE DERECHA: Formulario */}
        <div className="login-panel-derecho">
          <div className="login-encabezado-header">
            <span className="login-marca-texto">ControlTec</span>
            <div className="login-icono-graduacion">🎓</div>
          </div>

          <form onSubmit={manejarEnvio} className="login-formulario-flujo">
            <h1 className="login-titulo-principal">Iniciar sesión</h1>
            <p className="login-subtitulo">Accede al sistema de administración escolar</p>

            {/* Alertas de Error */}
            {errorValidacion && <p className="login-alerta-error">{errorValidacion}</p>}
            {error && <p className="login-alerta-error">{error}</p>}

            <div className="login-campo-grupo">
              <label htmlFor="usuario">Correo institucional</label>
              <div className="login-input-con-icono">
                <span className="login-input-icono">✉️</span>
                <input
                  id="usuario"
                  type="text"
                  placeholder="nombre@colegio.edu.mx"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  disabled={cargando}
                />
              </div>
            </div>

            <div className="login-campo-grupo">
              <label htmlFor="contrasenia">Contraseña</label>
              <div className="login-input-con-icono">
                <span className="login-input-icono">🔒</span>
                <input
                  id="contrasenia"
                  type={mostrarContrasenia ? "text" : "password"}
                  placeholder="••••••••"
                  value={contrasenia}
                  onChange={(e) => setContrasenia(e.target.value)}
                  disabled={cargando}
                />
                <button
                  type="button"
                  className="login-boton-ojo"
                  onClick={() => setMostrarContrasenia(!mostrarContrasenia)}
                >
                  {mostrarContrasenia ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            {/* Fila de Recordar / Olvidaste Contraseña */}
            <div className="login-opciones-adicionales">
              <label className="login-checkbox-label">
                <input type="checkbox" />
                <span>Recordar sesión</span>
              </label>
              <a href="#olvide" className="login-enlace-olvide">¿Olvidaste tu contraseña?</a>
            </div>

            <button type="submit" className="login-boton-entrar" disabled={cargando}>
              {cargando ? "Cargando..." : "Entrar →"}
            </button>

            <p className="login-soporte-texto">
              ¿Necesitas ayuda técnica? <a href="#soporte">Solicítalo aquí</a>
            </p>
          </form>
        </div>

      </div>
    </div>
  );
}

export default PaginaLogin;