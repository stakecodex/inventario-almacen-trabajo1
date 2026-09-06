import { useState } from "react"

const validar = (valores) => {
    const errores = {}

    if (!valores.nombre.trim())
        errores.nombre = "El nombre es obligatorio"

    if (!valores.categoria.trim())
        errores.categoria = "La categoría es obligatoria"

    if (valores.cantidad === "")
        errores.cantidad = "Debes ingresar la cantidad"
    else if (!/^\d+$/.test(valores.cantidad))
        errores.cantidad = "La cantidad debe ser un número entero (sin letras ni decimales)"

    if (valores.precio === "")
        errores.precio = "Debes ingresar el precio"
    else if (isNaN(Number(valores.precio)) || Number(valores.precio) < 0)
        errores.precio = "El precio debe ser un número mayor o igual a 0"

    return errores
}

export const Formulario = ({valoresIniciales, agregarData}) => {
    const [valores, setValores] = useState(valoresIniciales)
    const [errores, setErrores] = useState({})
    const {nombre, categoria, cantidad, precio} = valores

    const inputChange = ({ target }) => {
        setValores({
            ...valores,
            [target.name]:target.value,
        })
    }

    const guardar = (e) => {
        e.preventDefault()
        const erroresEncontrados = validar(valores)
        setErrores(erroresEncontrados)
        if (Object.keys(erroresEncontrados).length > 0)
            return

        agregarData({
            nombre: nombre.trim(),
            categoria: categoria.trim(),
            cantidad: Number(cantidad),
            precio: Number(precio),
        })
        setValores(valoresIniciales)
        setErrores({})
    }

    return(
        <form className="cyber-form" onSubmit={guardar} noValidate>
            <div className="campo">
                <label>Nombre</label>
                <input type="text" name="nombre" value={nombre} onChange={inputChange} />
                {errores.nombre && <span className="error-campo">{errores.nombre}</span>}
            </div>

            <div className="campo">
                <label>Categoría</label>
                <input type="text" name="categoria" value={categoria} onChange={inputChange} />
                {errores.categoria && <span className="error-campo">{errores.categoria}</span>}
            </div>

            <div className="campo">
                <label>Cantidad</label>
                <input type="number" min="0" step="1" name="cantidad" value={cantidad} onChange={inputChange} />
                {errores.cantidad && <span className="error-campo">{errores.cantidad}</span>}
            </div>

            <div className="campo">
                <label>Precio</label>
                <input type="number" min="0" step="1" name="precio" value={precio} onChange={inputChange} />
                {errores.precio && <span className="error-campo">{errores.precio}</span>}
            </div>

            <button type="submit" className="primary-btn">Guardar</button>
        </form>
    )
}
