import PaginaSistema from "./paginas/PaginaSistema";

function App() {
  const usuarioPrueba = {
    firstName: "Miguel",
    lastName: "Hernández",
    email: "miguel@controltec.edu.mx",
    image: "https://dummyjson.com/icon/emilys/128"
  };

  function cerrarSesionTemporal() {
    alert("El cierre de sesión se conectará después con el login.");
  }

  return (
    <PaginaSistema
      usuario={usuarioPrueba}
      cerrarSesion={cerrarSesionTemporal}
    />
  );
}

export default App;