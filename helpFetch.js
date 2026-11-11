// Helper: funciones para hablar con la API (json-server)
const URL = "http://localhost:3000";

const pedir = async (ruta, opciones = {}) => {
  try {
    const res = await fetch(`${URL}/${ruta}`, {
      headers: { "Content-Type": "application/json" },
      ...opciones,
      body: opciones.body ? JSON.stringify(opciones.body) : undefined,
    });
    if (!res.ok) return { err: true, msg: `Error ${res.status}` };
    return await res.json();
  } catch {
    return { err: true, msg: "No se pudo conectar con la API (puerto 3000)" };
  }
};

export const helpFetch = {
  get: (tabla) => pedir(tabla),
  post: (tabla, body) => pedir(tabla, { method: "POST", body }),
  put: (tabla, id, body) => pedir(`${tabla}/${id}`, { method: "PUT", body }),
  del: (tabla, id) => pedir(`${tabla}/${id}`, { method: "DELETE" }),
};
