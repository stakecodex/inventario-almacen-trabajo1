# Inventario de Almacén — Trabajo 1 (Construcción de Software)

**Estudiante:** José Rodríguez
**Repositorio:** https://github.com/stakecodex/inventario-almacen-trabajo1

## Descripción

Aplicación React (Vite) para gestionar el inventario de un almacén de barrio, con
operaciones CRUD completas (crear, leer, actualizar, eliminar) persistidas en
**Firebase Firestore** en tiempo real (sin `localStorage`).

Cada producto registra: nombre, categoría, cantidad y precio. La interfaz incluye
un formulario reutilizable para crear/editar, una tabla con las acciones de
editar/eliminar, y un panel de resumen con el total de productos, unidades y
valor total del inventario.

## Tecnologías

- React 18 + Vite
- Firebase Firestore (lectura en tiempo real con `onSnapshot`)
- Hooks: `useState`, `useEffect`

## Instalación

1. Instalar dependencias:
   ```
   npm install
   ```

2. Copiar el archivo de variables de entorno de ejemplo:
   ```
   cp .env.example .env
   ```
   (En Windows PowerShell: `Copy-Item .env.example .env`)

3. Crear un proyecto en [console.firebase.google.com](https://console.firebase.google.com),
   habilitar **Firestore Database**, y completar en `.env` las credenciales de tu
   propio proyecto:
   ```
   VITE_FIREBASE_API_KEY=
   VITE_FIREBASE_AUTH_DOMAIN=
   VITE_FIREBASE_PROJECT_ID=
   VITE_FIREBASE_STORAGE_BUCKET=
   VITE_FIREBASE_MESSAGING_SENDER_ID=
   VITE_FIREBASE_APP_ID=
   ```

4. Publicar las reglas de seguridad de `firestore.rules` en la consola de Firebase
   (Firestore Database → Reglas). Estas reglas son solo para desarrollo
   (`allow read, write: if true`) y no deben usarse en producción.

5. Ejecutar en modo desarrollo:
   ```
   npm run dev
   ```

El archivo `.env` **no se sube al repositorio** (está en `.gitignore`); cada
persona que clone el proyecto debe crear el suyo con sus propias credenciales.

## Estructura relevante

```
src/
├── main.jsx              # Punto de entrada, monta el componente raíz
├── inventarioApp.jsx     # Componente "página": estado y funciones que mutan datos
├── components/
│   ├── form.jsx           # Formulario de creación/edición de producto
│   ├── table.jsx          # Listado de productos con acciones
│   └── resumen.jsx        # Panel de resumen del inventario
└── firebase/
    ├── config.js          # Inicialización de Firebase (usa variables de entorno)
    └── productos.js       # CRUD contra la colección "productos" en Firestore
```

## Funcionamiento del CRUD

- **Crear:** el formulario envía los datos a `crearProducto`, que agrega un
  documento a la colección `productos`.
- **Leer:** `suscribirProductos` usa `onSnapshot` para escuchar cambios en tiempo
  real y actualizar la tabla automáticamente.
- **Actualizar:** al presionar "Editar" se precarga el formulario; al guardar,
  se llama a `actualizarProducto` con el `id` del documento.
- **Eliminar:** llama a `eliminarProducto`, que borra el documento por `id`.
