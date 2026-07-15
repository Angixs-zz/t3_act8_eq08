import { useState } from "react";
import PaginaSistema from "./paginas/PaginaSistema";
import PaginaLogin from "./paginas/PaginaLogin";

function App() {
  const [usuario, setUsuario] = useState(function () {
    const usuarioGuardado = localStorage.getItem("usuario");

    if (usuarioGuardado) {
      return JSON.parse(usuarioGuardado);
    }

    return null;
  });
  const [cargandoLogin, setCargandoLogin] = useState(false);
  const [errorLogin, setErrorLogin] = useState("");

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
      localStorage.setItem("usuario", JSON.stringify(datosUsuario));
    } catch (error) {
      setErrorLogin(error.message);
    } finally {
      setCargandoLogin(false);
    }
  }

  function manejarCerrarSesion() {
    setUsuario(null);
    localStorage.removeItem("usuario");
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