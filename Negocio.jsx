import { useState, useEffect } from "react";
import { helpFetch } from "./helpFetch";

// Cada tabla del negocio con sus campos
const tablas = {
  productos: ["nombre", "precio", "stock"],
  clientes: ["nombre", "telefono", "email"],
  proveedores: ["nombre", "telefono", "ciudad"],
  compras: ["proveedor", "producto", "cantidad", "total"],
  ventas: ["cliente", "producto", "cantidad", "total"],
};

export default function Negocio() {
  const [tabla, setTabla] = useState("productos");
  const [datos, setDatos] = useState([]);
  const [form, setForm] = useState({});
  const [editando, setEditando] = useState(null);
  const [error, setError] = useState("");

  const campos = tablas[tabla];

  // READ: carga los datos al cambiar de tabla
  useEffect(() => {
    setForm({});
    setEditando(null);
    helpFetch.get(tabla).then((res) => {
      if (res.err) {
        setError(res.msg);
        setDatos([]);
      } else {
        setError("");
        setDatos(res);
      }
    });
  }, [tabla]);

  const cambiar = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // CREATE y UPDATE
  const guardar = async (e) => {
    e.preventDefault();
    if (editando) {
      const res = await helpFetch.put(tabla, editando, form);
      if (res.err) return setError(res.msg);
      setDatos(datos.map((d) => (d.id === editando ? res : d)));
    } else {
      const res = await helpFetch.post(tabla, form);
      if (res.err) return setError(res.msg);
      setDatos([...datos, res]);
    }
    setError("");
    setForm({});
    setEditando(null);
  };

  const editar = (d) => {
    setForm(d);
    setEditando(d.id);
  };

  // DELETE
  const eliminar = async (id) => {
    const res = await helpFetch.del(tabla, id);
    if (res.err) return setError(res.msg);
    setDatos(datos.filter((d) => d.id !== id));
  };

  return (
    <div className="container py-4">
      <h1 className="mb-3">Negocio ULibre</h1>

      <select
        className="form-select mb-3 w-auto"
        value={tabla}
        onChange={(e) => setTabla(e.target.value)}
      >
        {Object.keys(tablas).map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={guardar} className="row g-2 mb-4">
        {campos.map((c) => (
          <div className="col" key={c}>
            <input
              className="form-control"
              name={c}
              placeholder={c}
              value={form[c] ?? ""}
              onChange={cambiar}
              required
            />
          </div>
        ))}
        <div className="col-auto">
          <button className="btn btn-primary">{editando ? "Guardar" : "Agregar"}</button>
        </div>
      </form>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            {campos.map((c) => <th key={c}>{c}</th>)}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {datos.map((d) => (
            <tr key={d.id}>
              <td>{d.id}</td>
              {campos.map((c) => <td key={c}>{d[c]}</td>)}
              <td className="text-end">
                <button className="btn btn-sm btn-warning me-2" onClick={() => editar(d)}>Editar</button>
                <button className="btn btn-sm btn-danger" onClick={() => eliminar(d.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
