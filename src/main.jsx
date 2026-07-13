import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' // <-- Asegura que importe App
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App /> {/* <-- Cambia PaginaSistema por App aquí */}
  </React.StrictMode>,
)