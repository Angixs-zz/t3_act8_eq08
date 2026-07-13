import { useState } from "react";
import "../estilos/login.css";
import logotipo from "../assets/abarrotes.jpg"; 
import iconoMail from "../assets/correo.jpg"; 
import iconoCandado from "../assets/candado.png"; 
import logoabarrotes from "../assets/logoabarrotes.jpg";
import { Eye, EyeOff } from "lucide-react";


function PaginaLogin({ enviarLogin, cargando, error }) {
  const [usuario, setUsuario] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [mostrarContrasenia, setMostrarContrasenia] = useState(false);
  const [errorValidacion, setErrorValidacion] = useState("");

  function manejarEnvio(evento) {
    evento.preventDefault();
    setErrorValidacion("");

  
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
        
        
        <div className="login-panel-izquierdo">
          <div className="login-marco-escudo">
            <img src={logotipo} alt="Logo abarrotes" className="login-logo-img" />
          </div>
        </div>

     
        <div className="login-panel-derecho">
          
          <div className="login-encabezado-header">
            <img 
            src={logoabarrotes} 
            alt="Logo El Mandadito" 
            className="login-logo-header-chiquito" 
            />
            <span className="login-marca-texto">El Mandadito</span>
        </div>

          <form onSubmit={manejarEnvio} className="login-formulario-flujo">
            <h1 className="login-titulo-principal">Iniciar sesión</h1>
            <p className="login-subtitulo">Accede al sistema de administración escolar</p>

       
            {errorValidacion && <p className="login-alerta-error">{errorValidacion}</p>}
            {error && <p className="login-alerta-error">{error}</p>}

                    <div className="login-campo-grupo">
            <label htmlFor="usuario">Correo institucional</label>
            <div className="login-input-con-icono">
                
                <span className="login-input-icono">
                <img src={iconoMail} alt="Icono de correo" />
                </span>
              
                
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
                <span className="login-input-icono">
                <img src={iconoCandado} alt="Icono de Candado" />


                </span>


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
                {mostrarContrasenia ? (
                    <EyeOff size={20} className="icono-ojo-lucide" />
                ) : (
                    <Eye size={20} className="icono-ojo-lucide" />
                )}
                </button>
              </div>
            </div>

           
            <div className="login-opciones-adicionales">
              <label className="login-checkbox-label">
                <input type="checkbox" />
                <span>Recordar sesión</span>
              </label>
              <a href="#olvide" className="login-enlace-olvide">¿Olvidaste tu contraseña?</a>
            </div>

            <button type="submit" className="login-boton-entrar" disabled={cargando}>
              {cargando ? "Cargando..." : "Entrar"}
            </button>

            
          </form>
        </div>

      </div>
    </div>
  );
}

export default PaginaLogin;