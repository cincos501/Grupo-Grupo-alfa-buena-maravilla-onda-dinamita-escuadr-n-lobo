import React, { useState, useEffect } from "react";
import axios from "axios";

interface Evento {
  idEvento: number;
  idCliente: number;
  fecha: string;
  duracion: number;
  estado: string;
  cliente: {
    nombre: string;
    correo: string;
  };
}

interface EventoRequest {
  idCliente: number;
  fecha: string;
  duracion: number;
  estado: string;
}

const Eventos: React.FC = () => {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [editForm, setEditForm] = useState<Evento | null>(null);
  const [newEvento, setNewEvento] = useState<EventoRequest>({
    idCliente: 0,
    fecha: "",
    duracion: 0,
    estado: "Pendiente",
  });
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEventList, setShowEventList] = useState(true);

  useEffect(() => {
    fetchEventos();
  }, []);

  const fetchEventos = async () => {
    try {
      const response = await axios.get("https://localhost:7160/api/Evento");
      setEventos(response.data);
    } catch (error) {
      console.error("Error al cargar eventos:", error);
      alert("Error al cargar los eventos.");
    }
  };

  const handleNewEventoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewEvento({
      ...newEvento,
      [name]:
        name === "idCliente" || name === "duracion"
          ? isNaN(parseInt(value))
            ? 0
            : parseInt(value)
          : value,
    });
  };

  const handleCreateEvento = async () => {
    try {
      await axios.post("https://localhost:7160/api/Evento", { ...newEvento });
      alert("Evento creado correctamente.");
      setShowCreateForm(false);
      setShowEventList(true);
      setNewEvento({
        idCliente: 0,
        fecha: "",
        duracion: 0,
        estado: "Pendiente",
      });
      fetchEventos();
    } catch (error) {
      console.error("Error al crear el evento:", error);
      alert("Error al crear el evento.");
    }
  };

  const handleCancelCreate = () => {
    setNewEvento({
      idCliente: 0,
      fecha: "",
      duracion: 0,
      estado: "Pendiente",
    });
    setShowCreateForm(false);
    setShowEventList(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (editForm) {
      setEditForm({
        ...editForm,
        [name]:
          name === "idCliente" || name === "duracion"
            ? isNaN(parseInt(value))
              ? 0
              : parseInt(value)
            : value,
      });
    }
  };

  const handleSaveEdit = async () => {
    if (editForm) {
      try {
        const response = await axios.put(
          `https://localhost:7160/api/Evento/${editForm.idEvento}`,
          {
            idCliente: editForm.idCliente,
            fecha: editForm.fecha,
            duracion: editForm.duracion,
            estado: editForm.estado,
          }
        );
        alert(response.data.message);
        setEditForm(null);
        setShowEventList(true);
        fetchEventos();
      } catch (error) {
        console.error("Error al actualizar el evento:", error);
        alert("Error al actualizar el evento.");
      }
    }
  };

  const handleCancelEdit = () => {
    setEditForm(null);
    setShowEventList(true);
  };

  const floatingButtonStyle: React.CSSProperties = {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    backgroundColor: "#f5a623",
    color: "white",
    border: "none",
    padding: "15px 20px",
    fontSize: "20px",
    borderRadius: "50%",
    cursor: "pointer",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  };

  const handleDeleteEvento = async (id: number) => {
    try {
      const response = await axios.delete(`https://localhost:7160/api/Evento/${id}`);
      alert(response.data.message);
      fetchEventos();
    } catch (error) {
      console.error("Error al eliminar el evento:", error);
      alert("Error al eliminar el evento.");
    }
  };

  return (
    <div style={{ padding: "40px", backgroundColor: "#F4E1C1", fontFamily: "Arial, sans-serif", width: "100%" }}>
      <h1 style={{ color: '#9E6B48' }}>Lista de Eventos</h1>

      <button
        onClick={() => {
          setShowCreateForm(true);
          setShowEventList(false);
        }}
        style={floatingButtonStyle}
        title="Agregar Evento"
      >
        +
      </button>

      {showCreateForm && (
        <div style={{ marginTop: "20px", backgroundColor: "#9E6B48", padding: "20px", borderRadius: "8px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}>
          <h2 style={{ color: '#FFFF' }}>Crear Evento</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleCreateEvento(); }}>
            <div>
              <label style={{ marginBottom: "5px", display: "block", color: '#FFFF' }}>Cliente ID: </label>
              <input
                type="number"
                name="idCliente"
                value={newEvento.idCliente || ""}
                onChange={handleNewEventoChange}
                required
                style={{ padding: "10px", borderRadius: "5px", width: "90%", marginBottom: "15px", backgroundColor: "#e5caa0", border: "1px solid #ccc" }}
              />
            </div>
            <div>
              <label style={{ marginBottom: "5px", display: "block", color: '#FFFF' }}>Fecha: </label>
              <input
                type="datetime-local"
                name="fecha"
                value={newEvento.fecha || ""}
                onChange={handleNewEventoChange}
                required
                style={{ padding: "10px", borderRadius: "5px", width: "90%", marginBottom: "15px", backgroundColor: "#e5caa0", border: "1px solid #ccc" }}
              />
            </div>
            <div>
              <label style={{ marginBottom: "5px", display: "block", color: '#FFFF' }}>Duración (minutos): </label>
              <input
                type="number"
                name="duracion"
                value={newEvento.duracion || ""}
                onChange={handleNewEventoChange}
                required
                style={{ padding: "10px", borderRadius: "5px", width: "90%", marginBottom: "15px", backgroundColor: "#e5caa0", border: "1px solid #ccc" }}
              />
            </div>
            <div>
              <label style={{ marginBottom: "5px", display: "block", color: '#FFFF' }}>Estado: </label>
              <select
                name="estado"
                value={newEvento.estado}
                onChange={handleNewEventoChange}
                required
                style={{ padding: "10px", borderRadius: "5px", width: "90%", marginBottom: "15px", backgroundColor: "#e5caa0", border: "1px solid #ccc" }}
              >
                <option value="Confirmado">Confirmado</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Cancelado">Cancelado</option>
              </select>
            </div>
            <button
              type="submit"
              style={{
                backgroundColor: "#f5a623",
                color: "white",
                border: "none",
                padding: "10px 20px",
                cursor: "pointer",
                borderRadius: "5px",
                marginRight: "10px",
              }}
            >
              Crear Evento
            </button>
            <button
              type="button"
              onClick={handleCancelCreate}
              style={{
                backgroundColor: "#e74c3c",
                color: "white",
                border: "none",
                padding: "10px 20px",
                cursor: "pointer",
                borderRadius: "5px",
              }}
            >
              Cancelar
            </button>
          </form>
        </div>
      )}

      {editForm && (
        <div style={{ marginTop: "20px", backgroundColor: "#9E6B48", padding: "20px", borderRadius: "8px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}>
          <h2 style={{ color: '#FFFF' }}>Editar Evento</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleSaveEdit(); }}>
            <div>
              <label style={{ marginBottom: "5px", display: "block", color: '#FFFF' }}>Cliente ID: </label>
              <input
                type="number"
                name="idCliente"
                value={editForm.idCliente}
                onChange={handleInputChange}
                required
                style={{ padding: "10px", borderRadius: "5px", width: "90%", marginBottom: "15px", backgroundColor: "#e5caa0", border: "1px solid #ccc" }}
              />
            </div>
            <div>
              <label style={{ marginBottom: "5px", display: "block", color: '#FFFF' }}>Fecha: </label>
              <input
                type="datetime-local"
                name="fecha"
                value={editForm.fecha}
                onChange={handleInputChange}
                required
                style={{ padding: "10px", borderRadius: "5px", width: "90%", marginBottom: "15px", backgroundColor: "#e5caa0", border: "1px solid #ccc" }}
              />
            </div>
            <div>
              <label style={{ marginBottom: "5px", display: "block", color: '#FFFF' }}>Duración (minutos): </label>
              <input
                type="number"
                name="duracion"
                value={editForm.duracion}
                onChange={handleInputChange}
                required
                style={{ padding: "10px", borderRadius: "5px", width: "90%", marginBottom: "15px", backgroundColor: "#e5caa0", border: "1px solid #ccc" }}
              />
            </div>
            <div>
              <label style={{ marginBottom: "5px", display: "block", color: '#FFFF' }}>Estado: </label>
              <select
                name="estado"
                value={editForm.estado}
                onChange={handleInputChange}
                required
                style={{ padding: "10px", borderRadius: "5px", width: "90%", marginBottom: "15px", backgroundColor: "#e5caa0", border: "1px solid #ccc" }}
              >
                <option value="Confirmado">Confirmado</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Cancelado">Cancelado</option>
              </select>
            </div>
            <button
              type="submit"
              style={{
                backgroundColor: "#f5a623",
                color: "white",
                border: "none",
                padding: "10px 20px",
                cursor: "pointer",
                borderRadius: "5px",
                marginRight: "10px",
              }}
            >
              Guardar Cambios
            </button>
            <button
              type="button"
              onClick={handleCancelEdit}
              style={{
                backgroundColor: "#e74c3c",
                color: "white",
                border: "none",
                padding: "10px 20px",
                cursor: "pointer",
                borderRadius: "5px",
              }}
            >
              Cancelar
            </button>
          </form>
        </div>
      )}

      {showEventList && (
        <div>
          {eventos.map((evento) => (
            <div
              key={evento.idEvento}
              style={{
                backgroundColor: "#fff",
                padding: "15px",
                marginBottom: "10px",
                borderRadius: "5px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ flex: 1 }}>
  <h3 style={{ color: "#9E6B48" }}>{evento.cliente.nombre}</h3>
  <p style={{ color: "black" }}>{evento.fecha}</p> {/* Cambié el color de la fecha a negro */}
  <p style={{ color: "black" }}>Duración: {evento.duracion} minutos</p> {/* Cambié el color de la duración a negro */}
  <p style={{ color: "black" }}>Estado: {evento.estado}</p> {/* Cambié el color del estado a negro */}
</div>

              <div>
                <button
                  onClick={() => {
                    setEditForm(evento);
                    setShowEventList(false);
                  }}
                  style={{
                    backgroundColor: "#f5a623",
                    color: "white",
                    border: "none",
                    padding: "5px 15px",
                    cursor: "pointer",
                    borderRadius: "5px",
                    marginRight: "10px",
                  }}
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDeleteEvento(evento.idEvento)}
                  style={{
                    backgroundColor: "#e74c3c",
                    color: "white",
                    border: "none",
                    padding: "5px 15px",
                    cursor: "pointer",
                    borderRadius: "5px",
                  }}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Eventos;
