import {
    addDoc, collection, deleteDoc, doc,
    onSnapshot, orderBy, query, updateDoc,
} from "firebase/firestore"
import { db } from "./config"

const productosRef = collection(db, "productos")

// Read en tiempo real
export const suscribirProductos = (callback, onError) => {
    const q = query(productosRef, orderBy("creadoEn", "desc"))
    return onSnapshot(q, (snapshot) => {
        const productos = snapshot.docs.map((docSnap) => ({
            id: docSnap.id,
            ...docSnap.data(),
        }))
        callback(productos)
    }, onError)
}

// Create
export const crearProducto = (valores) => {
    return addDoc(productosRef, { ...valores, creadoEn: Date.now() })
}

// Update
export const actualizarProducto = (id, valores) => {
    const productoDoc = doc(db, "productos", id)
    return updateDoc(productoDoc, { ...valores })
}

// Delete
export const eliminarProducto = (id) => {
    const productoDoc = doc(db, "productos", id)
    return deleteDoc(productoDoc)
}
