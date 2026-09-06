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
    const [formData, setFormData] = useState(valoresIniciales)
    const [productoEditando, setProductoEditando] = useState(null)

    useEffect(() => {
        const unsubscribe = suscribirProductos((productos) => {
            setData(productos)
            setCargando(false)
        })
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
        await eliminarProducto(id)
    }

    const editarData = (item) => {
        setFormData({
            nombre: item.nombre,
            categoria: item.categoria,
            cantidad: item.cantidad,
            precio: item.precio,
        })
        setProductoEditando(item)
    }

    return(
        <div className="cyberpunk-app">
            <header className="app-header">
                <p className="eyebrow">Neon dashboard</p>
                <h1>Inventario de Almacén</h1>
            </header>

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
