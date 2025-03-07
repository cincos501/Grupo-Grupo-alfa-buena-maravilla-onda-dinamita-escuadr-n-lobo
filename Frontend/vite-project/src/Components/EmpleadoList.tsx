import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Empleado {
  idUsuario: number;
  nombre: string;
  rol: string;
  telefono: string;
  correo: string;
  username: string;
}

const EmpleadoList: React.FC = () => {
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editEmpleadoId, setEditEmpleadoId] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState<Empleado | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    cargarEmpleados();
  }, []);

  const cargarEmpleados = async () => {
    try {
      setLoading(true);
      const response = await axios.get<Empleado[]>("https://localhost:7160/api/Usuarios");
      setEmpleados(response.data);
    } catch (error) {
      console.error("Error al cargar los empleados", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEliminarEmpleado = async (id: number) => {
    try {
      await axios.delete(`https://localhost:7160/api/Usuarios/${id}`);
      setEmpleados(empleados.filter((empleado) => empleado.idUsuario !== id));
    } catch (error) {
      console.error("Error al eliminar el empleado", error);
    }
  };

  const handleEditarEmpleado = (empleado: Empleado) => {
    setEditEmpleadoId(empleado.idUsuario);
    setEditFormData(empleado);
  };

  const handleChangeEditForm = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    if (editFormData) {
      setEditFormData({
        ...editFormData,
        [id]: value,
      });
    }
  };

  const handleSubmitEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editFormData) {
      try {
        await axios.put(`https://localhost:7160/api/Usuarios/${editFormData.idUsuario}`, editFormData);
        setEmpleados(empleados.map((empleado) =>
          empleado.idUsuario === editFormData.idUsuario ? editFormData : empleado
        ));
        setEditEmpleadoId(null);
      } catch (error) {
        console.error("Error al editar el empleado", error);
      }
    }
  };

  const handleAgregarEmpleado = () => {
    navigate("/agregar-empleado");
  };

  // Función para agrupar empleados por rol
  const agruparEmpleadosPorRol = (): Record<string, Empleado[]> => {
    return empleados.reduce((grupos, empleado) => {
      const { rol } = empleado;
      if (!grupos[rol]) {
        grupos[rol] = [];
      }
      grupos[rol].push(empleado);
      return grupos;
    }, {} as Record<string, Empleado[]>);
  };

  const gruposPorRol = agruparEmpleadosPorRol();

  return (
    <div style={styles.container}>
      <div style={styles.headerBox}>
        <h1 style={styles.title}>Sistema de Restaurante - Gestión de Empleados</h1>
      </div>
      <div style={styles.tableContainer}>
        {loading ? (
          <p>Cargando empleados...</p>
        ) : (
          Object.keys(gruposPorRol).map((rol, index) => (
            <div
              key={rol}
              style={{
                ...styles.rolContainer,
                backgroundColor: index % 2 === 0 ? "#DF821D" : "#F4A651 ",
              }}
            >
              <h3 style={styles.rolTitle}>Rol: {rol}</h3>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Teléfono</th>
                    <th>Correo</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                {gruposPorRol[rol].map((empleado) => (
                  <tr key={empleado.idUsuario} style={styles.row}>
                    <td>
                      {editEmpleadoId === empleado.idUsuario ? (
                        <input
                          id="nombre"
                          type="text"
                          value={editFormData?.nombre || ""}
                          onChange={handleChangeEditForm}
                        />
                      ) : (
                        empleado.nombre
                      )}
                    </td>
                    <td>
                      {editEmpleadoId === empleado.idUsuario ? (
                        <input
                          id="telefono"
                          type="text"
                          value={editFormData?.telefono || ""}
                          onChange={handleChangeEditForm}
                        />
                      ) : (
                        empleado.telefono
                      )}
                    </td>
                    <td>
                      {editEmpleadoId === empleado.idUsuario ? (
                        <input
                          id="correo"
                          type="email"
                          value={editFormData?.correo || ""}
                          onChange={handleChangeEditForm}
                        />
                      ) : (
                        empleado.correo
                      )}
                    </td>
                    <td>
                      {editEmpleadoId === empleado.idUsuario ? (
                        <>
                          <button
                            style={styles.editButton}
                            onClick={handleSubmitEdit}
                          >
                            Guardar
                          </button>
                          <button
                            style={styles.deleteButton}
                            onClick={() => setEditEmpleadoId(null)}
                          >
                            Cancelar
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            style={styles.editButton}
                            onClick={() => handleEditarEmpleado(empleado)}
                          >
                            Editar
                          </button>
                          <button
                            style={styles.deleteButton}
                            onClick={() =>
                              handleEliminarEmpleado(empleado.idUsuario)
                            }
                          >
                            Eliminar
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
              </table>
            </div>
          ))
        )}

        <button style={styles.addButton} onClick={handleAgregarEmpleado}>
          Agregar Empleado
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    margin: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column" as "column",
    minHeight: "100vh",
    backgroundColor: "#FDEBD0", // Crema claro
  },
  headerBox: {
    backgroundColor: "#F5CBA7", // Crema más oscuro
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "20px",
    textAlign: "center" as "center",
    width: "80%",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  title: {
    margin: 0,
    color: "#2C3E50", // Gris oscuro
  },
  tableContainer: {
    backgroundColor: "#FDEBD0", // Crema claro
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    width: "90%",
    maxWidth: "900px",
  },
  rolContainer: {
    marginBottom: "20px",
    padding: "10px",
    borderRadius: "8px",
  },
  rolTitle: {
    margin: "0 0 10px 0",
    color: "#5D4037", // Marrón oscuro
  },
  table: {
    width: "100%",
    borderCollapse: "collapse" as "collapse",
    color: "#333",
  },
  row: {
    borderBottom: "1px solid #ddd",
  },
  editButton: {
    padding: "5px 10px",
    cursor: "pointer",
    backgroundColor: "#F39C12", // Amarillo mostaza
    color: "white",
    border: "none",
    borderRadius: "4px",
    marginRight: "5px",
    "&:hover": {
      backgroundColor: "#D68910", // Mostaza más oscuro
    },
  },
  deleteButton: {
    padding: "5px 10px",
    cursor: "pointer",
    backgroundColor: "#E74C3C", // Rojo
    color: "white",
    border: "none",
    borderRadius: "4px",
    "&:hover": {
      backgroundColor: "#C0392B", // Rojo más oscuro
    },
  },
  addButton: {
    padding: "10px 15px",
    cursor: "pointer",
    backgroundColor: "#2C3E50", // Gris oscuro
    color: "white",
    border: "none",
    borderRadius: "4px",
    "&:hover": {
      backgroundColor: "#1A252F", // Gris más oscuro
    },
  },
};


export default EmpleadoList;
