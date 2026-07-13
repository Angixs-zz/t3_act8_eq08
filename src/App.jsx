import { useState } from "react";
import PaginaSistema from "./paginas/PaginaSistema"; 
import PaginaLogin from "./paginas/PaginaLogin";    

function App() {
  const [usuario, setUsuario] = useState(null);
  const [cargandoLogin, setCargandoLogin] = useState(false);
  const [errorLogin, setErrorLogin] = useState("");

  // Tu función real que conecta a internet con la API
  async function manejarLogin(username, password) {
    try {
      setCargandoLogin(true);
      setErrorLogin("");

      const respuesta = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      if (!respuesta.ok) {
        throw new Error("Usuario o contraseña incorrectos");
      }

      const datosUsuario = await respuesta.json();
      setUsuario(datosUsuario); 
    } catch (error) {
      setErrorLogin(error.message);
    } finally {
      setCargandoLogin(false);
    }
  }

  // Tu función para destruir la sesión al salir
  function manejarCerrarSesion() {
    setUsuario(null);
  }

  return (
    <>
      {!usuario ? (
        // Si no hay usuario, se muestra tu pantalla de Login funcional
        <PaginaLogin 
          enviarLogin={manejarLogin} 
          cargando={cargandoLogin} 
          error={errorLogin} 
        />
      ) : (
        // Si el usuario es correcto, lo deja pasar a la PaginaSistema de Miguel
        // Pasándole el usuario real de la API y tu función de cerrar sesión
        <PaginaSistema
          usuario={usuario}
          cerrarSesion={manejarCerrarSesion}
        />
      )}
    </>
  );
}

export default App;