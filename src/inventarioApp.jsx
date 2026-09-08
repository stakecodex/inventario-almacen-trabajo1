import { useEffect, useState } from "react"
import { Formulario } from "./components/form"
import { Table } from "./components/table"
import { Resumen } from "./components/resumen"
import { suscribirProductos, crearProducto, actualizarProducto, eliminarProducto } from "./firebase/productos"
import "./assets/styles.css"

const valoresIniciales = {
    nombre: "",
    categoria: "",
    cantidad: "",
    precio: "",
}

export const InventarioApp = () => {
    const [data, setData] = useState([])
    const [cargando, setCargando] = useState(true)
    const [errorSync, setErrorSync] = useState(null)
    const [formData, setFormData] = useState(valoresIniciales)
    const [productoEditando, setProductoEditando] = useState(null)

    useEffect(() => {
        const unsubscribe = suscribirProductos(
            (productos) => {
                setData(productos)
                setCargando(false)
                setErrorSync(null)
            },
            (error) => {
                console.error("Error al sincronizar productos:", error)
                setCargando(false)
                setErrorSync("No se pudo conectar con la base de datos. Verifica tu conexión y recarga la página.")
            }
        )
        return () => unsubscribe()
    }, [])

    const agregarData = async (valores) => {
        if (productoEditando) {
            await actualizarProducto(productoEditando.id, valores)
            setProductoEditando(null)
        } else {
            await crearProducto(valores)
        }
        setFormData(valoresIniciales)
    }

    const eliminarData = async (id) => {
        try {
            await eliminarProducto(id)
        } catch {
            window.alert("No se pudo eliminar el producto. Verifica tu conexión e intenta de nuevo.")
        }
    }

    const editarData = (item) => {
        setFormData({
            nombre: item.nombre ?? "",
            categoria: item.categoria ?? "",
            cantidad: item.cantidad !== undefined && item.cantidad !== null ? String(item.cantidad) : "",
            precio: item.precio !== undefined && item.precio !== null ? String(item.precio) : "",
        })
        setProductoEditando(item)
    }

    const cancelarEdicion = () => {
        setFormData(valoresIniciales)
        setProductoEditando(null)
    }

    return(
        <div className="cyberpunk-app">
            <header className="app-header">
                <p className="eyebrow">La tiendita de Pepe</p>
                <h1>Inventario de Almacén</h1>
            </header>

            {errorSync && <p className="error-campo">{errorSync}</p>}

            {cargando ? (
                <p className="loading">Cargando inventario...</p>
            ) : (
                <div className="dashboard-grid">
                    <section className="panel">
                        <h2>Formulario</h2>
                        <Formulario
                            key={productoEditando ? productoEditando.id : "nuevo"}
                            valoresIniciales={formData}
                            agregarData={agregarData}
                            editando={!!productoEditando}
                            onCancelar={cancelarEdicion}
                        />
                    </section>

                    <section className="panel">
                        <h2>Tabla</h2>
                        <Table data={data} eliminarData={eliminarData} editarData={editarData}/>
                    </section>

                    <Resumen data={data} />
                </div>
            )}
        </div>
    )
}
