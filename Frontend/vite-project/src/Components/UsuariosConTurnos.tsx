import React, { useEffect, useState } from "react";
import axios from "axios";

interface Turno {
  tipoTurno: string;
  fechaAsignacion: string;
}

interface Usuario {
  idUsuario: number;
  nombre: string;
  username: string;
  turnos: Turno[];
}

const UsuariosConTurnos: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [turnosPorUsuario, setTurnosPorUsuario] = useState<Record<number, number>>({});

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get<Usuario[]>(
          "https://localhost:7160/api/AsignacionTurnos"
        );
        setUsuarios(response.data);
      } catch (error: any) {
        setError("Error al cargar los datos.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  const asignarTurno = async (idUsuario: number) => {
    const idTurno = turnosPorUsuario[idUsuario] || 1;
    try {
      await axios.post("https://localhost:7160/api/AsignacionTurnos/Asignar", {
        idUsuario,
        idTurno,
      });
      alert("Turno asignado correctamente.");
      actualizarUsuarios();
    } catch (error) {
      console.error(error);
      alert("Error al asignar turno.");
    }
  };

  const quitarTurnos = async (idUsuario: number) => {
    try {
      await axios.delete("https://localhost:7160/api/AsignacionTurnos/Quitar", {
        data: { idUsuario },
      });
      alert("Turnos eliminados correctamente.");
      actualizarUsuarios();
    } catch (error) {
      console.error(error);
      alert("Error al eliminar turnos.");
    }
  };

  const actualizarUsuarios = async () => {
    try {
      const response = await axios.get<Usuario[]>(
        "https://localhost:7160/api/AsignacionTurnos"
      );
      setUsuarios(response.data);
    } catch (error) {
      console.error("Error al actualizar la lista de usuarios.");
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={styles.container}>
      <div style={styles.headerBox}>
        <h1 style={styles.title}>Usuarios y sus turnos</h1>
      </div>
      <div style={styles.tableContainer}>
        {usuarios.length === 0 ? (
          <p>No hay usuarios registrados.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th>ID Usuario</th>
                <th>Nombre</th>
                <th>Username</th>
                <th>Turnos</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.idUsuario} style={styles.row}>
                  <td>{usuario.idUsuario}</td>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.username}</td>
                  <td>
                    {usuario.turnos.length === 0 ? (
                      "Sin turnos"
                    ) : (
                      <ul>
                        {usuario.turnos.map((turno, index) => (
                          <li key={index}>
                            {turno.tipoTurno} -{" "}
                            {new Date(turno.fechaAsignacion).toLocaleString()}
                          </li>
                        ))}
                      </ul>
                    )}
                  </td>
                  <td>
                    <div style={styles.actionsContainer}>
                      <select
                        value={turnosPorUsuario[usuario.idUsuario] || 1}
                        onChange={(e) =>
                          setTurnosPorUsuario((prev) => ({
                            ...prev,
                            [usuario.idUsuario]: Number(e.target.value),
                          }))
                        }
                      >
                        <option value={1}>Mañana</option>
                        <option value={2}>Tarde</option>
                        <option value={3}>Completo</option>
                      </select>
                      <button
                        onClick={() => asignarTurno(usuario.idUsuario)}
                        style={styles.editButton}
                      >
                        Asignar Turno
                      </button>
                      <button
                        onClick={() => quitarTurnos(usuario.idUsuario)}
                        style={styles.deleteButton}
                      >
                        Quitar Turnos
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
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
  actionsContainer: {
    display: "flex",
    flexDirection: "column" as "column",
    gap: "10px",
  },
  editButton: {
    padding: "5px 10px",
    cursor: "pointer",
    backgroundColor: "#F39C12", // Amarillo mostaza
    color: "white",
    border: "none",
    borderRadius: "4px",
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
};

export default UsuariosConTurnos;
