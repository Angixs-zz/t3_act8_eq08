import { useState } from "react";
import  PaginaSistema  from "./paginas/PaginaSistema"; // <-- CON llaves (la de Miguel)
import PaginaLogin from "./paginas/PaginaLogin";     // <-- SIN llaves (la tuya)

function App() {
  const [usuario, setUsuario] = useState(null);
  const [cargandoLogin, setCargandoLogin] = useState(false);
  const [errorLogin, setErrorLogin] = useState("");

  async function manejarLogin(username, password) {
    try {
      setCargandoLogin(true);
      setErrorLogin("");

      // Petición real POST a la API de DummyJSON para la Fase 1
      const respuesta = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      if (!respuesta.ok) {
        throw new Error("Usuario o contraseña incorrectos");
      }

      const datosUsuario = await respuesta.json();
      setUsuario(datosUsuario); // Aquí guardamos el usuario real que regresa la API
    } catch (error) {
      setErrorLogin(error.message);
    } finally {
      setCargandoLogin(false);
    }
  }

  function manejarCerrarSesion() {
    setUsuario(null); // Borra la sesión y nos regresa al login
  }

  return (
    <>
      {!usuario ? (
        <PaginaLogin 
          enviarLogin={manejarLogin} 
          cargando={cargandoLogin} 
          error={errorLogin} 
        />
      ) : (
        <PaginaSistema
          usuario={usuario}
          cerrarSesion={manejarCerrarSesion}
        />
      )}
    </>
  );
}

export default App;