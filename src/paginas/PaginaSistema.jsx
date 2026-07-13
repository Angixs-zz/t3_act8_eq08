import React from "react";

function PaginaSistema({ usuario, cerrarSesion }) {
  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif", textAlign: "center" }}>
      <h1>🎓 ControlTec - Panel Principal</h1>
      <p>¡Bienvenido al sistema de administración escolar!</p>
      
      <div style={{ margin: "30px card", padding: "20px", background: "#f0f2f5", borderRadius: "12px", display: "inline-block" }}>
        <img 
          src={usuario?.image} 
          alt="Perfil" 
          style={{ width: "80px", height: "80px", borderRadius: "50%", border: "3px solid #0052cc" }} 
        />
        <h2>{usuario?.firstName} {usuario?.lastName}</h2>
        <p style={{ color: "#666" }}>{usuario?.email}</p>
      </div>

      <br />
      <button 
        onClick={cerrarSesion} 
        style={{ padding: "10px 20px", backgroundColor: "#dc3545", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" }}
      >
        Cerrar sesión
      </button>
    </div>
  );
}

export default PaginaSistema;