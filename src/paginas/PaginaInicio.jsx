function PaginaInicio() {
    const registrosRecientes = [
        {
            id: 1,
            iniciales: "AL",
            nombre: "Ana López",
            matricula: "22161001",
            curso: "Programación Web",
            fecha: "Hoy, 09:15 AM"
        },
        {
            id: 2,
            iniciales: "PS",
            nombre: "Paco Suárez",
            matricula: "23145678",
            curso: "Programación Web",
            fecha: "Hoy, 09:15 AM"
        },
        {
            id: 3,
            iniciales: "JH",
            nombre: "Juan Hernández",
            matricula: "34567564",
            curso: "Programación Web",
            fecha: "Hoy, 09:15 AM"
        },
        {
            id: 4,
            iniciales: "ST",
            nombre: "Silvia Torres",
            matricula: "23145907",
            curso: "Programación Web",
            fecha: "Hoy, 09:15 AM"
        },
        {
            id: 5,
            iniciales: "SM",
            nombre: "Sandra Mónica",
            matricula: "24567890",
            curso: "Programación Web",
            fecha: "Hoy, 09:15 AM"
        }
    ];

    return (
        <section className="pagina-inicio">
            <div className="encabezado-pagina">
                <h1>Administración Escolar</h1>

                <p>
                    Bienvenido al sistema de administración escolar.
                    Aquí tienes un resumen de la actividad de hoy.
                </p>
            </div>

            <div className="tarjetas-estadisticas">
                <article className="tarjeta-estadistica">
                    <div className="tarjeta-icono">
                        👥
                    </div>

                    <p>Total de estudiantes</p>
                    <h2>1,248</h2>
                </article>

                <article className="tarjeta-estadistica">
                    <div className="tarjeta-icono">
                        🎓
                    </div>

                    <p>Docentes registrados</p>
                    <h2>86</h2>
                </article>
            </div>

            <section className="registros-recientes">
                <div className="encabezado-registros">
                    <h2>Registros recientes</h2>

                    <button type="button">
                        Ver todos
                    </button>
                </div>

                <div className="tabla-recientes">
                    <div className="fila encabezado-tabla">
                        <span>ESTUDIANTE</span>
                        <span>CURSO</span>
                        <span>FECHA</span>
                        <span>ESTADO</span>
                    </div>

                    {registrosRecientes.map(function (registro) {
                        return (
                            <div
                                className="fila fila-registro"
                                key={registro.id}
                            >
                                <div className="datos-estudiante">
                                    <div className="avatar-iniciales">
                                        {registro.iniciales}
                                    </div>

                                    <div>
                                        <strong>
                                            {registro.nombre}
                                        </strong>

                                        <small>
                                            {registro.matricula}
                                        </small>
                                    </div>
                                </div>

                                <span>{registro.curso}</span>

                                <span>{registro.fecha}</span>

                                <span className="estado-completado">
                                    Completado
                                </span>
                            </div>
                        );
                    })}
                </div>
            </section>
        </section>
    );
}

export default PaginaInicio;