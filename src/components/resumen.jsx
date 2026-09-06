export const Resumen = ({ data }) => {
    const totalProductos = data.length
    const totalUnidades = data.reduce((acc, item) => acc + Number(item.cantidad || 0), 0)
    const valorTotal = data.reduce((acc, item) => acc + Number(item.cantidad || 0) * Number(item.precio || 0), 0)

    return (
        <section className="panel resumen">
            <h2>Resumen del inventario</h2>
            <div className="resumen-grid">
                <div className="resumen-card">
                    <span className="valor">{totalProductos}</span>
                    <span className="etiqueta">Productos distintos</span>
                </div>
                <div className="resumen-card">
                    <span className="valor">{totalUnidades}</span>
                    <span className="etiqueta">Unidades totales</span>
                </div>
                <div className="resumen-card">
                    <span className="valor">${valorTotal.toLocaleString("es-CL")}</span>
                    <span className="etiqueta">Valor total inventario</span>
                </div>
            </div>
        </section>
    )
}
