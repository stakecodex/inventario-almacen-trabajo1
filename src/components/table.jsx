import { useMemo, useState } from "react"

const COLUMNAS = [
    { key: "nombre", label: "Nombre" },
    { key: "categoria", label: "Categoría" },
    { key: "cantidad", label: "Cantidad" },
    { key: "precio", label: "Precio" },
]

export const Table = ({ data, eliminarData, editarData }) => {
    const [busqueda, setBusqueda] = useState("")
    const [ordenPor, setOrdenPor] = useState(null)
    const [ordenAsc, setOrdenAsc] = useState(true)

    const eliminar = (id) => {
        const op = window.confirm("¿Desea eliminar el registro?")
        if(op)
            eliminarData(id)
    }

    const editar = (item) => {
        const op = window.confirm("¿Desea editar el registro?")
        if(op)
            editarData(item)
    }

    const cambiarOrden = (columna) => {
        if (ordenPor === columna) {
            setOrdenAsc(!ordenAsc)
        } else {
            setOrdenPor(columna)
            setOrdenAsc(true)
        }
    }

    const datosMostrados = useMemo(() => {
        const texto = busqueda.trim().toLowerCase()
        let resultado = data

        if (texto) {
            resultado = resultado.filter((item) =>
                (item.nombre ?? "").toLowerCase().includes(texto) ||
                (item.categoria ?? "").toLowerCase().includes(texto)
            )
        }

        if (ordenPor) {
            resultado = [...resultado].sort((a, b) => {
                const valorA = a[ordenPor] ?? ""
                const valorB = b[ordenPor] ?? ""
                if (typeof valorA === "number" && typeof valorB === "number")
                    return ordenAsc ? valorA - valorB : valorB - valorA
                return ordenAsc
                    ? String(valorA).localeCompare(String(valorB))
                    : String(valorB).localeCompare(String(valorA))
            })
        }

        return resultado
    }, [data, busqueda, ordenPor, ordenAsc])

    if (data.length === 0)
        return <p className="tabla-vacia">No hay productos registrados.</p>

    return (
        <div>
            <input
                type="text"
                className="buscador"
                placeholder="Buscar por nombre o categoría..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                aria-label="Buscar producto"
            />

            {datosMostrados.length === 0 ? (
                <p className="tabla-vacia">No se encontraron productos para "{busqueda}".</p>
            ) : (
                <table className="cyber-table">
                    <thead>
                        <tr>
                            {COLUMNAS.map((columna) => (
                                <th
                                    key={columna.key}
                                    className="ordenable"
                                    onClick={() => cambiarOrden(columna.key)}
                                >
                                    {columna.label}
                                    {ordenPor === columna.key && (ordenAsc ? " ▲" : " ▼")}
                                </th>
                            ))}
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {datosMostrados.map((item)=>(
                            <tr key={item.id}>
                                <td>{item.nombre}</td>
                                <td>{item.categoria}</td>
                                <td>{item.cantidad}</td>
                                <td>${item.precio}</td>
                                <td>
                                    <div className="actions">
                                        <button className="ghost-btn" onClick={()=>editar(item)}>Editar</button>
                                        <button className="ghost-btn danger" onClick={()=>eliminar(item.id)}>Eliminar</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}
