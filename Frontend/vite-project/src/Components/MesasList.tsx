import React, { useEffect, useState } from 'react';

// Interfaz que coincide con la respuesta de la API
interface Mesa {
  idMesa: number;
  capacidad: number;
  zona: string;
  numMesa: number;
  reservas: null;
}

// Interfaz para el formulario de creación/edición de mesas
interface CrearMesaDto {
  capacidad: number;
  zona: string;
  numMesa: number;
}

const MesasList: React.FC = () => {
  const [mesas, setMesas] = useState<Mesa[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingMesaId, setEditingMesaId] = useState<number | null>(null);
  const [newMesa, setNewMesa] = useState<CrearMesaDto>({
    capacidad: 0,
    zona: '',
    numMesa: 0,
  });

  // Función para obtener las mesas desde la API
  const fetchMesas = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://localhost:7160/api/Mesa');

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Error en el servidor: ${response.statusText}, ${errorMessage}`);
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error('Los datos recibidos no tienen el formato esperado.');
      }

      setMesas(data);
    } catch (err) {
      console.error('Error al obtener las mesas:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  // Función para manejar el envío del formulario de creación/edición
  const handleSubmitMesa = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = isEditing
        ? `https://localhost:7160/api/Mesa/${editingMesaId}`
        : 'https://localhost:7160/api/Mesa';

      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMesa),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Error al ${isEditing ? 'editar' : 'agregar'} la mesa: ${response.statusText}, ${errorMessage}`);
      }

      alert(`Mesa ${isEditing ? 'actualizada' : 'agregada'} correctamente`);
      setShowForm(false);
      setNewMesa({ capacidad: 0, zona: '', numMesa: 0 });
      setIsEditing(false);
      setEditingMesaId(null);
      fetchMesas(); // Recargar la lista de mesas
    } catch (err) {
      console.error(`Error al ${isEditing ? 'editar' : 'agregar'} la mesa:`, err);
      alert(err instanceof Error ? err.message : 'Error desconocido');
    }
  };

  // Función para inicializar la edición
  const handleEditMesa = (mesa: Mesa) => {
    setNewMesa({ capacidad: mesa.capacidad, zona: mesa.zona, numMesa: mesa.numMesa });
    setEditingMesaId(mesa.idMesa);
    setIsEditing(true);
    setShowForm(true);
  };

  // Función para eliminar una mesa
  const handleDeleteMesa = async (idMesa: number) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar esta mesa?')) return;

    try {
      const response = await fetch(`https://localhost:7160/api/Mesa/${idMesa}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Error al eliminar la mesa: ${response.statusText}, ${errorMessage}`);
      }

      alert('Mesa eliminada correctamente');
      fetchMesas(); // Recargar la lista de mesas
    } catch (err) {
      console.error('Error al eliminar la mesa:', err);
      alert(err instanceof Error ? err.message : 'Error desconocido');
    }
  };

  useEffect(() => {
    fetchMesas();
  }, []);

  if (loading) return <p>Cargando mesas...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div style={styles.container}>
      <div style={styles.headerBox}>
        <h3 style={styles.title}>Mesas Disponibles</h3>
      </div>
      
      <button
        style={styles.addButton}
        onClick={() => {
          setShowForm(!showForm);
          setIsEditing(false);
          setNewMesa({ capacidad: 0, zona: '', numMesa: 0 });
        }}
      >
        {showForm ? 'Cancelar' : 'Agregar Nueva Mesa'}
      </button>

      {showForm && (
        <form style={styles.form} onSubmit={handleSubmitMesa}>
          <label>
            Capacidad:
            <input
              type="number"
              value={newMesa.capacidad}
              onChange={(e) => setNewMesa({ ...newMesa, capacidad: parseInt(e.target.value) })}
              required
            />
          </label>
          <label>
            Zona:
            <input
              type="text"
              value={newMesa.zona}
              onChange={(e) => setNewMesa({ ...newMesa, zona: e.target.value })}
              required
            />
          </label>
          <label>
            Número de Mesa:
            <input
              type="number"
              value={newMesa.numMesa}
              onChange={(e) => setNewMesa({ ...newMesa, numMesa: parseInt(e.target.value) })}
              required
            />
          </label>
          <button type="submit" style={styles.submitButton}>
            {isEditing ? 'Actualizar Mesa' : 'Guardar Mesa'}
          </button>
        </form>
      )}

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.headerRow}>
              <th>IdMesa</th>
              <th>Capacidad</th>
              <th>Zona</th>
              <th>NumMesa</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {mesas.map((mesa) => (
              <tr key={mesa.idMesa} style={styles.row}>
                <td>{mesa.idMesa}</td>
                <td>{mesa.capacidad}</td>
                <td>{mesa.zona}</td>
                <td>{mesa.numMesa}</td>
                <td>
                  <button style={styles.actionButton} onClick={() => handleEditMesa(mesa)}>Editar</button>
                  <button style={styles.deleteButton} onClick={() => handleDeleteMesa(mesa.idMesa)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    margin: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column' as 'column',
    minHeight: '100vh',
    backgroundColor: '#FDEBD0', // Crema claro (fondo principal)
  },
  headerBox: {
    backgroundColor: '#F5CBA7', // Crema más oscuro (caja de encabezado)
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '20px',
    textAlign: 'center' as 'center',
    width: '80%',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  title: {
    margin: 0,
    color: '#2C3E50', // Gris oscuro (título)
  },
  addButton: {
    marginBottom: '15px',
    padding: '10px 15px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
  },
  form: {
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column' as 'column',
    gap: '10px',
  },
  submitButton: {
    padding: '10px 15px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
  },
  tableContainer: {
    backgroundColor: '#FDEBD0', // Crema claro (fondo de la tabla)
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    width: '90%',
    maxWidth: '900px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as 'collapse',
    color: '#2C3E50', // Gris oscuro para el texto de la tabla
  },
  headerRow: {
    backgroundColor: '#F39C12', // Mostaza para los encabezados de la tabla
    color: 'white',
  },
  row: {
    borderBottom: '1px solid #ddd', // Gris claro para las filas
  },
  actionButton: {
    marginRight: '10px',
    padding: '5px 10px',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '3px',
  },
  deleteButton: {
    padding: '5px 10px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '3px',
  },
};

export default MesasList;
