# Laboratorio IV – CRUD de Negocio (React + json-server)

**Universidad Libre · Programación Web · Semestre VI · 2026-II**

Front en React que consume una API ficticia (json-server) con los datos de un
negocio: **productos, clientes, proveedores, compras y ventas**. Implementa un
CRUD completo usando un helper (`helpFetch`) y los hooks `useState` y `useEffect`.
Estilos con Bootstrap 5.

## Estructura
```
db.json                      -> "base de datos" de la API
index.html                   -> maqueta + Bootstrap
src/index.jsx                -> punto de entrada
src/Negocio.jsx              -> página principal con los 5 módulos
src/helpers/helpFetch.js     -> helper de peticiones HTTP
src/components/Crud.jsx      -> lógica CRUD (useState + useEffect)
src/components/CrudForm.jsx  -> crear / editar
src/components/CrudTable.jsx -> listar / eliminar
```

## Ejecución (dos puertos)
```bash
npm install
npm run start     # levanta API (3000) y React (5173)
```
O por separado en dos terminales: `npm run api` y `npm run dev`.

- Front React: http://localhost:5173
- API json-server: http://localhost:3000/productos

## En GitHub Codespaces
Al abrir el puerto 3000 desde la pestaña *Puertos*, ponlo en **Public** y cambia
`BASE_URL` en `src/helpers/helpFetch.js` por la URL pública del puerto 3000.
