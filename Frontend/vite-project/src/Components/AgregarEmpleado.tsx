import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AgregarEmpleado: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    username: "",
    rol: "",
    telefono: "",
    correo: "",
    contrasena: "",
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { nombre, username, rol, telefono, correo, contrasena } = formData;

    if (!nombre || !username || !rol || !telefono || !correo || !contrasena) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    try {
      setError(null);
      const payload = {
        Nombre: nombre,
        Username: username,
        Rol: rol,
        Telefono: telefono,
        Correo: correo,
        Password: contrasena,
      };

      await axios.post("https://localhost:7160/api/Usuarios", payload);

      alert("Empleado agregado con éxito.");
      navigate("/Gerente");
    } catch (error) {
      console.error("Error al agregar empleado:", error);
      setError("Hubo un problema al agregar el empleado. Intente nuevamente.");
    }
  };

  const handleCancel = () => {
    navigate(-1); // Esto volverá a la página anterior en el historial de navegación
  };
  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h1 style={styles.title}>Agregar Nuevo Empleado</h1>

        {error && <p style={styles.error}>{error}</p>}

        <label htmlFor="nombre" style={styles.label}>Nombre:</label>
        <input
          type="text"
          id="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Ingrese el nombre"
          style={styles.input}
        />

        <label htmlFor="username" style={styles.label}>Username:</label>
        <input
          type="text"
          id="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Ingrese el username"
          style={styles.input}
        />

        <label htmlFor="rol" style={styles.label}>Rol:</label>
        <select
          id="rol"
          value={formData.rol}
          onChange={handleChange}
          style={styles.input}
        >
          <option value="">Seleccione un rol...</option>
          <option value="Mesero">Mesero</option>
          <option value="Cajero">Cajero</option>
          <option value="Cocinero">Cocinero</option>
        </select>

        <label htmlFor="telefono" style={styles.label}>Teléfono:</label>
        <input
          type="text"
          id="telefono"
          value={formData.telefono}
          onChange={handleChange}
          placeholder="Ingrese el teléfono"
          style={styles.input}
        />

        <label htmlFor="correo" style={styles.label}>Correo:</label>
        <input
          type="email"
          id="correo"
          value={formData.correo}
          onChange={handleChange}
          placeholder="Ingrese el correo"
          style={styles.input}
        />

        <label htmlFor="contrasena" style={styles.label}>Contraseña:</label>
        <input
          type="password"
          id="contrasena"
          value={formData.contrasena}
          onChange={handleChange}
          placeholder="Ingrese la contraseña"
          style={styles.input}
        />

        <div style={styles.buttonContainer}>
          <button type="submit" style={styles.button}>Agregar Empleado</button>
          <button type="button" onClick={handleCancel} style={styles.cancelButton}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#4e342e",
  },
  form: {
    backgroundColor: "#6d4c41",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
    padding: "20px",
    width: "300px",
    display: "flex",
    flexDirection: "column" as "column",
  },
  title: {
    marginBottom: "20px",
    fontSize: "18px",
    color: "#ffffff",
  },
  label: {
    fontSize: "14px",
    color: "#ffffff",
    marginBottom: "5px",
  },
  input: {
    padding: "8px",
    marginBottom: "15px",
    border: "1px solid #5d4037",
    borderRadius: "4px",
    fontSize: "14px",
    backgroundColor: "#d7ccc8",
    color: "#3e2723",
  },
  error: {
    color: "#ffccbc",
    fontSize: "14px",
    marginBottom: "10px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  button: {
    padding: "10px 15px",
    cursor: "pointer",
    backgroundColor: "#3e2723",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "14px",
  },
  cancelButton: {
    padding: "10px 15px",
    cursor: "pointer",
    backgroundColor: "#a1887f",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "14px",
  },
};

export default AgregarEmpleado;
