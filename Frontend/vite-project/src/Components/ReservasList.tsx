import React, { useState, useEffect } from "react";
import axios from "axios";

interface Reserva {
  idReserva: number;
  idCliente: number;
  idMesa: number;
  fecha: string;
  duracion: number;
  estado: string;
}

const ReservasList: React.FC = () => {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    cargarReservas();
  }, []);

  const cargarReservas = async () => {
    try {
      setLoading(true);
      const response = await axios.get<Reserva[]>("https://localhost:7160/api/Reservas");
      setReservas(response.data);
    } catch (error) {
      console.error("Error al cargar las reservas", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerBox}>
        <h1 style={styles.title}>Sistema de Restaurante - Gestión de Reservas</h1>
      </div>
      <div style={styles.tableContainer}>
        {loading ? (
          <p>Cargando reservas...</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr style={styles.headerRow}>
                <th>ID Reserva</th>
                <th>ID Cliente</th>
                <th>ID Mesa</th>
                <th>Fecha</th>
                <th>Duración (minutos)</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {reservas.map((reserva) => (
                <tr key={reserva.idReserva} style={styles.row}>
                  <td>{reserva.idReserva}</td>
                  <td>{reserva.idCliente}</td>
                  <td>{reserva.idMesa}</td>
                  <td>{new Date(reserva.fecha).toLocaleString()}</td>
                  <td>{reserva.duracion}</td>
                  <td>{reserva.estado}</td>
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
    backgroundColor: "#FDEBD0", // Crema claro (fondo principal)
  },
  headerBox: {
    backgroundColor: "#F5CBA7", // Crema más oscuro (caja de encabezado)
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "20px",
    textAlign: "center" as "center",
    width: "80%",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  title: {
    margin: 0,
    color: "#2C3E50", // Gris oscuro (título)
  },
  tableContainer: {
    backgroundColor: "#FDEBD0", // Crema claro (fondo de la tabla)
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    width: "90%",
    maxWidth: "900px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse" as "collapse",
    color: "#2C3E50", // Gris oscuro para el texto de la tabla
  },
  headerRow: {
    backgroundColor: "#F39C12", // Mostaza para los encabezados de la tabla
    color: "white",
  },
  row: {
    borderBottom: "1px solid #ddd", // Gris claro para las filas
  },
};

export default ReservasList;
