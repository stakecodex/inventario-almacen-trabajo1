export const Table = ({ data, eliminarData, editarData }) =>{
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

    return (
        <table className="cyber-table">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {data.map((item)=>(
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
    )
}
