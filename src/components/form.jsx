import { useState } from "react"

export const Formulario = ({valoresIniciales, agregarData}) => {
    const [valores, setValores] = useState(valoresIniciales)
    const {nombre, categoria, cantidad, precio} = valores

    const inputChange = ({ target }) => {
        setValores({
            ...valores,
            [target.name]:target.value,
        })
    }

    const guardar = (e) => {
        e.preventDefault()
        if(nombre.trim() == '' || categoria.trim() == '' || cantidad === '' || precio === '')
            return alert('Complete todos los campos')

        if(Number(cantidad) < 0 || Number(precio) < 0)
            return alert('Cantidad y precio no pueden ser negativos')

        agregarData({
            nombre: nombre.trim(),
            categoria: categoria.trim(),
            cantidad: Number(cantidad),
            precio: Number(precio),
        })
        setValores(valoresIniciales)
    }

    return(
        <form className="cyber-form" onSubmit={guardar}>
            <div>
                <label>Nombre</label>
                <input type="text" name="nombre" value={nombre} onChange={inputChange} />
            </div>

            <div>
                <label>Categoría</label>
                <input type="text" name="categoria" value={categoria} onChange={inputChange} />
            </div>

            <div>
                <label>Cantidad</label>
                <input type="number" min="0" name="cantidad" value={cantidad} onChange={inputChange} />
            </div>

            <div>
                <label>Precio</label>
                <input type="number" min="0" step="1" name="precio" value={precio} onChange={inputChange} />
            </div>

            <button type="submit" className="primary-btn">Guardar</button>
        </form>
    )
}
