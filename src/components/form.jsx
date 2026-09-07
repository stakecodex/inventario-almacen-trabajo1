import { useState } from "react"

const MAX_TEXTO = 60
const MAX_NUMERO = 1_000_000

const REGEX_LETRAS = /^[A-Za-zÁÉÍÓÚÑÜáéíóúñü\s]+$/
const REGEX_ENTERO = /^\d+$/
const REGEX_DECIMAL = /^\d+(\.\d+)?$/

const soloLetras = (texto) => texto.replace(/[^A-Za-zÁÉÍÓÚÑÜáéíóúñü\s]/g, "")

const soloDigitos = (texto) => texto.replace(/\D/g, "")

const soloDecimal = (texto) => {
    let limpio = texto.replace(/[^\d.]/g, "")
    const partes = limpio.split(".")
    if (partes.length > 2)
        limpio = partes[0] + "." + partes.slice(1).join("")
    return limpio
}

const validar = (valores) => {
    const errores = {}
    const nombre = valores.nombre.trim()
    const categoria = valores.categoria.trim()
    const cantidad = valores.cantidad.trim()
    const precio = valores.precio.trim()

    if (!nombre)
        errores.nombre = "El nombre es obligatorio"
    else if (nombre.length > MAX_TEXTO)
        errores.nombre = `Máximo ${MAX_TEXTO} caracteres`
    else if (!REGEX_LETRAS.test(nombre))
        errores.nombre = "El nombre solo puede contener letras"

    if (!categoria)
        errores.categoria = "La categoría es obligatoria"
    else if (categoria.length > MAX_TEXTO)
        errores.categoria = `Máximo ${MAX_TEXTO} caracteres`
    else if (!REGEX_LETRAS.test(categoria))
        errores.categoria = "La categoría solo puede contener letras"

    if (!cantidad)
        errores.cantidad = "Debes ingresar la cantidad"
    else if (!REGEX_ENTERO.test(cantidad))
        errores.cantidad = "La cantidad debe ser un número entero (sin letras ni decimales)"
    else if (Number(cantidad) > MAX_NUMERO)
        errores.cantidad = `La cantidad no puede superar ${MAX_NUMERO.toLocaleString("es-CL")}`

    if (!precio)
        errores.precio = "Debes ingresar el precio"
    else if (!REGEX_DECIMAL.test(precio))
        errores.precio = "El precio debe ser un número válido (usa punto para decimales)"
    else if (Number(precio) > MAX_NUMERO)
        errores.precio = `El precio no puede superar ${MAX_NUMERO.toLocaleString("es-CL")}`

    return errores
}

export const Formulario = ({valoresIniciales, agregarData, editando, onCancelar}) => {
    const [valores, setValores] = useState(valoresIniciales)
    const [errores, setErrores] = useState({})
    const [guardando, setGuardando] = useState(false)
    const {nombre, categoria, cantidad, precio} = valores

    const nombreListo = nombre.trim().length > 0
    const categoriaListo = categoria.trim().length > 0
    const cantidadListo = cantidad.trim().length > 0

    const inputChange = ({ target }) => {
        let valor = target.value

        if (target.name === "nombre" || target.name === "categoria")
            valor = soloLetras(valor)
        else if (target.name === "cantidad")
            valor = soloDigitos(valor)
        else if (target.name === "precio")
            valor = soloDecimal(valor)

        setValores({
            ...valores,
            [target.name]: valor,
        })
    }

    const guardar = async (e) => {
        e.preventDefault()
        const erroresEncontrados = validar(valores)
        setErrores(erroresEncontrados)
        if (Object.keys(erroresEncontrados).length > 0)
            return

        setGuardando(true)
        try {
            await agregarData({
                nombre: nombre.trim(),
                categoria: categoria.trim(),
                cantidad: Number(cantidad),
                precio: Number(precio),
            })
            setValores(valoresIniciales)
            setErrores({})
        } catch {
            setErrores({ general: "No se pudo guardar el producto. Verifica tu conexión e intenta de nuevo." })
        } finally {
            setGuardando(false)
        }
    }

    return(
        <form className="cyber-form" onSubmit={guardar} noValidate>
            <div className="campo">
                <label htmlFor="campo-nombre">Nombre</label>
                <input id="campo-nombre" type="text" name="nombre" maxLength={MAX_TEXTO} value={nombre} onChange={inputChange} />
                {errores.nombre && <span className="error-campo">{errores.nombre}</span>}
            </div>

            <div className="campo">
                <label htmlFor="campo-categoria">Categoría</label>
                <input id="campo-categoria" type="text" name="categoria" maxLength={MAX_TEXTO} value={categoria} onChange={inputChange} disabled={!nombreListo} />
                {errores.categoria && <span className="error-campo">{errores.categoria}</span>}
            </div>

            <div className="campo">
                <label htmlFor="campo-cantidad">Cantidad</label>
                <input id="campo-cantidad" type="text" inputMode="numeric" name="cantidad" value={cantidad} onChange={inputChange} disabled={!categoriaListo} />
                {errores.cantidad && <span className="error-campo">{errores.cantidad}</span>}
            </div>

            <div className="campo">
                <label htmlFor="campo-precio">Precio</label>
                <input id="campo-precio" type="text" inputMode="decimal" name="precio" value={precio} onChange={inputChange} disabled={!cantidadListo} />
                {errores.precio && <span className="error-campo">{errores.precio}</span>}
            </div>

            {errores.general && <span className="error-campo">{errores.general}</span>}

            <div className="actions-form">
                <button type="submit" className="primary-btn" disabled={guardando}>
                    {guardando ? "Guardando..." : editando ? "Guardar cambios" : "Guardar"}
                </button>
                {editando && (
                    <button type="button" className="ghost-btn" onClick={onCancelar} disabled={guardando}>
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    )
}
