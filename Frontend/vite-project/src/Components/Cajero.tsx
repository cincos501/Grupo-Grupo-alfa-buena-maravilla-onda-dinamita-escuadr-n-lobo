import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReservasList from './ReservasList'; // Asegúrate de que la ruta es correcta
import MesasList from './MesasList'; // Importa el componente MesasList

const HomePageCajero: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.backgroundImage = 'url(/fondo.jpg)';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.margin = '0';
    document.body.style.minHeight = '100vh';

    return () => {
      document.body.style.backgroundImage = '';
      document.body.style.backgroundSize = '';
      document.body.style.backgroundPosition = '';
    };
  }, []);

  const handleLogout = () => {
    navigate('/login'); // Redirige a la pantalla de Login
  };

  return (
    <div>
      {/* Barra de navegación */}
      <nav style={styles.navbar}>
        <span style={styles.welcome}>Bienvenido Cajero</span>
        <div style={styles.navLinks}>
          <a href="#reservas" style={styles.navButton}>Reservas</a>
          <a href="#mesas" style={styles.navButton}>Mesas</a>
          <button onClick={handleLogout} style={styles.logoutButton}>Cerrar Sesión</button>
        </div>
      </nav>

      {/* Secciones de la página */}
      <div id="reservas" style={styles.section}>
        <h2 style={styles.sectionTitle}>Reservas</h2>
        {/* Renderiza el componente ReservasList */}
        <ReservasList />
      </div>

      <div id="mesas" style={styles.section}>
        <h2 style={styles.sectionTitle}>Mesas</h2>
        {/* Renderiza el componente MesasList */}
        <MesasList />
      </div>
    </div>
  );
};

// Estilos en línea para la barra de navegación y secciones
const styles = {
  navbar: {
    position: 'fixed' as 'fixed',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#6B4226', // Marrón oscuro
    color: '#fff',
    padding: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1000,
  },
  welcome: {
    marginLeft: '20px',
    fontSize: '1.5em',
  },
  navLinks: {
    display: 'flex',
    gap: '15px',
    marginRight: '20px',
  },
  navButton: {
    backgroundColor: 'transparent',
    color: '#fff',
    border: 'none',
    fontSize: '1em',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  logoutButton: {
    backgroundColor: '#f39c12', // Amarillo mostaza
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
    borderRadius: '4px',
  },
  section: {
    marginTop: '80px', // Ajustado para dar espacio con la barra de navegación
    padding: '30px',
    border: '1px solid #E0E0E0',
    borderRadius: '8px',
    backgroundColor: '#FDEBD0',
    marginBottom: '30px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  sectionTitle: {
    color: '#3e2723',
    fontSize: '1.6em',
    marginBottom: '20px',
    fontWeight: '600',
  },
};

export default HomePageCajero;
